export interface Project {
  id: string;
  slug: string;
  title: {
    id: string;
    en: string;
  };
  summary: {
    id: string;
    en: string;
  };
  description: {
    id: string;
    en: string;
  };
  status: 'Prototype' | 'Internal Alpha' | 'In Development' | 'Pilot' | 'Research' | 'Experimental';
  category: 'AI Agents' | 'Automation' | 'Business Software' | 'Creative AI' | 'AI Infrastructure';
  techStack: string[];
  features: {
    id: string;
    en: string;
  }[];
  featured?: boolean;
}

export const PROJECTS: Project[] = [
  {
    id: '1',
    slug: 'affiloom',
    title: {
      id: 'Affiloom',
      en: 'Affiloom',
    },
    summary: {
      id: 'Sistem otomasi konten affiliate dan workflow produk-konten.',
      en: 'Affiliate content automation and product-content workflow system.',
    },
    description: {
      id: 'Affiloom mengotomasi riset produk affiliate, pembuatan konten, dan distribusi. Sistem ini mengelola siklus produk dari discovery hingga publishing dengan approval human-in-the-loop.',
      en: 'Affiloom automates affiliate product research, content creation, and distribution. The system manages the product cycle from discovery to publishing with human-in-the-loop approval.',
    },
    status: 'Internal Alpha',
    category: 'Automation',
    techStack: ['Next.js', 'TypeScript', 'Prisma', 'PostgreSQL', 'FastAPI'],
    features: [
      {
        id: 'Riset produk otomatis dari berbagai sumber',
        en: 'Automated product research from multiple sources',
      },
      {
        id: 'Pipeline konten dengan quality control',
        en: 'Content pipeline with quality control',
      },
      {
        id: 'Workflow approval dan publishing',
        en: 'Approval and publishing workflow',
      },
      {
        id: 'Multi-platform content distribution',
        en: 'Multi-platform content distribution',
      },
    ],
    featured: true,
  },
  {
    id: '2',
    slug: 'birruhealthos',
    title: {
      id: 'BirruHealthOS',
      en: 'BirruHealthOS',
    },
    summary: {
      id: 'Platform ERP/operasional yang bisa berjalan lokal maupun terhubung internet.',
      en: 'ERP/operational platform that works offline or cloud-connected.',
    },
    description: {
      id: 'BirruHealthOS adalah sistem ERP modular untuk operasional bisnis kecil dan menengah. Dirancang local-first dengan sync opsional, cocok untuk area dengan koneksi tidak stabil.',
      en: 'BirruHealthOS is a modular ERP system for small and medium business operations. Designed local-first with optional sync, ideal for areas with unstable connectivity.',
    },
    status: 'Prototype',
    category: 'Business Software',
    techStack: ['Next.js', 'TypeScript', 'Prisma', 'SQLite', 'PostgreSQL'],
    features: [
      {
        id: 'Berjalan offline dengan SQLite lokal',
        en: 'Works offline with local SQLite',
      },
      {
        id: 'Sync opsional ke cloud',
        en: 'Optional cloud sync',
      },
      {
        id: 'Manajemen inventory, sales, customer',
        en: 'Inventory, sales, customer management',
      },
      {
        id: 'Multi-user dengan role-based access',
        en: 'Multi-user with role-based access',
      },
    ],
    featured: true,
  },
  {
    id: '3',
    slug: 'social-media-ai-manager',
    title: {
      id: 'Social Media AI Manager',
      en: 'Social Media AI Manager',
    },
    summary: {
      id: 'Sistem multi-agent untuk otomasi sosial media end-to-end.',
      en: 'Multi-agent system for end-to-end social media automation.',
    },
    description: {
      id: 'Sistem AI multi-agent yang mengelola seluruh siklus konten sosial media: riset tren, perencanaan konten, penulisan, approval, engagement, dan publishing. CEO agent mengoordinasi research, creative, QC, dan publishing agent.',
      en: 'Multi-agent AI system managing the entire social media content cycle: trend research, content planning, writing, approval, engagement, and publishing. CEO agent coordinates research, creative, QC, and publishing agents.',
    },
    status: 'Internal Alpha',
    category: 'AI Agents',
    techStack: ['TypeScript', 'BullMQ', 'Redis', 'FastAPI', 'Hermes Agent'],
    features: [
      {
        id: 'CEO agent orchestration',
        en: 'CEO agent orchestration',
      },
      {
        id: 'Research agent untuk riset tren',
        en: 'Research agent for trend analysis',
      },
      {
        id: 'Creative agent untuk penulisan konten',
        en: 'Creative agent for content writing',
      },
      {
        id: 'QC agent untuk quality control',
        en: 'QC agent for quality control',
      },
    ],
    featured: true,
  },
  {
    id: '4',
    slug: 'creative-factory',
    title: {
      id: 'Creative Factory',
      en: 'Creative Factory',
    },
    summary: {
      id: 'Pipeline otomatis untuk pembuatan gambar, video, dan voice-over.',
      en: 'Automated pipeline for image, video, and voice-over generation.',
    },
    description: {
      id: 'Creative Factory adalah pipeline generatif untuk aset kreatif. Sistem ini mengelola workflow dari brief hingga asset delivery dengan quality control, revision, dan approval.',
      en: 'Creative Factory is a generative pipeline for creative assets. The system manages workflow from brief to asset delivery with quality control, revision, and approval.',
    },
    status: 'In Development',
    category: 'Creative AI',
    techStack: ['Python', 'FAL.ai', 'Replicate', 'Supabase Storage', 'BullMQ'],
    features: [
      {
        id: 'Generasi gambar via FAL/Replicate',
        en: 'Image generation via FAL/Replicate',
      },
      {
        id: 'Video generation dan clipping',
        en: 'Video generation and clipping',
      },
      {
        id: 'Voice-over dengan ElevenLabs/xAI',
        en: 'Voice-over with ElevenLabs/xAI',
      },
      {
        id: 'Quality control dan approval workflow',
        en: 'Quality control and approval workflow',
      },
    ],
    featured: false,
  },
  {
    id: '5',
    slug: 'birrua-ffhub',
    title: {
      id: 'BirruAffHub',
      en: 'BirruAffHub',
    },
    summary: {
      id: 'Hub distribusi dan monitoring operasi affiliate.',
      en: 'Affiliate operations distribution and monitoring hub.',
    },
    description: {
      id: 'BirruAffHub adalah hub sentral untuk mengelola operasi affiliate di berbagai platform. Monitoring performa, distribusi konten, dan analitik terpusat.',
      en: 'BirruAffHub is the central hub for managing affiliate operations across platforms. Performance monitoring, content distribution, and centralized analytics.',
    },
    status: 'Prototype',
    category: 'Automation',
    techStack: ['Next.js', 'TypeScript', 'Prisma', 'PostgreSQL', 'Supabase'],
    features: [
      {
        id: 'Dashboard performa multi-platform',
        en: 'Multi-platform performance dashboard',
      },
      {
        id: 'Distribusi konten terpusat',
        en: 'Centralized content distribution',
      },
      {
        id: 'Tracking affiliate links',
        en: 'Affiliate link tracking',
      },
    ],
    featured: false,
  },
  {
    id: '6',
    slug: 'ai-agent-orchestration',
    title: {
      id: 'AI Agent Orchestration',
      en: 'AI Agent Orchestration',
    },
    summary: {
      id: 'Infrastruktur CEO agent dan worker multi-agent.',
      en: 'CEO agent and multi-agent worker infrastructure.',
    },
    description: {
      id: 'Infrastruktur untuk mengelola sistem multi-agent dengan CEO orchestrator, worker agents, dan distributed task queue. Research area untuk agent coordination, consensus, dan autonomous decision-making.',
      en: 'Infrastructure for managing multi-agent systems with CEO orchestrator, worker agents, and distributed task queues. Research area for agent coordination, consensus, and autonomous decision-making.',
    },
    status: 'Research',
    category: 'AI Infrastructure',
    techStack: ['TypeScript', 'Python', 'BullMQ', 'Redis', 'Hermes Agent'],
    features: [
      {
        id: 'CEO orchestrator pattern',
        en: 'CEO orchestrator pattern',
      },
      {
        id: 'Distributed task queue',
        en: 'Distributed task queue',
      },
      {
        id: 'Agent-to-agent communication protocol',
        en: 'Agent-to-agent communication protocol',
      },
      {
        id: 'Consensus dan voting mechanism',
        en: 'Consensus and voting mechanism',
      },
    ],
    featured: false,
  },
];
