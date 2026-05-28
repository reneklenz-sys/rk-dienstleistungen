import type { HomepageData } from "@/types/content";

export const fallbackHomepage: HomepageData = {
  seo: {
    title: {
      de: "Digitale Auftritte, KI-Content und Webapps",
      en: "Websites, AI content and web apps",
    },
    description: {
      de: "Premium-Websites, Landingpages, KI-Visuals und digitale Tools für lokale Unternehmen, Praxen, Studios und Gründer.",
      en: "Premium websites, landing pages, AI visuals and digital tools for local businesses, studios and founders.",
    },
  },
  designPreset: {
    surfaceStyle: "premiumGlass",
    accent: "#7c5cff",
    accentSoft: "#d9d2ff",
    radius: "round",
    heroVariant: "calm",
    defaultTheme: "system",
  },
  sectionOrder: [
    "services",
    "why",
    "featured",
    "caseStudies",
    "labs",
    "process",
    "about",
    "contact",
  ],
  hiddenSections: [],
  hero: {
    eyebrow: {
      de: "Digitaler Partner für kleine Unternehmen, Praxen, Studios und Gründer",
      en: "Digital partner for small businesses, practices, studios and founders",
    },
    title: {
      de: "Digitale Auftritte, KI-Content und Webapps, die mehr können als gut aussehen.",
      en: "Digital presence, AI content and web apps that do more than look good.",
    },
    lead: {
      de: "Ich verbinde klares Webdesign, saubere Technik und auffällige Content-Ideen zu Websites, Landingpages und Tools, die im Alltag wirklich nutzbar sind.",
      en: "I combine clear web design, solid technology and standout content ideas into websites, landing pages and tools that are genuinely useful.",
    },
    primaryCta: { de: "Projekt anfragen", en: "Start a project" },
    secondaryCta: { de: "Referenzen ansehen", en: "View work" },
    proofPoints: {
      de: ["CMS statt Baukasten", "Mobile schnell", "Design, Technik und Content aus einer Hand"],
      en: ["CMS instead of builder look", "Fast on mobile", "Design, technology and content from one hand"],
    },
  },
  services: [
    {
      title: { de: "Websites & CMS", en: "Websites & CMS" },
      description: {
        de: "Hochwertige Websites mit Sanity CMS, klarer Struktur und einem Look, der nicht nach Standard-Template aussieht.",
        en: "High-quality websites with Sanity CMS, clear structure and a look that does not feel like a generic template.",
      },
      tags: { de: ["Sanity", "SEO-Basis", "Responsive"], en: ["Sanity", "SEO basics", "Responsive"] },
      order: 1,
      visible: true,
    },
    {
      title: { de: "Landingpages", en: "Landing pages" },
      description: {
        de: "Fokussierte Seiten für Aktionen, Angebote, lokale Kampagnen oder neue Leistungen.",
        en: "Focused pages for campaigns, offers, local launches or new services.",
      },
      tags: { de: ["Aktionen", "Anfragen", "Kampagnen"], en: ["Offers", "Leads", "Campaigns"] },
      order: 2,
      visible: true,
    },
    {
      title: { de: "KI-Werbung & Content", en: "AI ads & content" },
      description: {
        de: "KI-generierte Werbemotive, Social-Media-Visuals, Reels-Ideen und Content-Serien für sichtbare Markenmomente.",
        en: "AI-generated campaign visuals, social media assets, reel concepts and content series for visible brand moments.",
      },
      tags: { de: ["Visuals", "Reels", "Content-Serien"], en: ["Visuals", "Reels", "Content series"] },
      order: 3,
      visible: true,
    },
    {
      title: { de: "SEO & lokale Sichtbarkeit", en: "SEO & local visibility" },
      description: {
        de: "Saubere SEO-Grundstruktur, klare Inhalte und lokale Suchsignale als solides Fundament.",
        en: "Clean SEO structure, clear content and local search signals as a solid foundation.",
      },
      tags: { de: ["Meta-Daten", "Struktur", "Lokal"], en: ["Metadata", "Structure", "Local"] },
      order: 4,
      visible: true,
    },
    {
      title: { de: "Web-Apps & Tools", en: "Web apps & tools" },
      description: {
        de: "Kleine Webapps, Prototypen und digitale Werkzeuge, die Prozesse vereinfachen oder Ideen testbar machen.",
        en: "Small web apps, prototypes and digital tools that simplify processes or make ideas testable.",
      },
      tags: { de: ["Prototypen", "Tools", "Apps"], en: ["Prototypes", "Tools", "Apps"] },
      order: 5,
      visible: true,
    },
    {
      title: { de: "Betreuung & Pflege", en: "Care & improvement" },
      description: {
        de: "Laufende Weiterentwicklung, Inhaltsupdates und technische Pflege, wenn dein Auftritt wachsen soll.",
        en: "Ongoing improvement, content updates and technical care when your digital presence should keep growing.",
      },
      tags: { de: ["Updates", "Pflege", "Weiterentwicklung"], en: ["Updates", "Care", "Iteration"] },
      order: 6,
      visible: true,
    },
  ],
  why: {
    title: { de: "Warum ich?", en: "Why me?" },
    lead: {
      de: "Du bekommst keinen Agenturapparat, sondern einen direkten Partner, der Design, Technik und Content zusammen denkt.",
      en: "You do not get an agency machine. You get a direct partner who thinks design, technology and content together.",
    },
    points: {
      de: [
        "Ich übersetze gute Ideen in klare digitale Erlebnisse.",
        "Ich baue Systeme, die du später wirklich pflegen kannst.",
        "Ich denke in sichtbaren Ergebnissen statt in Buzzwords.",
      ],
      en: [
        "I turn strong ideas into clear digital experiences.",
        "I build systems you can actually maintain later.",
        "I focus on visible outcomes, not buzzwords.",
      ],
    },
  },
  projects: [
    {
      title: "Hausarztpraxis Klätschke V2",
      slug: "hausarztpraxis-klaetschke-v2",
      shortDescription: {
        de: "Premium-Relaunch für eine Praxis mit CMS, Darkmode, Mehrsprachigkeit und Performance-Fokus.",
        en: "Premium relaunch for a medical practice with CMS, dark mode, multilingual structure and performance focus.",
      },
      description: {
        de: "Ein ruhiger, vertrauenswürdiger digitaler Auftritt mit klaren Wegen zu Leistungen, Kontakt und Praxisinformationen.",
        en: "A calm, trustworthy digital presence with clear paths to services, contact and practice information.",
      },
      category: { de: "Praxis-Website", en: "Medical practice website" },
      clientType: "client",
      year: "2026",
      status: "inProgress",
      technologies: ["Next.js", "Sanity", "TypeScript", "Design System"],
      services: {
        de: ["Website & CMS", "Designsystem", "Mehrsprachigkeit", "Performance"],
        en: ["Website & CMS", "Design system", "Multilingual", "Performance"],
      },
      caseStudyText: {
        de: "Die zweite Version legt den Fokus auf bessere Inhaltssteuerung, klare Services und eine hochwertigere visuelle Sprache.",
        en: "The second version focuses on better content control, clearer services and a more premium visual language.",
      },
      outcome: {
        de: "Mehr Klarheit, bessere Pflegebarkeit und ein professioneller erster Eindruck für Patientinnen und Patienten.",
        en: "More clarity, easier maintenance and a stronger first impression for patients.",
      },
      featured: true,
      order: 1,
    },
    {
      title: "Lokale Kampagnen-Landingpage",
      slug: "lokale-kampagnen-landingpage",
      shortDescription: {
        de: "Konzept für schnelle lokale Angebotsseiten mit klarer Anfrageführung.",
        en: "Concept for fast local offer pages with a clear request flow.",
      },
      description: {
        de: "Ein wiederverwendbares Landingpage-System für Aktionen, saisonale Angebote und lokale Kampagnen.",
        en: "A reusable landing page system for offers, seasonal promotions and local campaigns.",
      },
      category: { de: "Landingpage-System", en: "Landing page system" },
      clientType: "ownProject",
      year: "2026",
      status: "concept",
      technologies: ["Next.js", "Sanity", "SEO"],
      services: { de: ["Landingpages", "SEO", "Content"], en: ["Landing pages", "SEO", "Content"] },
      caseStudyText: {
        de: "Das System soll kleinen Unternehmen helfen, neue Angebote schnell sichtbar zu machen.",
        en: "The system helps small businesses make new offers visible quickly.",
      },
      outcome: {
        de: "Schneller von Idee zu veröffentlichter Aktionsseite.",
        en: "Faster from idea to published campaign page.",
      },
      featured: true,
      order: 2,
    },
  ],
  caseStudies: [
    {
      title: "Hausarztpraxis Klätschke V2",
      slug: "hausarztpraxis-klaetschke-v2",
      eyebrow: { de: "Case Study", en: "Case study" },
      summary: {
        de: "CMS, Performance, Darkmode, Designsystem und Mehrsprachigkeit für einen moderneren Praxisauftritt.",
        en: "CMS, performance, dark mode, design system and multilingual structure for a more modern practice website.",
      },
      challenge: {
        de: "Praxisinformationen müssen schnell verständlich sein, Vertrauen schaffen und ohne technische Hürde gepflegt werden können.",
        en: "Practice information must be quickly understandable, build trust and stay easy to maintain without technical friction.",
      },
      solution: {
        de: "Ein ruhiges Liquid-Glass-System, strukturierte CMS-Inhalte und klare mobile Wege zu Kontakt, Leistungen und Informationen.",
        en: "A calm liquid glass system, structured CMS content and clear mobile paths to contact, services and information.",
      },
      result: {
        de: "Ein flexibler Auftritt, der hochwertiger wirkt und künftig ohne kompletten Relaunch erweitert werden kann.",
        en: "A flexible presence that feels more premium and can grow without a full rebuild.",
      },
      metrics: {
        de: ["CMS-basiert", "Mehrsprachig vorbereitet", "Darkmode-fähig"],
        en: ["CMS based", "Prepared for multiple languages", "Dark-mode ready"],
      },
      projectSlug: "hausarztpraxis-klaetschke-v2",
      order: 1,
    },
  ],
  labs: [
    {
      title: { de: "Dating-App", en: "Dating app" },
      slug: "dating-app",
      description: {
        de: "Eigenes Produkt als Proof of Work für moderne Webapps, Nutzerführung, Profile und Matching-Ideen.",
        en: "Own product as proof of work for modern web apps, user flows, profiles and matching concepts.",
      },
      type: { de: "Eigenes Produkt", en: "Own product" },
      status: { de: "In Entwicklung", en: "In development" },
      highlights: {
        de: ["Produktdenken", "Mobile UX", "Prototyping"],
        en: ["Product thinking", "Mobile UX", "Prototyping"],
      },
      order: 1,
    },
    {
      title: { de: "KI-Musikvideos", en: "AI music videos" },
      slug: "ki-musikvideos",
      description: {
        de: "Experimente mit KI-generierten visuellen Konzepten, Szenen und Storylines für Musik- und Contentformate.",
        en: "Experiments with AI-generated visual concepts, scenes and storylines for music and content formats.",
      },
      type: { de: "Content-Experiment", en: "Content experiment" },
      status: { de: "Lab", en: "Lab" },
      highlights: {
        de: ["Visual Storytelling", "KI-Ästhetik", "Social Content"],
        en: ["Visual storytelling", "AI aesthetics", "Social content"],
      },
      order: 2,
    },
    {
      title: { de: "Digitale Tools", en: "Digital tools" },
      slug: "digitale-tools",
      description: {
        de: "Kleine Prototypen für Abläufe, Rechner, Anfrageprozesse oder interne Mini-Apps.",
        en: "Small prototypes for workflows, calculators, request flows or internal mini apps.",
      },
      type: { de: "Webapp-Prototyp", en: "Web app prototype" },
      status: { de: "Konzept", en: "Concept" },
      highlights: {
        de: ["Schnell testbar", "Erweiterbar", "Praxisnah"],
        en: ["Quick to test", "Extendable", "Practical"],
      },
      order: 3,
    },
  ],
  process: [
    {
      title: { de: "Kennenlernen", en: "Discovery" },
      description: {
        de: "Wir klären Ziel, Zielgruppe, Angebot und was die Website oder App konkret leisten soll.",
        en: "We clarify the goal, audience, offer and what the website or app needs to achieve.",
      },
      order: 1,
    },
    {
      title: { de: "Konzept", en: "Concept" },
      description: {
        de: "Ich verdichte Inhalte, Struktur und visuelle Richtung zu einem klaren Plan.",
        en: "I turn content, structure and visual direction into a clear plan.",
      },
      order: 2,
    },
    {
      title: { de: "Design", en: "Design" },
      description: {
        de: "Das Design bekommt Hierarchie, Whitespace, Glasflächen und eine markentaugliche Bildsprache.",
        en: "The design gets hierarchy, whitespace, glass surfaces and brand-ready visuals.",
      },
      order: 3,
    },
    {
      title: { de: "Umsetzung", en: "Build" },
      description: {
        de: "Ich baue die Webapp sauber, performant und mit CMS-Steuerung auf.",
        en: "I build the web app cleanly, performantly and with CMS control.",
      },
      order: 4,
    },
    {
      title: { de: "Übergabe", en: "Handover" },
      description: {
        de: "Du bekommst eine verständliche Übergabe, damit Inhalte später gepflegt werden können.",
        en: "You get a clear handover so content can be maintained later.",
      },
      order: 5,
    },
    {
      title: { de: "Betreuung", en: "Care" },
      description: {
        de: "Auf Wunsch entwickle ich den Auftritt laufend weiter.",
        en: "If needed, I keep improving the digital presence over time.",
      },
      order: 6,
    },
  ],
  about: {
    title: { de: "Über mich", en: "About me" },
    text: {
      de: "Ich baue digitale Auftritte und Tools für Menschen, die professionell wirken wollen, ohne sich in Technik zu verlieren. Mein Fokus liegt auf guter Gestaltung, klarer Bedienbarkeit und Inhalten, die auffallen, aber nicht laut werden.",
      en: "I build digital presence and tools for people who want to look professional without getting lost in technology. My focus is good design, clear usability and content that stands out without becoming loud.",
    },
  },
  contact: {
    title: { de: "Lass uns dein Projekt klären.", en: "Let us clarify your project." },
    lead: {
      de: "Schreib kurz, was du vorhast. Ich antworte direkt, verständlich und ohne Agentur-Blabla.",
      en: "Send a short note about what you are planning. I will answer directly and clearly.",
    },
    email: "hello@example.com",
    phone: "+49 000 000000",
    cta: { de: "Anfrage per E-Mail senden", en: "Send request by email" },
  },
};
