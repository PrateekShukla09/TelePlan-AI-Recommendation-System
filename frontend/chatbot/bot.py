"""
chatbot/bot.py
-----------------
LangGraph AI Agent & FastAPI Server for Tariff Plan Recommendation.
Uses LangChain's model abstraction (supporting Google Gemini and OpenAI).
Can be run via CLI (`python3 bot.py`) or as a web API (`python3 bot.py --server`).

pip install -r requirements.txt
"""

import os
import sys
import uuid
from pathlib import Path
from typing import Annotated, Optional
from typing_extensions import TypedDict
from dotenv import load_dotenv

from langchain.chat_models import init_chat_model
from langchain_core.messages import SystemMessage
from langgraph.graph import StateGraph, END
from langgraph.graph.message import add_messages
from langgraph.checkpoint.memory import MemorySaver

# FastAPI & CORS for frontend integration
try:
    from fastapi import FastAPI, HTTPException
    from fastapi.middleware.cors import CORSMiddleware
    from pydantic import BaseModel
    HAS_FASTAPI = True
except ImportError:
    HAS_FASTAPI = False

# Load .env file from parent root directory
env_path = Path(__file__).resolve().parents[1] / ".env"
load_dotenv(env_path, override=True)

# -----------------------------------------------------------------
# 1. 25 REAL TARIFF PLANS CATALOGUE
# -----------------------------------------------------------------
PLANS_LIST = """
1. Jio True 5G Unlimited 299 - ₹299 - 1.5 GB/day + Unlimited 5G, Truly Unlimited Calls, 100 SMS/day, Individual, JioCinema Premium (28 days)
2. Jio Hero 2GB/Day 5G - ₹349 - 2.0 GB/day + Unlimited 5G, Truly Unlimited Calls, 100 SMS/day, Individual, JioSaavn Pro (28 days)
3. Airtel 5G Plus Essential 349 - ₹349 - 2.0 GB/day + Unlimited 5G, HD Voice Calls, 100 SMS/day, Individual, Wynk Music (28 days)
4. Airtel Streamer Max 499 - ₹499 - 3.0 GB/day + Unlimited 5G, Truly Unlimited Calls, 100 SMS/day, Disney+ Hotstar 3 Months (28 days)
5. Vi Binge All Night 299 - ₹299 - 1.5 GB/day + Night Unlimited (12am-6am), Unlimited Calls, 100 SMS/day, Weekend Data Rollover (28 days)
6. Vi Hero Unlimited 379 - ₹379 - 2.0 GB/day + Unlimited 5G, Unlimited Calls, 100 SMS/day, Vi Movies VIP (28 days)
7. BSNL Value 4G 249 - ₹249 - 2.0 GB/day High Speed, Unlimited Calls, 100 SMS/day, BSNL Tunes (28 days)
8. BSNL Voice Lite 147 - ₹147 - 10 GB Lump Sum, Unlimited Calls, Standard SMS, 30 Days Validity (30 days)
9. Jio 84 Days Super Saver 666 - ₹666 - 1.5 GB/day + Unlimited 5G, Unlimited Calls, 100 SMS/day, Effective ₹222/mo (84 days)
10. Airtel Long Term 84D 799 - ₹799 - 1.5 GB/day + Unlimited 5G, Unlimited Calls, 100 SMS/day, Apollo 24|7 (84 days)
11. BSNL 150 Days Freedom 397 - ₹397 - 2.0 GB/day for 60D, Unlimited Calls for 60D, 150 Days SIM Validity (150 days)
12. Airtel Global Roaming 999 - ₹999 - 2.5 GB/day + International Roaming 5GB, 100 Roaming Mins, In-flight Connectivity (28 days)
13. Jio True 5G Family Care 999 - ₹999 - 200 GB Shared Data + Unlimited 5G per SIM, 4 Connections, Netflix Mobile & Prime (28 days)
14. Airtel Family Max 1050 - ₹1050 - 150 GB Shared Data + Unlimited 5G, 3 Connections, Disney+ Hotstar 1 Year (28 days)
15. Vi Max Family 699 - ₹699 - 80 GB Shared Data + Night Unlimited, 2 Connections, SonyLIV VIP (28 days)
16. Jio Family Plus 699 - ₹699 - 100 GB Shared Data + Unlimited 5G, 3 Connections, JioCinema Premium (28 days)
17. Airtel Premium Family 1349 - ₹1349 - 250 GB Shared Data + Unlimited 5G, 5 Connections, Netflix & Amazon Prime (28 days)
18. BSNL Family Combo 599 - ₹599 - 120 GB Shared Data, 3 Connections, Unlimited Calls, BSNL Tunes (28 days)
19. Vi Max Family Deluxe 1199 - ₹1199 - 180 GB Shared Data + Rollover, 4 Connections, Amazon Prime & Hotstar (28 days)
20. Airtel Business Fleet Pro 1299 - ₹1299 - 300 GB Shared Data + 5G, Unlimited CUG Calls, 10 Connections, Google Workspace (28 days)
21. Jio Business Enterprise 5G 1499 - ₹1499 - 500 GB Shared Data + 5G, Unlimited CUG Calls, 15 Connections, Static IP & MS 365 (28 days)
22. Vi Business Smart Connect 999 - ₹999 - 200 GB Shared Data, Unlimited CUG Calls, 8 Connections, Vi Location Tracker (28 days)
23. Jio Business Executive Fleet 2999 - ₹2999 - 1000 GB Shared Data + 5G, 25 Connections, Microsoft 365 & Global Roaming (28 days)
24. Airtel Enterprise Global 2499 - ₹2499 - 750 GB Shared Data + 5G, 20 Connections, Cloud PBX & Cyber Security (28 days)
25. BSNL Corporate Connect 799 - ₹799 - 150 GB Shared Data, 6 Connections, Unlimited CUG Group Calls (28 days)
""".strip()

SYSTEM_PROMPT = f"""
You are TelePlan AI Advisor — a smart telecom tariff recommendation chatbot.
Your job is to have a concise, friendly conversation to understand the customer's needs,
then recommend the best-fit tariff plans from the complete 25-plan catalogue below.

COMPLETE TARIFF CATALOGUE:
{PLANS_LIST}

RULES:
1. Ask short, simple questions (one at a time) about: data usage (GB/day), voice calling needs, 5G requirement, roaming/family/business requirements, and monthly budget (₹).
2. Do not ask more than 3 questions total. If the user provides enough details in their first message, recommend plans immediately.
3. When recommending, format your output with this exact title header:

Recommended Plans:
1. <Plan Title> (₹<price>) — <one-line reasoning for why this plan fits>
2. <Plan Title> (₹<price>) — <one-line reasoning>
3. <Plan Title> (₹<price>) — <one-line reasoning>

4. Keep reasoning grounded strictly in the catalogue data above.
5. Maintain a polite, professional, helpful tone.
""".strip()

# -----------------------------------------------------------------
# 2. MODEL INITIALIZATION (GEMINI / OPENAI / FALLBACK)
# -----------------------------------------------------------------
gemini_key = os.environ.get("GEMINI_API_KEY", "") or os.environ.get("GOOGLE_API_KEY", "")
openai_key = os.environ.get("OPENAI_API_KEY", "")

if gemini_key and gemini_key != "replace-with-your-gemini-api-key":
    os.environ["GOOGLE_API_KEY"] = gemini_key
    os.environ["GEMINI_API_KEY"] = gemini_key

using_ai_model = False
chat_model_name = os.environ.get("CHAT_MODEL", "google_genai:gemini-1.5-flash")

if (gemini_key and gemini_key != "replace-with-your-gemini-api-key") or (openai_key and openai_key != "replace-with-your-openai-api-key"):
    try:
        if "gemini" in chat_model_name.lower():
            model_id = chat_model_name.split(":")[-1] if ":" in chat_model_name else chat_model_name
            if not model_id:
                model_id = "gemini-3.6-flash"
            try:
                from langchain_google_genai import ChatGoogleGenerativeAI
                llm = ChatGoogleGenerativeAI(model=model_id, temperature=0.4, google_api_key=gemini_key)
                using_ai_model = True
                print(f"✨ Successfully Initialized Google Gemini Model ({model_id}) for real AI inference!")
            except Exception as gemini_err:
                print(f"Trying init_chat_model for {chat_model_name}: {gemini_err}")
                llm = init_chat_model(chat_model_name, temperature=0.4)
                using_ai_model = True
                print(f"✨ Successfully Initialized LLM Model ({chat_model_name}) for real AI inference!")
        else:
            llm = init_chat_model(chat_model_name, temperature=0.4)
            using_ai_model = True
            print(f"✨ Successfully Initialized LLM Model ({chat_model_name}) for real AI inference!")
    except Exception as e:
        print(f"Warning: Could not initialize LLM model ({e}). Using smart rule engine fallback.")

# -----------------------------------------------------------------
# 3. GRAPH STATE & BUILDER (If LLM Available)
# -----------------------------------------------------------------
class AgentState(TypedDict):
    messages: Annotated[list, add_messages]

if using_ai_model:
    def advisor_node(state: AgentState):
        messages = [SystemMessage(content=SYSTEM_PROMPT)] + state["messages"]
        response = llm.invoke(messages)
        return {"messages": [response]}

    graph_builder = StateGraph(AgentState)
    graph_builder.add_node("advisor", advisor_node)
    graph_builder.set_entry_point("advisor")
    graph_builder.add_edge("advisor", END)
    memory = MemorySaver()
    agent_graph = graph_builder.compile(checkpointer=memory)

# -----------------------------------------------------------------
# 4. CHATBOT AGENT REPLY FUNCTION
# -----------------------------------------------------------------
def fallback_smart_reply(user_message: str) -> dict:
    """Intelligent fallback rule-engine when API Key is missing or invalid."""
    msg = user_message.lower()
    
    if any(k in msg for k in ["family", "pooled", "members", "share"]):
        reply = (
            "Recommended Plans:\n"
            "1. Jio True 5G Family Care 999 (₹999) — 200 GB shared data for 4 SIMs with free Netflix & Amazon Prime.\n"
            "2. Airtel Family Max 1050 (₹1050) — 150 GB shared data for 3 connections with 1-Year Disney+ Hotstar.\n"
            "3. Vi Max Family 699 (₹699) — Budget family plan for 2 members with SonyLIV VIP access."
        )
    elif any(k in msg for k in ["business", "corporate", "fleet", "office", "company"]):
        reply = (
            "Recommended Plans:\n"
            "1. Airtel Business Fleet Pro 1299 (₹1299) — 300 GB shared data, unlimited CUG calling for 10 users & Google Workspace.\n"
            "2. Jio Business Enterprise 5G 1499 (₹1499) — 500 GB corporate data for 15 users with Static IP & Microsoft 365.\n"
            "3. BSNL Corporate Connect 799 (₹799) — 150 GB data for 6 team members with free CUG inter-calling."
        )
    elif any(k in msg for k in ["roam", "roaming", "abroad", "travel", "international"]):
        reply = (
            "Recommended Plans:\n"
            "1. Airtel Global Roaming 999 (₹999) — 2.5 GB/day local data + 5GB international roaming & in-flight connectivity.\n"
            "2. Jio 84 Days Super Saver 666 (₹666) — Long 84-day validity with 5G speeds for domestic travel.\n"
            "3. Vi Hero Unlimited 379 (₹379) — Unlimited 5G data plus weekend data rollover while traveling."
        )
    elif any(k in msg for k in ["cheap", "budget", "low", "199", "249", "299"]):
        reply = (
            "Recommended Plans:\n"
            "1. BSNL Value 4G 249 (₹249) — Best budget value offering 2.0 GB/day data with unlimited calling.\n"
            "2. Jio True 5G Unlimited 299 (₹299) — Unthrottled 5G speed boost with 1.5 GB/day and JioCinema.\n"
            "3. Vi Binge All Night 299 (₹299) — Uncapped 12am-6am midnight data streaming + 1.5 GB/day."
        )
    else:
        reply = (
            "Hello! I am TelePlan AI Advisor. Based on your inputs, here are our top recommended plans:\n\n"
            "Recommended Plans:\n"
            "1. Jio True 5G Unlimited 299 (₹299) — 1.5 GB/day + Unlimited 5G standalone speeds with JioCinema.\n"
            "2. Airtel 5G Plus Essential 349 (₹349) — 2.0 GB/day + HD Voice crystal clear calling.\n"
            "3. Vi Binge All Night 299 (₹299) — 1.5 GB/day + free midnight 12am-6am unlimited data.\n\n"
            "Feel free to tell me your data preference, budget, or if you need a Family or Business plan!"
        )
        
    return {"reply": reply, "is_recommendation": "Recommended Plans:" in reply}

def get_agent_reply(session_id: str, user_message: str) -> dict:
    if using_ai_model:
        try:
            config = {"configurable": {"thread_id": session_id}}
            result = agent_graph.invoke({"messages": [("user", user_message)]}, config=config)
            reply_text = result["messages"][-1].content
            is_recommendation = "Recommended Plans:" in reply_text
            return {"reply": reply_text, "is_recommendation": is_recommendation}
        except Exception as err:
            print(f"Agent graph error ({err}). Falling back to smart rules.")
            return fallback_smart_reply(user_message)
    else:
        return fallback_smart_reply(user_message)

# -----------------------------------------------------------------
# 5. FASTAPI APPLICATION SERVER FOR WEB FRONTEND INTEGRATION
# -----------------------------------------------------------------
if HAS_FASTAPI:
    app = FastAPI(
        title="TelePlan AI Chatbot API",
        description="LangGraph & Tariff Plan Recommendation Bot Server",
        version="1.0.0"
    )

    app.add_middleware(
        CORSMiddleware,
        allow_origins=["*"],
        allow_credentials=True,
        allow_methods=["*"],
        allow_headers=["*"],
    )

    class ChatRequest(BaseModel):
        message: str
        session_id: Optional[str] = "default-session"

    class ChatResponse(BaseModel):
        reply: str
        is_recommendation: bool
        session_id: str

    @app.get("/")
    def health_check():
        return {
            "status": "online",
            "service": "TelePlan AI Chatbot",
            "using_ai_model": using_ai_model,
            "chat_model": chat_model_name,
            "total_plans": 25
        }

    @app.get("/api/chat")
    def chat_get_info():
        return {
            "status": "online",
            "info": "This endpoint accepts HTTP POST requests with JSON payload: {\"message\": \"your query\"}",
            "ui_url": "http://localhost:5176"
        }

    @app.post("/api/chat", response_model=ChatResponse)
    def chat_endpoint(request: ChatRequest):
        if not request.message or not request.message.strip():
            raise HTTPException(status_code=400, detail="Message cannot be empty")
        
        session_id = request.session_id or str(uuid.uuid4())
        res = get_agent_reply(session_id, request.message.strip())
        
        return {
            "reply": res["reply"],
            "is_recommendation": res["is_recommendation"],
            "session_id": session_id
        }

# -----------------------------------------------------------------
# 6. TERMINAL CLI RUNNER
# -----------------------------------------------------------------
def run_terminal_chat() -> None:
    session_id = "terminal-session"
    print("==================================================")
    print("      TelePlan AI Tariff Chatbot Assistant        ")
    print(f"      Mode: {'✨ Live AI Inference (' + chat_model_name + ')' if using_ai_model else 'Smart Rule Engine (No API Key)'}")
    print("==================================================")
    print("Type your message below. Type 'quit' or 'exit' to stop.\n")

    while True:
        try:
            user_message = input("You: ").strip()
        except (EOFError, KeyboardInterrupt):
            print("\nChat ended.")
            break

        if not user_message:
            print("Please enter a message.\n")
            continue
        if user_message.lower() in {"quit", "exit"}:
            print("Chat ended.")
            break

        try:
            result = get_agent_reply(session_id, user_message)
            print(f"\nTelePlan Bot:\n{result['reply']}\n")
        except Exception as error:
            print(f"\nError: {error}\n")

if __name__ == "__main__":
    if "--server" in sys.argv or HAS_FASTAPI and os.environ.get("RUN_SERVER") == "true":
        import uvicorn
        print("Starting TelePlan AI Chatbot FastAPI Server on http://localhost:5005...")
        uvicorn.run("bot:app", host="0.0.0.0", port=5005, reload=True)
    else:
        run_terminal_chat()