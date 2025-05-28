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

// FAQ Data - Updated with real content from provided JSON
export const FAQ_DATA = [
  {
    category: 'General Questions About Compliment',
    questions: [
      {
        q: 'What is this, anyway?',
        a: 'Compliment is an app that helps people meet in real life and complete fun quests together. That way, they can form new friendships, partnerships, and connections.'
      },
      {
        q: 'Why would I need it?',
        a: 'It\'s a way to step away from endless online chats and actually get together with others. You can meet new people, join group projects, games, sports events, and more.'
      },
      {
        q: 'Is it like a social network or something else?',
        a: 'It\'s somewhat similar to a social network, but the main focus is on encouraging folks to go outside, meet in person, and earn reputation points and rewards.'
      },
      {
        q: 'Why is it called "Compliment"?',
        a: 'The name highlights the idea of support and appreciation in person: a "compliment" earned through real-life actions and trust.'
      },
      {
        q: 'What do I do there?',
        a: 'You create or complete quests (tasks) with others, have face-to-face meetups, boost your avatar, and build up reputation points.'
      },
      {
        q: 'Is it for dating, or what?',
        a: 'You can definitely meet people, but it\'s not just for romance. There are friendship, team, and business formats. The main idea is offline communication.'
      },
      {
        q: 'Can I really meet people in real life?',
        a: 'Yes. The app verifies get-togethers using QR, NFC, or location checks and rewards you for actually hanging out in person.'
      },
      {
        q: 'Why is it better than just using Telegram or Instagram?',
        a: 'Those platforms mostly involve online texting. Our goal is real-life encounters. There\'s a built-in gamification system (tokens, reputation) that makes it fun.'
      }
    ]
  },
  {
    category: 'About the AI and the Avatar',
    questions: [
      {
        q: 'What\'s the AI assistant for?',
        a: 'It checks your interests and gives personal tips—such as which quests might be fun or who you might want to meet. It also offers pointers on growing your "Tetrahedron" (your personality profile).'
      },
      {
        q: 'Why do I need to interact with the AI?',
        a: 'It\'s there to provide smart suggestions, help you find the right quests and people, save time, and discover new ideas.'
      },
      {
        q: 'Does it actually help, or is it just small talk?',
        a: 'It learns from your experience and adapts to your interests. It\'s not just chatting; it guides you through quests and gives relevant advice.'
      },
      {
        q: 'Does the AI know everything about me? Is that safe?',
        a: 'It only keeps minimal data, and it\'s encrypted. The assistant won\'t share your personal info without your say-so.'
      },
      {
        q: 'What does "developing your avatar" mean?',
        a: 'You have a digital character reflecting your values, activity level, creativity, and emotions. Completing quests boosts those traits and raises your social capital.'
      },
      {
        q: 'How does the AI decide what to recommend?',
        a: 'It uses algorithms (QuantumMatch, Tetrahedron AI) to match your interests and behavior with quests and people who might be a good fit.'
      }
    ]
  },
  {
    category: 'About Quests (Main Feature)',
    questions: [
      {
        q: 'What are these "quests" in the app?',
        a: 'They\'re real-world tasks (like "grab coffee together" or "go for a run"). They can be team-based, solo, creative, and much more.'
      },
      {
        q: 'Is it a game or just tasks?',
        a: 'It\'s both. There\'s a game-like element with progress and rewards. At the same time, you get together in real life.'
      },
      {
        q: 'Why should I do them?',
        a: 'They help you meet people and work on self-improvement. Completing a quest means carrying out an offline task with others, which is fun and raises your reputation.'
      },
      {
        q: 'What do I get if I complete a quest?',
        a: 'You earn tokens (an in-app reward), boost your Social Capital Index (SCI), make new connections, and gain interesting experiences.'
      },
      {
        q: 'Can I create my own quests?',
        a: 'Yes. After you finish the initial intro quests, you can make custom ones of your own.'
      },
      {
        q: 'Are the quests online or offline?',
        a: 'Mostly offline. Some training or onboarding quests happen online, but the main point is face-to-face meetups.'
      },
      {
        q: 'Do I have to meet others? Is it safe?',
        a: 'Yes, offline gatherings are the core idea. Safety is backed by meetup verification and a reputation system that discourages dishonesty.'
      },
      {
        q: 'How do you confirm a real-life meetup happened?',
        a: 'Through a QR code or NFC at the spot, or location tracking. The app makes sure both participants were really in the same place.'
      }
    ]
  },
  {
    category: 'Safety and Privacy',
    questions: [
      {
        q: 'What user data do you collect?',
        a: 'Very little: a name or nickname, interests, region, and quest progress. Location data kicks in only when you confirm a meetup. There\'s no chat, so no private messages are collected.'
      },
      {
        q: 'Is it anonymous?',
        a: 'You can use a nickname and skip personal details. If you want genuine connections, though, it\'s helpful to fill out more of your profile.'
      },
      {
        q: 'How can I hide if I don\'t want people seeing me?',
        a: 'Just switch on privacy mode. Then nobody can find you, and you won\'t receive quest invites. You decide when to go "online."'
      },
      {
        q: 'Can I shut off AI recommendations?',
        a: 'Yes. You can reduce or switch them off in the personal settings.'
      },
      {
        q: 'How do you handle fakes or scams?',
        a: 'We verify meetups (QR/NFC), have a complaint feature, and track reputation scores. Anyone who cheats sees their SCI drop, and major violations lead to a ban.'
      },
      {
        q: 'Can I block a user if they\'re annoying?',
        a: 'Yes. You can file a complaint or block them so you don\'t get any more invites from that person.'
      }
    ]
  },
  {
    category: 'Rewards and Tokens',
    questions: [
      {
        q: 'What are tokens? Is this crypto?',
        a: 'Tokens act like an internal "currency" for social activity. They\'re not on exchanges right now. It\'s a way to reward engagement and track progress.'
      },
      {
        q: 'Can I earn real money with them?',
        a: 'Not at this stage. The tokens aren\'t cashable at this time. Later, there might be programs or bonuses.'
      },
      {
        q: 'Where is my balance stored?',
        a: 'It\'s linked to your Compliment account. If you connect a Web3 wallet (once smart contracts are fully integrated), you can keep them there as well.'
      },
      {
        q: 'Can I give or send my tokens to a friend?',
        a: 'Yes. You can send "compliment-tokens" for cool achievements or as part of a group quest.'
      },
      {
        q: 'Why do I need tokens if I can\'t cash them out?',
        a: 'They\'re your social status in the community. With tokens, you can unlock features, enhance your avatar, and join exclusive quests.'
      },
      {
        q: 'Can I spend them on something useful?',
        a: 'Yes. You can use tokens for digital items (avatar skins, rare stickers, NFT badges) or to get access to special events.'
      }
    ]
  },
  {
    category: 'Technical Details and Platform',
    questions: [
      {
        q: 'Which devices can run Compliment?',
        a: 'iOS and Android (check the App Store or Google Play). There\'s a partial web version, but it\'s mainly meant for mobile.'
      },
      {
        q: 'How big is the app, and do I need to stay online?',
        a: 'It\'s about 100–150 MB, depending on the version. You\'ll need internet for syncing quests and meetups. Some features, like the assistant\'s notes, still work offline.'
      },
      {
        q: 'Does it work outside my city or country?',
        a: 'We\'re launching in a few regions first. Once that goes well, we\'ll open it up globally. You only need location services when confirming meetups.'
      },
      {
        q: 'Do I need GPS or NFC turned on?',
        a: 'Yes, if you want the full experience. It helps with verifying meetups. You can tweak privacy settings whenever you like.'
      },
      {
        q: 'If I lose my phone, what happens to my progress?',
        a: 'Your data (progress, tokens) sits on the server under your account, so you\'ll get it all back when you reinstall on a new device.'
      }
    ]
  },
  {
    category: 'Web3, Blockchain, and Advanced Tech',
    questions: [
      {
        q: 'What do you mean by a "decentralized platform"?',
        a: 'We follow Web3 principles—some data is stored on a blockchain (like Solana), and smart contracts handle fair distribution of rewards.'
      },
      {
        q: 'What are smart contracts?',
        a: 'They\'re programs on the blockchain that automatically handle rewards when quest conditions are met. No guesswork—everything\'s in the code.'
      },
      {
        q: 'Do I need a crypto wallet to use Compliment?',
        a: 'No. You can use it without dealing with any blockchain details. If you want to hold tokens in a wallet, you can link one.'
      },
      {
        q: 'I don\'t understand Web3. Does it matter?',
        a: 'No. Most folks can use Compliment without touching blockchain tech. It\'s running behind the scenes.'
      },
      {
        q: 'Really? Why bother with blockchain at all?',
        a: 'It helps keep things fair (reputation, rewards, voting later in a DAO). It also opens up long-term decentralized options.'
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
