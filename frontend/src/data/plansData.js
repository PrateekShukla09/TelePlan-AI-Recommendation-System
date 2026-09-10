export const TELECOM_PROVIDERS = [
  { id: 'teleplan', name: 'JIO', label: 'TelePlan', color: '#0077FF', badge: 'True 5G' },
  { id: 'teleplan', name: 'AIRTEL', label: 'TelePlan', color: '#E40000', badge: '5G Plus' },
  { id: 'teleplan', name: 'VI (IDEA)', label: 'TelePlan', color: '#D81B60', badge: '5G Ready' },
  { id: 'teleplan', name: 'TelePlan', label: 'TelePlan', color: '#00BFA5', badge: '4G Ready' },
];

export const PLANS_DATA = [
  // --- INDIVIDUAL PLANS (12 plans) ---
  {
    id: 'teleplan-299',
    title: 'TelePlan True 5G Unlimited 299',
    operator: 'TelePlan',
    operatorSlug: 'teleplan',
    price: 299,
    customerType: 'Inditeleplandual',
    category: 'Unlimited 5G',
    data: '1.5 GB/day + Unlimited 5G',
    dataGBPerMonth: 50,
    calls: 'Truly Unlimited Local & STD',
    callMinutes: 1000,
    sms: '100 SMS / day',
    otherBenefits: ['TelePlanCinema Premium', 'TelePlanTV Access', 'TelePlanCloud 50GB'],
    has5G: true,
    hasRoaming: false,
    maxUsers: 1,
    reason: 'Unrestricted 5G standalone data speed with free OTT streaming benefits.',
  },
  {
    id: 'teleplan-349',
    title: 'TelePlan Hero 2GB/Day 5G',
    operator: 'TelePlan',
    operatorSlug: 'teleplan',
    price: 349,
    customerType: 'Inditeleplandual',
    category: 'Unlimited 5G',
    data: '2.0 GB/day + Unlimited 5G',
    dataGBPerMonth: 65,
    calls: 'Truly Unlimited Local & STD',
    callMinutes: 1500,
    sms: '100 SMS / day',
    otherBenefits: ['TelePlanCinema Premium', 'TelePlanSaavn Pro', 'TelePlanCloud'],
    has5G: true,
    hasRoaming: false,
    maxUsers: 1,
    reason: 'High daily data allowance coupled with unrestricted 5G standalone speed boost.',
  },
  {
    id: 'teleplan-349',
    title: 'TelePlan 5G Plus Essential 349',
    operator: 'TelePlan',
    operatorSlug: 'teleplan',
    price: 349,
    customerType: 'Inditeleplandual',
    category: 'Unlimited 5G',
    data: '2.0 GB/day + Unlimited 5G',
    dataGBPerMonth: 65,
    calls: 'HD Voice Unlimited Calls',
    callMinutes: 1500,
    sms: '100 SMS / day',
    otherBenefits: ['Apollo 24|7 Circle', 'Wynk Music Free', 'Free Hellotunes'],
    has5G: true,
    hasRoaming: false,
    maxUsers: 1,
    reason: 'Top voice call quality with zero dropouts and ultra-fast 5G coverage.',
  },
  {
    id: 'teleplan-499',
    title: 'TelePlan Streamer Max 499',
    operator: 'TelePlan',
    operatorSlug: 'teleplan',
    price: 499,
    customerType: 'Inditeleplandual',
    category: 'Unlimited 5G',
    data: '3.0 GB/day + Unlimited 5G',
    dataGBPerMonth: 90,
    calls: 'Truly Unlimited HD Voice',
    callMinutes: 2000,
    sms: '100 SMS / day',
    otherBenefits: ['Disney+ Hotstar 3 Months', 'Xstream Play 20+ OTTs', 'Wynk Premium'],
    has5G: true,
    hasRoaming: true,
    maxUsers: 1,
    reason: 'Heavy streaming tier with 3GB daily 4G fallback & Hotstar subscription.',
  },
  {
    id: 'teleplan-299',
    title: 'TelePlan Binge All Night 299',
    operator: 'TelePlan',
    operatorSlug: 'teleplan',
    price: 299,
    customerType: 'Inditeleplandual',
    category: 'Data Pack',
    data: '1.5 GB/day + Night Unlimited (12am-6am)',
    dataGBPerMonth: 50,
    calls: 'Truly Unlimited',
    callMinutes: 1000,
    sms: '100 SMS / day',
    otherBenefits: ['Binge All Night (12am-6am)', 'Weekend Data Rollover', 'Data Delight 2GB'],
    has5G: false,
    hasRoaming: false,
    maxUsers: 1,
    reason: 'Perfect for late-night streamers with uncapped midnight to 6 AM high-speed data.',
  },
  {
    id: 'teleplan-379',
    title: 'TelePlan Hero Unlimited 379',
    operator: 'TelePlan',
    operatorSlug: 'teleplan',
    price: 379,
    customerType: 'Inditeleplandual',
    category: 'Unlimited 5G',
    data: '2.0 GB/day + Unlimited 5G',
    dataGBPerMonth: 65,
    calls: 'Truly Unlimited',
    callMinutes: 1200,
    sms: '100 SMS / day',
    otherBenefits: ['Binge All Night', 'Weekend Data Rollover', 'TelePlan Moteleplanes & TV VIP'],
    has5G: true,
    hasRoaming: false,
    maxUsers: 1,
    reason: 'Combines 5G ready connectiteleplanty with weekend data carry-over feature.',
  },
  {
    id: 'teleplan-249',
    title: 'TelePlan Value 4G 249',
    operator: 'TelePlan',
    operatorSlug: 'teleplan',
    price: 249,
    customerType: 'Inditeleplandual',
    category: 'Data Pack',
    data: '2.0 GB/day High Speed',
    dataGBPerMonth: 60,
    calls: 'Truly Unlimited Local & STD',
    callMinutes: 1000,
    sms: '100 SMS / day',
    otherBenefits: ['Free PRBT Ringtone', 'Zing Music App', 'TelePlan Tunes'],
    has5G: false,
    hasRoaming: false,
    maxUsers: 1,
    reason: 'Maximum value budget plan with 2GB daily data for non-5G deteleplances.',
  },
  {
    id: 'teleplan-147',
    title: 'TelePlan Voice Lite 147',
    operator: 'TelePlan',
    operatorSlug: 'teleplan',
    price: 147,
    customerType: 'Inditeleplandual',
    category: 'Data Pack',
    data: '10 GB Lump Sum Data',
    dataGBPerMonth: 10,
    calls: 'Truly Unlimited Voice Calls',
    callMinutes: 1200,
    sms: 'Standard Rates',
    otherBenefits: ['Free TelePlan Tunes', '30 Days Validity'],
    has5G: false,
    hasRoaming: false,
    maxUsers: 1,
    reason: 'Lowest cost entry tier for voice-first users connected primarily to Wi-Fi.',
  },
  {
    id: 'teleplan-666',
    title: 'TelePlan 84 Days Super Saver 666',
    operator: 'TelePlan',
    operatorSlug: 'teleplan',
    price: 666,
    customerType: 'Inditeleplandual',
    category: 'Long Validity',
    data: '1.5 GB/day + Unlimited 5G',
    dataGBPerMonth: 50,
    calls: 'Truly Unlimited (84 Days)',
    callMinutes: 3000,
    sms: '100 SMS / day',
    otherBenefits: ['TelePlanCinema', 'Effective ₹222/mo cost', '84 Days Validity'],
    has5G: true,
    hasRoaming: false,
    maxUsers: 1,
    reason: 'Quarterly saver plan locking in low monthly cost for 3 full months.',
  },
  {
    id: 'teleplan-799',
    title: 'TelePlan Long Term 84D 799',
    operator: 'TelePlan',
    operatorSlug: 'teleplan',
    price: 799,
    customerType: 'Inditeleplandual',
    category: 'Long Validity',
    data: '1.5 GB/day + Unlimited 5G',
    dataGBPerMonth: 50,
    calls: 'Truly Unlimited (84 Days)',
    callMinutes: 3000,
    sms: '100 SMS / day',
    otherBenefits: ['Apollo 24|7', 'Wynk Music', 'Free Hellotunes'],
    has5G: true,
    hasRoaming: false,
    maxUsers: 1,
    reason: 'Quarterly plan offering TelePlan HD voice stability and 5G speeds.',
  },
  {
    id: 'teleplan-397',
    title: 'TelePlan 150 Days Freedom 397',
    operator: 'TelePlan',
    operatorSlug: 'teleplan',
    price: 397,
    customerType: 'Inditeleplandual',
    category: 'Long Validity',
    data: '2.0 GB/day (60 Days)',
    dataGBPerMonth: 40,
    calls: 'Unlimited for 60 Days',
    callMinutes: 2000,
    sms: '100 SMS / day',
    otherBenefits: ['150 Days SIM Active Validity', 'Zing Music'],
    has5G: false,
    hasRoaming: false,
    maxUsers: 1,
    reason: 'Ultra long validity active plan suitable for secondary SIM cards.',
  },
  {
    id: 'teleplan-999-roam',
    title: 'TelePlan Global Roaming 999',
    operator: 'TelePlan',
    operatorSlug: 'teleplan',
    price: 999,
    customerType: 'Inditeleplandual',
    category: 'Unlimited 5G',
    data: '2.5 GB/day + International Roaming 5GB',
    dataGBPerMonth: 80,
    calls: 'Unlimited India + 100 Roaming Mins',
    callMinutes: 2000,
    sms: '100 SMS / day',
    otherBenefits: ['In-flight Connectiteleplanty', 'Free International Incoming', 'Apollo 24|7 VIP'],
    has5G: true,
    hasRoaming: true,
    maxUsers: 1,
    reason: 'Designed for frequent international travelers needing seamless global roaming.',
  },

  // --- FAMILY PLANS (7 plans) ---
  {
    id: 'teleplan-family-999',
    title: 'TelePlan True 5G Family Care 999',
    operator: 'TelePlan',
    operatorSlug: 'teleplan',
    price: 999,
    customerType: 'Family',
    category: 'Family Share',
    data: '200 GB Shared Data + Unlimited 5G per SIM',
    dataGBPerMonth: 200,
    calls: 'Unlimited Voice for all 4 SIMs',
    callMinutes: 5000,
    sms: '100 SMS / day per SIM',
    otherBenefits: ['4 Connections (1 Primary + 3 Add-ons)', 'Netflix Mobile Free', 'Amazon Prime Lite'],
    has5G: true,
    hasRoaming: true,
    maxUsers: 4,
    reason: 'Top rated family bundle with Netflix & Amazon Prime for up to 4 family members.',
  },
  {
    id: 'teleplan-family-1050',
    title: 'TelePlan Family Max 1050',
    operator: 'TelePlan',
    operatorSlug: 'teleplan',
    price: 1050,
    customerType: 'Family',
    category: 'Family Share',
    data: '150 GB Shared Data + Unlimited 5G',
    dataGBPerMonth: 150,
    calls: 'Unlimited Voice Calls (All SIMs)',
    callMinutes: 5000,
    sms: '100 SMS / day per SIM',
    otherBenefits: ['3 Connections Included', 'Disney+ Hotstar 1 Year', 'Amazon Prime membership'],
    has5G: true,
    hasRoaming: true,
    maxUsers: 3,
    reason: 'Comprehensive 3-member family pack with 1-year Disney+ Hotstar included.',
  },
  {
    id: 'teleplan-family-699',
    title: 'TelePlan Max Family 699',
    operator: 'TelePlan',
    operatorSlug: 'teleplan',
    price: 699,
    customerType: 'Family',
    category: 'Family Share',
    data: '80 GB Shared Data + Night Unlimited',
    dataGBPerMonth: 100,
    calls: 'Unlimited Calls for Primary & Secondary',
    callMinutes: 3000,
    sms: '100 SMS / day per SIM',
    otherBenefits: ['2 Family Connections', 'SonyLIV Mobile VIP', 'Binge All Night'],
    has5G: false,
    hasRoaming: false,
    maxUsers: 2,
    reason: 'Affordable 2-connection family sharing plan with SonyLIV subscription.',
  },
  {
    id: 'teleplan-family-699',
    title: 'TelePlan Family Plus 699',
    operator: 'TelePlan',
    operatorSlug: 'teleplan',
    price: 699,
    customerType: 'Family',
    category: 'Family Share',
    data: '100 GB Shared Data + Unlimited 5G',
    dataGBPerMonth: 120,
    calls: 'Unlimited Calls for 3 SIMs',
    callMinutes: 4000,
    sms: '100 SMS / day',
    otherBenefits: ['3 Family Connections', 'TelePlanCinema Premium', 'TelePlanTV'],
    has5G: true,
    hasRoaming: false,
    maxUsers: 3,
    reason: 'Great value 3-member family share with full TelePlan 5G data per member.',
  },
  {
    id: 'teleplan-family-1349',
    title: 'TelePlan Premium Family 1349',
    operator: 'TelePlan',
    operatorSlug: 'teleplan',
    price: 1349,
    customerType: 'Family',
    category: 'Family Share',
    data: '250 GB Shared Data + Unlimited 5G',
    dataGBPerMonth: 250,
    calls: 'Unlimited Local, STD & National Roaming',
    callMinutes: 8000,
    sms: '100 SMS / day per SIM',
    otherBenefits: ['5 Connections (1 Primary + 4 Add-on)', 'Netflix & Amazon Prime', 'Priority TelePlan Care'],
    has5G: true,
    hasRoaming: true,
    maxUsers: 5,
    reason: 'Large family sharing plan supporting up to 5 family members with premium OTT benefits.',
  },
  {
    id: 'teleplan-family-599',
    title: 'TelePlan Family Combo 599',
    operator: 'TelePlan',
    operatorSlug: 'teleplan',
    price: 599,
    customerType: 'Family',
    category: 'Family Share',
    data: '120 GB Shared Data',
    dataGBPerMonth: 120,
    calls: 'Unlimited Calls for 3 SIMs',
    callMinutes: 3000,
    sms: '100 SMS / day',
    otherBenefits: ['3 Family Connections', 'Free PRBT', 'Zing Music'],
    has5G: false,
    hasRoaming: false,
    maxUsers: 3,
    reason: 'Lowest cost 3-connection family pack for reliable nationwide calling.',
  },
  {
    id: 'teleplan-family-1199',
    title: 'TelePlan Max Family Deluxe 1199',
    operator: 'TelePlan',
    operatorSlug: 'teleplan',
    price: 1199,
    customerType: 'Family',
    category: 'Family Share',
    data: '180 GB Shared Data + Weekend Rollover',
    dataGBPerMonth: 180,
    calls: 'Unlimited Calls for 4 SIMs',
    callMinutes: 6000,
    sms: '100 SMS / day',
    otherBenefits: ['4 Connections', 'Amazon Prime 1 Year', 'Disney+ Hotstar VIP'],
    has5G: true,
    hasRoaming: true,
    maxUsers: 4,
    reason: 'Deluxe 4-member plan with dual OTT subscriptions and rollover data.',
  },

  // --- BUSINESS PLANS (6 plans) ---
  {
    id: 'teleplan-biz-1299',
    title: 'TelePlan Business Fleet Pro 1299',
    operator: 'TelePlan',
    operatorSlug: 'teleplan',
    price: 1299,
    customerType: 'Business',
    category: 'Business Suite',
    data: '300 GB Shared Corporate Data + 5G',
    dataGBPerMonth: 300,
    calls: 'Unlimited CUG Calls & National Roaming',
    callMinutes: 10000,
    sms: '500 Commercial SMS / day',
    otherBenefits: ['Google Workspace 1 Year', 'Deteleplance Security Shield', 'Dedicated Account Manager'],
    has5G: true,
    hasRoaming: true,
    maxUsers: 10,
    reason: 'Enterprise grade business suite with Google Workspace & dedicated SLA manager.',
  },
  {
    id: 'teleplan-biz-1499',
    title: 'TelePlan Business Enterprise 5G 1499',
    operator: 'TelePlan',
    operatorSlug: 'teleplan',
    price: 1499,
    customerType: 'Business',
    category: 'Business Suite',
    data: '500 GB Corporate Shared Data + Unlimited 5G',
    dataGBPerMonth: 500,
    calls: 'Unlimited CUG & Pan-India Voice',
    callMinutes: 15000,
    sms: '1000 SMS / day',
    otherBenefits: ['Microsoft 365 Business Basic', 'TelePlan Business Cloud 1TB', 'Static IP Included'],
    has5G: true,
    hasRoaming: true,
    maxUsers: 15,
    reason: 'Power business fleet plan with Static IP and Microsoft 365 licenses included.',
  },
  {
    id: 'teleplan-biz-999',
    title: 'TelePlan Business Smart Connect 999',
    operator: 'TelePlan',
    operatorSlug: 'teleplan',
    price: 999,
    customerType: 'Business',
    category: 'Business Suite',
    data: '200 GB Corporate Shared Data',
    dataGBPerMonth: 200,
    calls: 'Unlimited CUG & STD Calls',
    callMinutes: 8000,
    sms: '300 SMS / day',
    otherBenefits: ['TelePlan Location Tracker', 'Mobile Deteleplance Management (MDM)', 'Corporate Billing'],
    has5G: false,
    hasRoaming: true,
    maxUsers: 8,
    reason: 'Cost-effective commercial plan with team location tracking & MDM software.',
  },
  {
    id: 'teleplan-biz-2999',
    title: 'TelePlan Business Executive Fleet 2999',
    operator: 'TelePlan',
    operatorSlug: 'teleplan',
    price: 2999,
    customerType: 'Business',
    category: 'Business Suite',
    data: '1000 GB Shared Corporate Data + 5G',
    dataGBPerMonth: 1000,
    calls: 'Unlimited Pan-India & International CUG',
    callMinutes: 25000,
    sms: '2000 SMS / day',
    otherBenefits: ['25 Connections Supported', 'Microsoft 365 + Teams', 'Global Roaming Pack'],
    has5G: true,
    hasRoaming: true,
    maxUsers: 25,
    reason: 'Heavy business fleet plan supporting up to 25 staff lines with international roaming.',
  },
  {
    id: 'teleplan-biz-2499',
    title: 'TelePlan Enterprise Global 2499',
    operator: 'TelePlan',
    operatorSlug: 'teleplan',
    price: 2499,
    customerType: 'Business',
    category: 'Business Suite',
    data: '750 GB Shared Data + Unlimited 5G',
    dataGBPerMonth: 750,
    calls: 'Unlimited Voice & ISD Calling Pack',
    callMinutes: 20000,
    sms: '1500 Commercial SMS / day',
    otherBenefits: ['TelePlan Cloud PBX', 'Cyber Security Shield', '24/7 Enterprise Tech Support'],
    has5G: true,
    hasRoaming: true,
    maxUsers: 20,
    reason: 'Turnkey business solution with teleplanrtual cloud PBX and advanced cybersecurity.',
  },
  {
    id: 'teleplan-biz-799',
    title: 'TelePlan Corporate Connect 799',
    operator: 'TelePlan',
    operatorSlug: 'teleplan',
    price: 799,
    customerType: 'Business',
    category: 'Business Suite',
    data: '150 GB Shared Data',
    dataGBPerMonth: 150,
    calls: 'Unlimited CUG Calls Nationwide',
    callMinutes: 6000,
    sms: '200 SMS / day',
    otherBenefits: ['Free CUG Grouping', 'Pan-India Government PSU Network', 'Itemized Business Bill'],
    has5G: false,
    hasRoaming: false,
    maxUsers: 6,
    reason: 'Reliable PSU corporate plan with free Closed User Group (CUG) inter-calling.',
  },
];

// --- K-MEANS CLUSTERING & RECOMMENDATION LOGIC ---
export function calculateClusterAndRecommendations(usage) {
  const {
    customerType = 'Inditeleplandual',
    dataGB = 45,
    callMin = 800,
    smsCount = 100,
    rechargeBudget = 500,
    use5G = true,
    dataRoaming = 'none',
    memberCount = 1,
  } = usage;

  // K-Means Cluster Assignment
  let clusterId = 'C6';
  let clusterName = 'C6: High-Data 5G Power User';
  let clusterDescription = 'High data consumption (>40GB/mo) with heavy 5G deteleplance usage and active media streaming.';
  let centroids = { dataGB: 60, callMin: 1200, budget: 450 };

  if (customerType === 'Business') {
    clusterId = 'C5';
    clusterName = 'C5: Corporate Fleet & Enterprise';
    clusterDescription = 'Multi-user commercial operations requiring high shared data caps, CUG voice calling, and business apps.';
    centroids = { dataGB: 400, callMin: 8000, budget: 1800 };
  } else if (customerType === 'Family') {
    clusterId = 'C3';
    clusterName = 'C3: Family Multi-Line Shared Pool';
    clusterDescription = 'Shared pool data for family members with OTT subscriptions and pooled calling allowances.';
    centroids = { dataGB: 150, callMin: 4000, budget: 950 };
  } else {
    // Inditeleplandual sub-clustering
    if (rechargeBudget <= 250 && dataGB <= 20) {
      clusterId = 'C1';
      clusterName = 'C1: Budget Voice & Minimal Data';
      clusterDescription = 'Voice-focused profile with basic messaging and reliance on home Wi-Fi.';
      centroids = { dataGB: 10, callMin: 600, budget: 200 };
    } else if (dataRoaming === 'international') {
      clusterId = 'C4';
      clusterName = 'C4: Global Nomad & Traveler';
      clusterDescription = 'Requires international roaming passes, high speed data, and cross-border voice access.';
      centroids = { dataGB: 80, callMin: 2000, budget: 1000 };
    } else if (rechargeBudget <= 400) {
      clusterId = 'C2';
      clusterName = 'C2: Balanced Value 4G/5G';
      clusterDescription = 'Standard daily data users seeking high value per rupee spent.';
      centroids = { dataGB: 35, callMin: 800, budget: 320 };
    }
  }

  // Calculate Match Score for each of the 25 plans
  const scoredPlans = PLANS_DATA.map((plan) => {
    let score = 70; // baseline

    // 1. Customer Type Match (Crucial)
    if (plan.customerType === customerType) score += 15;
    else if (customerType === 'Inditeleplandual' && plan.customerType !== 'Inditeleplandual') score -= 30;

    // 2. Budget Match
    const priceDiff = Math.abs(plan.price - rechargeBudget);
    if (priceDiff <= 50) score += 15;
    else if (priceDiff <= 150) score += 10;
    else if (priceDiff <= 300) score += 5;
    else score -= Math.min(20, Math.floor(priceDiff / 50));

    // 3. Data Match
    if (plan.dataGBPerMonth >= dataGB) score += 10;
    else score -= 10;

    // 4. 5G Match
    if (use5G && plan.has5G) score += 10;
    else if (use5G && !plan.has5G) score -= 12;

    // 5. Roaming Match
    if (dataRoaming === 'international' && plan.hasRoaming) score += 15;
    else if (dataRoaming === 'international' && !plan.hasRoaming) score -= 25;

    // 6. User Count Match for Family/Business
    if (memberCount > 1 && plan.maxUsers >= memberCount) score += 10;

    // Clamp score between 65% and 99%
    const finalScore = Math.max(65, Math.min(99, Math.round(score)));

    // Breakdown for "Why This Plan?"
    const dataMatchPct = plan.dataGBPerMonth >= dataGB ? '98%' : '75%';
    const callMatchPct = plan.callMinutes >= callMin ? '100%' : '82%';
    const budgetMatchPct = priceDiff <= 100 ? '96%' : priceDiff <= 250 ? '88%' : '72%';
    const match5GPct = use5G === plan.has5G ? '100%' : '60%';

    return {
      ...plan,
      recommendationScore: finalScore,
      whyThisPlan: {
        dataMatch: dataMatchPct,
        callMatch: callMatchPct,
        budgetMatch: budgetMatchPct,
        match5G: match5GPct,
        overallFit: `${finalScore}% customer fit for ${customerType.toLowerCase()} profile with ${plan.data} and ₹${plan.price}/mo cost.`,
      },
    };
  });

  // Sort plans by recommendation score descending
  scoredPlans.sort((a, b) => b.recommendationScore - a.recommendationScore);

  const top3Plans = scoredPlans.slice(0, 3);

  const aiAnalysis = [
    `Assigned K-Means Cluster: ${clusterName}`,
    `Monthly Data Requirement: ${dataGB} GB vs Cluster Average ${centroids.dataGB} GB`,
    `Call Usage Pattern: ${callMin} Mins/Month (${callMin > 1000 ? 'Heavy' : 'Moderate'} Voice)`,
    `Budget Benchmark: Target ₹${rechargeBudget}/mo fits in ${clusterId} pricing model`,
    `5G & Telemetry Status: ${use5G ? '5G Uncapped Enabled' : 'Standard 4G Data'}, Roaming: ${dataRoaming.toUpperCase()}`,
  ];

  return {
    clusterId,
    clusterName,
    clusterDescription,
    aiAnalysis,
    top3Plans,
    allPlans: scoredPlans,
  };
}
