import type { TechnologyCard } from '@/types';

// YouTube Video Configuration
export const YOUTUBE_VIDEOS = [
  'JyENjwMuMGA', // Default demo video
  // Add more video IDs as needed
];

// Technology Cards Data
export const TECHNOLOGY_CARDS: TechnologyCard[] = [
  {
    id: 'quantum-match',
    title: 'QuantumMatch™ AI',
    subtitle: 'Predictive Compatibility Engine',
    description: 'Revolutionary GNN+LSTM architecture that predicts long-term relationship compatibility with 89% accuracy',
    icon: 'quantum-mandala',
    color: 'primary-blue',
    details: {
      technology: [
        'Graph Neural Networks (GNN)',
        'Long Short-Term Memory (LSTM)',
        'Quantum-inspired algorithms',
        'Multi-dimensional personality mapping'
      ],
      features: [
        'Shadow Scenarios™ prediction',
        'Real-time compatibility scoring',
        'Future relationship modeling',
        'Behavioral pattern analysis'
      ],
      benefits: [
        '89% accuracy in compatibility prediction',
        'Reduces dating time by 3-5 years',
        'Prevents emotional burnout',
        'Maximizes relationship success'
      ]
    }
  },
  {
    id: 'tetrahedron-ai',
    title: 'Tetrahedron AI',
    subtitle: 'Multi-Dimensional Analysis',
    description: '4-layer personality assessment covering Emotional Harmony, Personal Values, Social Activity, and Creativity',
    icon: 'tetrahedron-3d',
    color: 'tetra-multi',
    details: {
      technology: [
        'Tetrahedral data modeling',
        'Multi-layer neural networks',
        'Dimensional reduction algorithms',
        'Psychological profiling AI'
      ],
      features: [
        'Emotional Harmony analysis',
        'Personal Values alignment',
        'Social Activity patterns',
        'Creativity compatibility'
      ],
      benefits: [
        'Holistic personality understanding',
        'Deep compatibility insights',
        'Reduced mismatch probability',
        'Enhanced relationship quality'
      ]
    }
  },
  {
    id: 'verification-tech',
    title: 'Verification Technology',
    subtitle: 'Triple-Layer Trust System',
    description: 'Advanced verification combining GPS, QR codes, and NFC technology for authentic connections',
    icon: 'trust-seal',
    color: 'primary-gold',
    details: {
      technology: [
        'GPS location verification',
        'QR code authentication',
        'NFC proximity detection',
        'Blockchain identity validation'
      ],
      features: [
        'Real-time location proof',
        'Anti-catfish protection',
        'Identity verification',
        'Trust score calculation'
      ],
      benefits: [
        '99.7% fake profile elimination',
        'Guaranteed authentic meetings',
        'Enhanced user safety',
        'Trust-based matching'
      ]
    }
  },
  {
    id: 'web3-sci',
    title: 'WEB3 & SCI',
    subtitle: 'Social Capital Integration',
    description: 'Blockchain-based reputation system measuring genuine social capital and relationship value',
    icon: 'hologram-map',
    color: 'secondary-purple',
    details: {
      technology: [
        'Blockchain reputation ledger',
        'Social graph analysis',
        'Token-based incentives',
        'Decentralized identity'
      ],
      features: [
        'Social Capital Index (SCI)',
        'Reputation tracking',
        'Reward mechanisms',
        'Community validation'
      ],
      benefits: [
        'Incentivizes genuine behavior',
        'Rewards quality interactions',
        'Builds trust network',
        'Promotes long-term relationships'
      ]
    }
  }
];

// Animation Variants
export const ANIMATION_VARIANTS = {
  fadeInUp: {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6, ease: 'easeOut' }
  },
  staggerContainer: {
    initial: {},
    animate: {
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    }
  },
  letterByLetter: {
    initial: { opacity: 0, y: 10 },
    animate: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.05 }
    }
  },
  glowPulse: {
    initial: { boxShadow: '0 0 0 rgba(37, 198, 245, 0)' },
    animate: {
      boxShadow: [
        '0 0 0 rgba(37, 198, 245, 0)',
        '0 0 20px rgba(37, 198, 245, 0.5)',
        '0 0 0 rgba(37, 198, 245, 0)'
      ],
      transition: {
        duration: 2,
        repeat: Infinity,
        repeatType: 'loop' as const
      }
    }
  },
  slideInFromLeft: {
    initial: { opacity: 0, x: -50 },
    animate: { opacity: 1, x: 0 },
    transition: { duration: 0.5, ease: 'easeOut' }
  },
  slideInFromRight: {
    initial: { opacity: 0, x: 50 },
    animate: { opacity: 1, x: 0 },
    transition: { duration: 0.5, ease: 'easeOut' }
  }
};

// FAQ Data
export const FAQ_DATA = [
  {
    category: 'Technology',
    questions: [
      {
        q: 'How does QuantumMatch™ AI achieve 89% accuracy?',
        a: 'Our proprietary algorithm combines Graph Neural Networks with LSTM architecture to analyze over 400 compatibility factors, including behavioral patterns, communication styles, life goals, and psychological profiles. The system continuously learns from successful long-term relationships to improve predictions.'
      },
      {
        q: 'What makes Tetrahedron AI different from traditional matching?',
        a: 'Traditional dating apps focus on superficial preferences. Tetrahedron AI analyzes four fundamental dimensions: Emotional Harmony (how you handle conflicts), Personal Values (core beliefs), Social Activity (lifestyle compatibility), and Creativity (intellectual stimulation). This creates a complete compatibility picture.'
      },
      {
        q: 'How does the verification system work?',
        a: 'Our triple-layer verification combines GPS location proof, QR code scanning during meetups, and NFC technology for proximity confirmation. This eliminates 99.7% of fake profiles and ensures authentic connections.'
      }
    ]
  },
  {
    category: 'Business',
    questions: [
      {
        q: 'What is the total addressable market?',
        a: 'The global online dating market is $8.2B growing at 8% annually. However, our addressable market extends to the $500B relationship wellness and personal development market, as we solve fundamental compatibility issues rather than just facilitating introductions.'
      },
      {
        q: 'How do you monetize the platform?',
        a: 'Three revenue streams: Premium subscriptions ($29.99/month) for advanced matching features, Enterprise partnerships with HR departments for team compatibility, and SCI token ecosystem for reputation rewards. Projected $50M ARR by Year 3.'
      },
      {
        q: 'What are your competitive advantages?',
        a: 'Patents pending on QuantumMatch™ and Tetrahedron technologies, 89% accuracy rate (industry average is 23%), and first-mover advantage in predictive relationship modeling. Our scientific approach creates significant barriers to entry.'
      }
    ]
  }
];

// Social Proof Data
export const SOCIAL_PROOF = {
  beta_users: 2847,
  accuracy_rate: 89,
  time_saved_years: 4.2,
  investor_inquiries: 127,
  patents_pending: 3,
  research_partners: 5
};

// Contact Information
export const CONTACT_INFO = {
  email: 'hub@compliment.quest',
  support: 'support@compliment.quest',
  investors: 'investors@compliment.quest',
  press: 'press@compliment.quest'
};
