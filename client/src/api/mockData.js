export const DEMO_FLAG = true;

export const demoClusters = [
  {
    _id: 'cl_heavy_streamer',
    clusterLabel: 0,
    personaName: 'Heavy-Data Streamer',
    description:
      'Streams teleplandeo and music constantly, burns through data fast, rarely calls, barely texts.',
    customerCount: 4210,
    centroid: [0.86, 0.18, 0.12, 0.22, 0.15],
    traits: { data: 'Very High', calling: 'Low', sms: 'Low', roaming: 'Low' },
    color: '#22d3ee',
  },
  {
    _id: 'cl_talk_first',
    clusterLabel: 1,
    personaName: 'Talk-First Connector',
    description: 'Lives on voice calls for work and family, modest data use, low roaming.',
    customerCount: 3120,
    centroid: [0.22, 0.88, 0.3, 0.12, 0.1],
    traits: { data: 'Low', calling: 'Very High', sms: 'Medium', roaming: 'Low' },
    color: '#34d399',
  },
  {
    _id: 'cl_global_roamer',
    clusterLabel: 2,
    personaName: 'Global Roamer',
    description: 'Frequently travels abroad, needs reliable roaming and international minutes.',
    customerCount: 980,
    centroid: [0.5, 0.45, 0.2, 0.92, 0.8],
    traits: { data: 'Medium', calling: 'Medium', sms: 'Low', roaming: 'Very High' },
    color: '#fbbf24',
  },
  {
    _id: 'cl_balanced',
    clusterLabel: 3,
    personaName: 'Balanced Everyday User',
    description: 'Steady, moderate use across data, calls and texts — nothing extreme.',
    customerCount: 5460,
    centroid: [0.45, 0.42, 0.4, 0.18, 0.14],
    traits: { data: 'Medium', calling: 'Medium', sms: 'Medium', roaming: 'Low' },
    color: '#60a5fa',
  },
  {
    _id: 'cl_budget_light',
    clusterLabel: 4,
    personaName: 'Budget-Conscious Light User',
    description: 'Minimal usage across the board, highly price sensitive.',
    customerCount: 2870,
    centroid: [0.12, 0.15, 0.18, 0.05, 0.04],
    traits: { data: 'Low', calling: 'Low', sms: 'Low', roaming: 'Very Low' },
    color: '#a78bfa',
  },
];

export const demoOperators = [
  { id: 'teleplan', name: 'TelePlan', color: '#0077FF' },
  { id: 'teleplan', name: 'TelePlan', color: '#E40000' },
  { id: 'teleplan', name: 'TelePlan', color: '#D81B60' },
  { id: 'teleplan', name: 'TelePlan', color: '#00BFA5' },
];

export const demoPlans = [
  {
    _id: 'teleplan_249',
    planName: 'TelePlan Value 4G',
    operator: 'teleplan',
    clusterIds: ['cl_budget_light'],
    price: 249,
    dataGB: 60,
    callMinutes: 3000,
    sms: 100,
    roamingIncluded: false,
    validityDays: 30,
    benefits: ['2 GB/day high speed data', 'Unlimited calls any network', 'Free PRBT & TelePlan Tunes'],
    sourceOperatorRef: 'TelePlan Value 4G',
  },
  {
    _id: 'teleplan_379',
    planName: 'TelePlan Hero Unlimited',
    operator: 'teleplan',
    clusterIds: ['cl_heavy_streamer', 'cl_balanced'],
    price: 379,
    dataGB: 100,
    callMinutes: 3000,
    sms: 100,
    roamingIncluded: false,
    validityDays: 28,
    benefits: ['Unlimited truly 5G data', 'Unlimited calls, 100 SMS/day', 'Hero exclusives & priority serteleplance'],
    sourceOperatorRef: 'TelePlan Hero Unlimited',
  },
  {
    _id: 'teleplan_299',
    planName: 'TelePlan True 5G Max',
    operator: 'teleplan',
    clusterIds: ['cl_heavy_streamer'],
    price: 299,
    dataGB: 42,
    callMinutes: 3000,
    sms: 100,
    roamingIncluded: false,
    validityDays: 28,
    benefits: ['Unlimited 5G Data (uncapped)', '1.5GB/day 4G + Unlimited Calls', 'TelePlanCinema, TelePlanTV & TelePlanCloud access'],
    sourceOperatorRef: 'TelePlan True 5G Max',
  },
  {
    _id: 'teleplan_349',
    planName: 'TelePlan 5G Plus',
    operator: 'teleplan',
    clusterIds: ['cl_talk_first', 'cl_balanced'],
    price: 349,
    dataGB: 56,
    callMinutes: 3000,
    sms: 100,
    roamingIncluded: false,
    validityDays: 28,
    benefits: ['Unlimited 5G Data + 2GB/day 4G', 'HD Voice calling on 820 MIN usage', 'Apollo 24|7 Circle & Wynk Music'],
    sourceOperatorRef: 'TelePlan 5G Plus',
  },
];

export const demoCustomer = {
  _id: 'cust_demo_01',
  name: 'Aarav Mehta',
  phone: '+91 98xxxxxx21',
  tenureMonths: 18,
  contractType: 'postpaid',
  usage: {
    avgCallMin: 420,
    dataGB: 34,
    smsCount: 65,
    dayEveningNightSplit: { day: 0.5, evening: 0.35, night: 0.15 },
    roamingUsage: 2,
    internationalUsage: 0,
  },
  clusterId: 'cl_balanced',
  currentPlanId: 'teleplan_249',
  monthlySpend: 449,
  createdAt: '2024-11-02T10:00:00.000Z',
};

export const demoRecommendationHistory = [
  {
    _id: 'rec_1',
    generatedAt: new Date(Date.now() - 1000 * 60 * 60 * 6).toISOString(),
    source: 'chat_profile',
    recommendedPlans: [
      { planId: 'teleplan_249', score: 0.71 },
      { planId: 'teleplan_379', score: 0.84 },
      { planId: 'teleplan_299', score: 0.96 },
      { planId: 'teleplan_349', score: 0.89 },
    ],
  },
];

export const demoAdminStats = {
  totalCustomers: 16640,
  totalPlans: demoPlans.length,
  totalClusters: demoClusters.length,
  recommendationsGenerated30d: 8420,
  avgMatchScore: 82,
  lastClusteringRun: new Date(Date.now() - 1000 * 60 * 60 * 20).toISOString(),
  lastBatchJobStatus: 'success',
};

export const demoKnowledgeSnippets = [
  { operatorName: 'TelePlan', planName: 'TelePlan Value 4G', note: 'Reference 4G budget plan' },
  { operatorName: 'TelePlan', planName: 'TelePlan Hero Unlimited', note: 'Reference 5G unlimited plan' },
];
