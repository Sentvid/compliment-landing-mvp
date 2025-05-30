export interface GlossaryTerm {
  id: string;
  term: string;
  explanation: string;
  context: string;
  type: string;
  difficulty: 'Basic' | 'Advanced' | 'Expert';
  status: string;
}

export const GLOSSARY_TERMS: GlossaryTerm[] = [
  {
    id: '1',
    term: 'Compliment',
    explanation: 'Name of the project ecosystem aiming to facilitate real-life social interaction with AI, blockchain, and quests.',
    context: 'Central brand across all documentation; everything revolves around the "Compliment" platform\'s mechanics and modules.',
    type: 'Unique project element',
    difficulty: 'Basic',
    status: 'Unique to project'
  },
  {
    id: '2',
    term: 'QuantumMatch',
    explanation: 'AI-based matching engine that predicts user compatibility not just on shared interests, but on long-term synergy (3–6 months).',
    context: 'Forms the backbone of how the system pairs people or groups for quests and social events. It\'s a more advanced approach than standard short-sighted "interest-based" matches.',
    type: 'AI concept (unique project feature)',
    difficulty: 'Advanced',
    status: 'Unique to project'
  },
  {
    id: '3',
    term: 'Tetrahedron AI',
    explanation: 'A specialized AI model representing four main aspects of a user\'s profile (personal values, social activity, emotional harmony, creativity).',
    context: 'The user\'s "Tetrahedron" changes with their activity. The system personalizes recommendations based on how these four facets evolve.',
    type: 'Unique project element',
    difficulty: 'Advanced',
    status: 'Unique to project'
  },
  {
    id: '4',
    term: 'Shadow Scenarios™',
    explanation: 'Hypothetical future paths the AI draws to show how a user\'s personality or relationships might evolve over weeks or months.',
    context: 'Created by the "Prediction Layer" or "Astral Dynamics Engine," it helps the system plan or recommend quests that push users to a positive future outcome.',
    type: 'Neologism / AI concept',
    difficulty: 'Expert',
    status: 'Rare, unique to project'
  },
  {
    id: '5',
    term: 'SCI (Social Capital Index)',
    explanation: 'A dynamic score reflecting a user\'s social capital: trust, reliability, collaborative history, etc.',
    context: 'Connected to the Web3 layer. The user\'s SCI influences how the system handles their proposals, invitations, or DAO voting power.',
    type: 'Industry concept with unique twist',
    difficulty: 'Advanced',
    status: 'Unique to project\'s Web3 approach'
  },
  {
    id: '6',
    term: 'Web3 DAO',
    explanation: 'A Decentralized Autonomous Organization where governance (like rules, disputes, or new features) is voted on by token holders or participants, often factoring in the user\'s SCI.',
    context: 'The Compliment project integrates a DAO mechanism on Solana or similar blockchain so that certain decisions can be made collectively by community or validators.',
    type: 'Blockchain concept',
    difficulty: 'Advanced',
    status: 'Common in blockchain but unique usage here'
  },
  {
    id: '7',
    term: 'Event-Driven Architecture',
    explanation: 'A system design pattern where services publish and subscribe to events (e.g., "quest.completed").',
    context: 'Compliment uses Kafka and WebSockets to instantly propagate status changes, trigger notifications, and keep everything in sync real-time.',
    type: 'Industry term (system architecture)',
    difficulty: 'Advanced',
    status: 'Common usage in microservices'
  },
  {
    id: '8',
    term: 'Quest',
    explanation: 'A gamified challenge or activity that users complete in real life (e.g., meet for coffee, solve a puzzle, group volunteering), typically verified via offline triggers (QR, NFC, etc.).',
    context: 'The building block of user interactions in Compliment. Quests can be individual, pairwise, or group-based, with tokens or reputation gained upon completion.',
    type: 'Gamification concept',
    difficulty: 'Basic',
    status: 'Unique usage for this project'
  },
  {
    id: '9',
    term: 'Offline Triggers',
    explanation: 'Physical confirmations (QR codes, NFC taps, location check-ins) used to verify that participants actually met or performed the quest offline.',
    context: 'Ensures authenticity of offline interaction, addresses the problem of "fake" completions.',
    type: 'Project concept (technical layer)',
    difficulty: 'Basic',
    status: 'Unique to project'
  },
  {
    id: '10',
    term: 'MTTR (Mean Time to Recover)',
    explanation: 'Standard DevOps metric: average time to restore service after an incident.',
    context: 'Mentioned in the system monitoring docs (Prometheus, Grafana). Helps measure reliability of the Compliment platform.',
    type: 'Industry term (DevOps)',
    difficulty: 'Advanced',
    status: 'Common usage in reliability engineering'
  },
  {
    id: '11',
    term: 'Isolation Forest',
    explanation: 'An anomaly detection algorithm that identifies outliers in data, used here for discovering suspicious patterns or potential fraudulent interactions.',
    context: 'Employed in the monitoring modules. Helps detect if quest completions are abnormally frequent or suspiciously consistent, among other use cases.',
    type: 'AI concept (machine learning)',
    difficulty: 'Advanced',
    status: 'Common in AI / used by project'
  },
  {
    id: '12',
    term: 'Prophet (Time-series)',
    explanation: 'A forecasting library (originated from Facebook) that makes time-series predictions about metrics (e.g., user growth, system load).',
    context: 'Used in the monitoring pipeline. Helps predict usage spikes to auto-scale or adjust resources.',
    type: 'AI/ML library (time-series)',
    difficulty: 'Advanced',
    status: 'Common library in analytics'
  },
  {
    id: '13',
    term: 'PostgreSQL',
    explanation: 'A relational database system where core user data, quest data, and logs may be stored.',
    context: 'The central store for structured data (e.g., user profiles, quest definitions, transaction logs).',
    type: 'Industry term (database)',
    difficulty: 'Basic',
    status: 'Common usage'
  },
  {
    id: '14',
    term: 'Kubernetes',
    explanation: 'An orchestration platform for containerized microservices, used to deploy and manage the Compliment backend components.',
    context: 'Mentioned in the architecture docs, controlling how services (UCS, AI modules, etc.) are scaled and updated.',
    type: 'Industry term (DevOps container orchestration)',
    difficulty: 'Advanced',
    status: 'Common usage in microservices'
  },
  {
    id: '15',
    term: 'Jaeger',
    explanation: 'A distributed tracing system for microservices. It captures the life cycle of a request across multiple services.',
    context: 'Helps track performance bottlenecks or identify which service is causing slow responses in the Compliment ecosystem.',
    type: 'Industry term (monitoring)',
    difficulty: 'Advanced',
    status: 'Common usage in distributed systems'
  },
  {
    id: '16',
    term: 'Grafana + Prometheus',
    explanation: 'Open-source tools for metrics collection (Prometheus) and visualization (Grafana), widely used for monitoring.',
    context: 'A standard monitoring stack in the Compliment ecosystem to watch CPU usage, memory, quest completion rates, user activity, and so on.',
    type: 'Industry term (monitoring)',
    difficulty: 'Advanced',
    status: 'Common usage in microservices'
  },
  {
    id: '17',
    term: 'ELK Stack',
    explanation: 'A logging and analytics stack. In some documents, "Loki + Fluentd" or "ELK" might be used interchangeably for logs.',
    context: 'Used for collecting logs of user activity, quest transitions, or error messages.',
    type: 'Industry term (logging)',
    difficulty: 'Advanced',
    status: 'Common usage'
  },
  {
    id: '18',
    term: 'Adaptive MFA',
    explanation: 'Multi-factor authentication that changes requirement levels depending on risk or suspicious behaviors.',
    context: 'Proposed in the security docs. May require TOTP, push-based or 2FA for logins.',
    type: 'Security concept',
    difficulty: 'Basic',
    status: 'Rare / specialized usage'
  },
  {
    id: '19',
    term: 'Zero Trust',
    explanation: 'A security model that assumes any network or system might be compromised, so every request must be verified for identity and context.',
    context: 'Mentioned in architecture docs for microservices security approach.',
    type: 'Security concept',
    difficulty: 'Advanced',
    status: 'Common usage in enterprise security'
  },
  {
    id: '20',
    term: 'HMAC + Nonce',
    explanation: 'Hash-based message authentication code plus a "once-only" random string. Used to sign requests and prevent replay attacks.',
    context: 'The platform\'s internal API security measure for calls among microservices.',
    type: 'Security concept (API)',
    difficulty: 'Advanced',
    status: 'Common usage in cryptographic solutions'
  },
  {
    id: '21',
    term: 'UCS (User Context Service)',
    explanation: 'The microservice handling user profiles, preferences, Tetrahedron states, and updates.',
    context: 'The central "source of truth" about each user\'s data. Publishes events like user.updated or tetrahedron.changed.',
    type: 'Unique project element (microservice)',
    difficulty: 'Advanced',
    status: 'Unique to project'
  },
  {
    id: '22',
    term: 'Smart Contracts (Solana)',
    explanation: 'Self-executing programs on the Solana blockchain. They record quest completions, handle token distribution, or define DAO processes.',
    context: 'Ensures transparency: you can\'t cheat a quest or dispute resolution once it\'s on-chain.',
    type: 'Blockchain concept',
    difficulty: 'Advanced',
    status: 'Common usage in Web3 solutions'
  },
  {
    id: '23',
    term: 'Arbitration (DAO)',
    explanation: 'A system for resolving disputes (like quest disagreements or controversies) via decentralized voting by designated validators or community.',
    context: 'Might distribute or withhold quest rewards if there\'s conflict.',
    type: 'Unique project concept (blockchain-based)',
    difficulty: 'Advanced',
    status: 'Rare / specialized usage'
  },
  {
    id: '24',
    term: 'HPA (Horizontal Pod Autoscaler)',
    explanation: 'A Kubernetes feature that automatically scales the number of container pods based on CPU or custom metrics.',
    context: 'Allows the Compliment platform to spin up more service replicas if usage spikes.',
    type: 'DevOps concept',
    difficulty: 'Advanced',
    status: 'Common usage in container orchestration'
  }
];

export const getTermsByDifficulty = (difficulty: 'Basic' | 'Advanced' | 'Expert') => {
  return GLOSSARY_TERMS.filter(term => term.difficulty === difficulty);
};

export const getTermsByType = (type: string) => {
  return GLOSSARY_TERMS.filter(term => term.type === type);
};

export const searchTerms = (query: string) => {
  const lowercaseQuery = query.toLowerCase();
  return GLOSSARY_TERMS.filter(term => 
    term.term.toLowerCase().includes(lowercaseQuery) ||
    term.explanation.toLowerCase().includes(lowercaseQuery) ||
    term.context.toLowerCase().includes(lowercaseQuery)
  );
};

export const getGlossaryStats = () => {
  const basicCount = GLOSSARY_TERMS.filter(t => t.difficulty === 'Basic').length;
  const advancedCount = GLOSSARY_TERMS.filter(t => t.difficulty === 'Advanced').length;
  const expertCount = GLOSSARY_TERMS.filter(t => t.difficulty === 'Expert').length;
  
  return {
    total: GLOSSARY_TERMS.length,
    basic: basicCount,
    advanced: advancedCount,
    expert: expertCount
  };
};