// Static bilingual translations for BirruLabs website
// No external i18n library - keep it simple and type-safe

export type Locale = 'id' | 'en';

interface Translations {
  nav: {
    home: string;
    about: string;
    projects: string;
    articles: string;
    contact: string;
  };
  hero: {
    title: string;
    subtitle: string;
    cta_primary: string;
    cta_secondary: string;
  };
  about: {
    title: string;
    subtitle: string;
    mission_title: string;
    mission_text: string;
    values_title: string;
    values: string[];
    story_title: string;
    story_text: string;
  };
  projects: {
    title: string;
    subtitle: string;
    view_all: string;
    featured: string;
    status: {
      prototype: string;
      alpha: string;
      development: string;
      pilot: string;
      research: string;
      experimental: string;
    };
  };
  articles: {
    title: string;
    subtitle: string;
    read_more: string;
    view_all: string;
    coming_soon: string;
  };
  contact: {
    title: string;
    subtitle: string;
    form: {
      name: string;
      email: string;
      organization: string;
      purpose: string;
      message: string;
      purpose_options: {
        partnership: string;
        startup: string;
        client: string;
        product: string;
        investment: string;
        media: string;
        other: string;
      };
    };
    submit: string;
    success: string;
    error: string;
    privacy: string;
  };
  footer: {
    tagline: string;
    rights: string;
    products: string;
    company: string;
    connect: string;
    get_in_touch: string;
    privacy: string;
    terms: string;
  };
  common: {
    learn_more: string;
    get_started: string;
    view_project: string;
    tech_stack: string;
    features: string;
    status: string;
    category: string;
  };
  home: {
    what_we_build_title: string;
    what_we_build_subtitle: string;
    ai_agents_title: string;
    ai_agents_desc: string;
    automation_title: string;
    automation_desc: string;
    creative_title: string;
    creative_desc: string;
    how_we_work_title: string;
    how_we_work_subtitle: string;
    step_research: string;
    step_design: string;
    step_build: string;
    step_ship: string;
    agent_orchestration_title: string;
    agent_orchestration_subtitle: string;
    startup_cta_title: string;
    startup_cta_subtitle: string;
    startup_cta_primary: string;
    startup_cta_secondary: string;
  };
}

export const translations: Record<Locale, Translations> = {
  id: {
    nav: {
      home: 'Beranda',
      about: 'Tentang',
      projects: 'Proyek',
      articles: 'Artikel',
      contact: 'Kontak',
    },
    hero: {
      title: 'Kami membangun sistem AI yang benar-benar bekerja, bukan sekadar demo.',
      subtitle: 'BirruLabs adalah studio teknologi yang membangun autonomous agent systems, social media automation, affiliate automation, dan creative content pipelines untuk startup dan bisnis.',
      cta_primary: 'Lihat Proyek',
      cta_secondary: 'Hubungi Kami',
    },
    about: {
      title: 'Siapa Kami dan Mengapa Kami Membangun',
      subtitle: 'BirruLabs adalah studio teknologi founder-led yang membangun sistem AI praktis.',
      mission_title: 'Misi',
      mission_text: 'Membangun sistem AI yang benar-benar bekerja di production, bukan hanya demo. Kami fokus pada autonomous agents, automation workflows, dan creative pipelines yang dapat diandalkan.',
      values_title: 'Nilai',
      values: [
        'Eksekusi teknis yang kuat',
        'Empati terhadap founder dan operator',
        'Hasil nyata, bukan hype',
        'Kolaborasi terbuka',
        'Build in public',
      ],
      story_title: 'Cerita Kami',
      story_text: 'BirruLabs dimulai sebagai eksperimen membangun AI agent systems. Sekarang kami fokus membangun tools dan infrastruktur untuk autonomous agents, social media automation, dan creative content workflows. Satu orang, building in public, no fake metrics.',
    },
    projects: {
      title: 'Proyek Kami',
      subtitle: 'Sistem AI dan automation yang sedang kami bangun.',
      view_all: 'Lihat Semua Proyek',
      featured: 'Unggulan',
      status: {
        prototype: 'Prototype',
        alpha: 'Internal Alpha',
        development: 'In Development',
        pilot: 'Pilot',
        research: 'Research',
        experimental: 'Experimental',
      },
    },
    articles: {
      title: 'Insights & Build Updates',
      subtitle: 'Artikel tentang AI agents, automation, dan build in public.',
      read_more: 'Baca Selengkapnya',
      view_all: 'Lihat Semua Artikel',
      coming_soon: 'Segera Hadir',
    },
    contact: {
      title: 'Hubungi Kami',
      subtitle: 'Tertarik dengan apa yang kami bangun? Mari bicara.',
      form: {
        name: 'Nama Lengkap',
        email: 'Email',
        organization: 'Organisasi / Perusahaan',
        purpose: 'Tujuan',
        message: 'Pesan',
        purpose_options: {
          partnership: 'Partnership',
          startup: 'Startup Program',
          client: 'Client Project',
          product: 'Product Collaboration',
          investment: 'Investment',
          media: 'Media',
          other: 'Lainnya',
        },
      },
      submit: 'Kirim Pesan',
      success: 'Pesan berhasil dikirim. Kami akan merespons dalam 24 jam.',
      error: 'Gagal mengirim pesan. Silakan coba lagi atau email langsung ke contact@birrulabs.biz.id',
      privacy: 'Kami menghormati privasi Anda dan tidak akan membagikan informasi Anda.',
    },
    footer: {
      tagline: 'Membangun sistem AI praktis yang bekerja di luar demo.',
      rights: '© 2026 BirruLabs. All rights reserved.',
      products: 'Produk',
      company: 'Perusahaan',
      connect: 'Connect',
      get_in_touch: 'Hubungi Kami',
      privacy: 'Privacy',
      terms: 'Terms',
    },
    common: {
      learn_more: 'Pelajari Lebih Lanjut',
      get_started: 'Mulai',
      view_project: 'Lihat Proyek',
      tech_stack: 'Tech Stack',
      features: 'Fitur',
      status: 'Status',
      category: 'Kategori',
    },
    home: {
      what_we_build_title: 'Apa yang Kami Bangun',
      what_we_build_subtitle: 'Fokus kami pada AI agents, automation, dan creative workflows.',
      ai_agents_title: 'AI Agents',
      ai_agents_desc: 'Multi-agent systems dengan CEO orchestrator, research, creative, QC, dan publishing agents.',
      automation_title: 'Automation Systems',
      automation_desc: 'Social media automation, affiliate automation, dan content workflows end-to-end.',
      creative_title: 'Creative Pipelines',
      creative_desc: 'Generasi gambar, video, voice-over dengan quality control dan approval.',
      how_we_work_title: 'Cara Kami Bekerja',
      how_we_work_subtitle: 'Proses sederhana, eksekusi kuat.',
      step_research: 'Research',
      step_design: 'Design',
      step_build: 'Build',
      step_ship: 'Ship',
      agent_orchestration_title: 'Agent Orchestration',
      agent_orchestration_subtitle: 'CEO agent mengoordinasi specialized workers untuk autonomous operations.',
      startup_cta_title: 'Build With Us',
      startup_cta_subtitle: 'Tertarik dengan startup program, partnership, atau collaboration? Mari bicara.',
      startup_cta_primary: 'Startup Profile',
      startup_cta_secondary: 'Contact Us',
    },
  },
  en: {
    nav: {
      home: 'Home',
      about: 'About',
      projects: 'Projects',
      articles: 'Articles',
      contact: 'Contact',
    },
    hero: {
      title: 'Building practical AI systems that work beyond the demo.',
      subtitle: 'BirruLabs is a technology studio building autonomous agent systems, social media automation, affiliate automation, and creative content pipelines for startups and businesses.',
      cta_primary: 'View Projects',
      cta_secondary: 'Get in Touch',
    },
    about: {
      title: 'Who We Are and Why We Build',
      subtitle: 'BirruLabs is a founder-led technology studio building practical AI systems.',
      mission_title: 'Mission',
      mission_text: 'Build AI systems that actually work in production, not just demos. We focus on autonomous agents, automation workflows, and reliable creative pipelines.',
      values_title: 'Values',
      values: [
        'Strong technical execution',
        'Founder and operator empathy',
        'Real results, not hype',
        'Open collaboration',
        'Build in public',
      ],
      story_title: 'Our Story',
      story_text: 'BirruLabs started as an experiment building AI agent systems. Now we focus on building tools and infrastructure for autonomous agents, social media automation, and creative content workflows. One person, building in public, no fake metrics.',
    },
    projects: {
      title: 'Our Projects',
      subtitle: 'AI systems and automation we are building.',
      view_all: 'View All Projects',
      featured: 'Featured',
      status: {
        prototype: 'Prototype',
        alpha: 'Internal Alpha',
        development: 'In Development',
        pilot: 'Pilot',
        research: 'Research',
        experimental: 'Experimental',
      },
    },
    articles: {
      title: 'Insights & Build Updates',
      subtitle: 'Articles about AI agents, automation, and building in public.',
      read_more: 'Read More',
      view_all: 'View All Articles',
      coming_soon: 'Coming Soon',
    },
    contact: {
      title: 'Get in Touch',
      subtitle: "Interested in what we build? Let's talk.",
      form: {
        name: 'Full Name',
        email: 'Email',
        organization: 'Organization / Company',
        purpose: 'Purpose',
        message: 'Message',
        purpose_options: {
          partnership: 'Partnership',
          startup: 'Startup Program',
          client: 'Client Project',
          product: 'Product Collaboration',
          investment: 'Investment',
          media: 'Media',
          other: 'Other',
        },
      },
      submit: 'Send Message',
      success: 'Message sent successfully. We will respond within 24 hours.',
      error: 'Failed to send message. Please try again or email directly to contact@birrulabs.biz.id',
      privacy: 'We respect your privacy and will not share your information.',
    },
    footer: {
      tagline: 'Building practical AI systems that work beyond the demo.',
      rights: '© 2026 BirruLabs. All rights reserved.',
      products: 'Products',
      company: 'Company',
      connect: 'Connect',
      get_in_touch: 'Get in Touch',
      privacy: 'Privacy',
      terms: 'Terms',
    },
    common: {
      learn_more: 'Learn More',
      get_started: 'Get Started',
      view_project: 'View Project',
      tech_stack: 'Tech Stack',
      features: 'Features',
      status: 'Status',
      category: 'Category',
    },
    home: {
      what_we_build_title: 'What We Build',
      what_we_build_subtitle: 'Our focus: AI agents, automation, and creative workflows.',
      ai_agents_title: 'AI Agents',
      ai_agents_desc: 'Multi-agent systems with CEO orchestrator, research, creative, QC, and publishing agents.',
      automation_title: 'Automation Systems',
      automation_desc: 'End-to-end social media automation, affiliate automation, and content workflows.',
      creative_title: 'Creative Pipelines',
      creative_desc: 'Image, video, voice-over generation with quality control and approval.',
      how_we_work_title: 'How We Work',
      how_we_work_subtitle: 'Simple process, strong execution.',
      step_research: 'Research',
      step_design: 'Design',
      step_build: 'Build',
      step_ship: 'Ship',
      agent_orchestration_title: 'Agent Orchestration',
      agent_orchestration_subtitle: 'CEO agent coordinates specialized workers for autonomous operations.',
      startup_cta_title: 'Build With Us',
      startup_cta_subtitle: "Interested in startup programs, partnerships, or collaboration? Let's talk.",
      startup_cta_primary: 'Startup Profile',
      startup_cta_secondary: 'Contact Us',
    },
  },
};

// Type-safe translation accessor
export function getT(locale: Locale): Translations {
  return translations[locale];
}
