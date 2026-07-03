import type { HomepageData } from "@/types/content";

export const fallbackHomepage: HomepageData = {
  seo: {
    title: {
      de: "Websites & KI-Content — René Klenz",
      en: "Websites & AI content — René Klenz",
    },
    description: {
      de: "Websites, Landingpages und KI-Content für Praxen, Studios und lokale Betriebe — direkt, klar, ohne Agentur.",
      en: "Websites, landing pages and AI content for practices, studios and local businesses — direct, clear, no agency.",
    },
  },
  designPreset: {
    surfaceStyle: "premiumGlass",
    colorPreset: "anthraciteCyan",
    accent: "#303040",
    accentSoft: "#e4f2f9",
    radius: "round",
    heroVariant: "calm",
    defaultTheme: "dark",
  },
  sectionOrder: [
    "featured",
    "services",
    "labs",
    "caseStudies",
    "process",
    "about",
    "contact",
  ],
  hiddenSections: ["why", "caseStudies", "process"],
  hero: {
    eyebrow: {
      de: "Websites, Content & digitale Auftritte",
      en: "Websites, content & digital presence",
    },
    title: {
      de: "Klar gestaltet. Direkt umgesetzt.",
      en: "Clearly designed. Directly built.",
    },
    lead: {
      de: "Für Praxen, Studios, lokale Betriebe und Selbstständige — Websites, Landingpages und KI-Content. Du redest mit mir, nicht mit einer Agentur.",
      en: "For practices, studios, local businesses and freelancers — websites, landing pages and AI content. You talk to me, not an agency.",
    },
    primaryCta: { de: "Kurz melden", en: "Get in touch" },
    secondaryCta: { de: "Referenzen ansehen", en: "View work" },
    proofPoints: {
      de: ["Ein Ansprechpartner", "Auch kleinere Projekte", "Sauber umgesetzt"],
      en: ["One point of contact", "Smaller projects welcome", "Clean execution"],
    },
  },
  services: [
    {
      title: { de: "Websites & CMS", en: "Websites & CMS" },
      description: {
        de: "Websites mit CMS — für Praxen, lokale Betriebe oder Selbstständige. Klar strukturiert, gut pflegbar, ohne Baukasten-Look.",
        en: "Websites with CMS — for practices, local businesses or freelancers. Clear structure, easy to maintain, no builder look.",
      },
      tags: { de: ["Sanity", "Responsive", "SEO-Basis"], en: ["Sanity", "Responsive", "SEO basics"] },
      order: 1,
      visible: true,
    },
    {
      title: { de: "Landingpages", en: "Landing pages" },
      description: {
        de: "Einzelne Seiten für Aktionen, neue Leistungen oder lokale Kampagnen — kompakt und zielgerichtet.",
        en: "Single pages for offers, new services or local campaigns — compact and focused.",
      },
      tags: { de: ["Aktionen", "Anfragen", "Kompakt"], en: ["Offers", "Leads", "Compact"] },
      order: 2,
      visible: true,
    },
    {
      title: { de: "KI-Visuals & Content", en: "AI visuals & content" },
      description: {
        de: "Social-Media-Posts, Werbemotive oder Content-Ideen mit KI — für Studios, Shops und alle, die sichtbar bleiben wollen.",
        en: "Social posts, campaign visuals or content ideas with AI — for studios, shops and anyone who wants to stay visible.",
      },
      tags: { de: ["Social Media", "Visuals", "Posts"], en: ["Social media", "Visuals", "Posts"] },
      order: 3,
      visible: true,
    },
  ],
  why: {
    title: { de: "Warum ich?", en: "Why me?" },
    lead: {
      de: "Direkter Draht, kein Agentur-Overhead.",
      en: "Direct contact, no agency overhead.",
    },
    points: {
      de: [
        "Du redest mit mir — von der Idee bis zur Umsetzung.",
        "Umfang und Ablauf klären wir vorher transparent.",
        "Saubere Übergabe, damit du später selbst pflegen kannst.",
      ],
      en: [
        "You talk to me — from idea through to delivery.",
        "We clarify scope and process upfront.",
        "A clean handover so you can maintain things yourself later.",
      ],
    },
  },
  projects: [
    {
      title: "Hausarztpraxis Klätschke",
      slug: "hausarztpraxis-klaetschke",
      shortDescription: {
        de: "Website für eine Hausarztpraxis — mit CMS, Darkmode, Mehrsprachigkeit und klarem Patientenfokus.",
        en: "Website for a general practice — with CMS, dark mode, multilingual structure and a clear patient focus.",
      },
      description: {
        de: "Ein ruhiger, vertrauenswürdiger digitaler Auftritt mit klaren Wegen zu Leistungen, Kontakt und Praxisinformationen.",
        en: "A calm, trustworthy digital presence with clear paths to services, contact and practice information.",
      },
      category: { de: "Praxis-Website", en: "Medical practice website" },
      clientType: "client",
      year: "2026",
      status: "live",
      liveLink: "https://www.hausarztpraxis-klaetschke.de/",
      technologies: ["Vite", "Sanity CMS", "TypeScript", "Design System"],
      services: {
        de: ["Website & CMS", "Designsystem", "Mehrsprachigkeit", "Performance"],
        en: ["Website & CMS", "Design system", "Multilingual", "Performance"],
      },
      caseStudyText: {
        de: "Fokus auf CMS-gesteuerte Inhalte, klare Leistungsdarstellung und eine vertrauenswürdige visuelle Sprache.",
        en: "Focus on CMS-driven content, clear services and a trustworthy visual language.",
      },
      outcome: {
        de: "Mehr Klarheit, bessere Pflegebarkeit und ein professioneller erster Eindruck für Patientinnen und Patienten.",
        en: "More clarity, easier maintenance and a stronger first impression for patients.",
      },
      featured: true,
      order: 1,
      screenshots: [
        {
          src: "/references/hausarztpraxis-klaetschke/01-hero.png",
          alt: { de: "Startseite mit Hero und Navigation", en: "Homepage with hero and navigation" },
        },
        {
          src: "/references/hausarztpraxis-klaetschke/02-leistungen.png",
          alt: { de: "Leistungsbereich und Inhaltsstruktur", en: "Services section and content structure" },
        },
        {
          src: "/references/hausarztpraxis-klaetschke/03-team.png",
          alt: { de: "Team-Bereich mit Praxisbild", en: "Team section with practice photo" },
        },
        {
          src: "/references/hausarztpraxis-klaetschke/04-kontakt.png",
          alt: { de: "Kontakt, Öffnungszeiten und Anfahrt", en: "Contact, opening hours and directions" },
        },
        {
          src: "/references/hausarztpraxis-klaetschke/05-mobile.png",
          alt: { de: "Mobile Ansicht der Website", en: "Mobile view of the website" },
        },
      ],
    },
    {
      title: "nextCrush",
      slug: "nextcrush",
      shortDescription: {
        de: "PWA für Dating, Community und Begegnung — mit drei Welten, Profilvertrauen und klarer Produktlogik.",
        en: "PWA for dating, community and connection — with three worlds, profile trust and clear product logic.",
      },
      description: {
        de: "Eigenes Produkt: eine deutschsprachige 18+-PWA mit Dating-, Social- und Casual-Welten, Selfie-Vertrauen, Matching, Chat und vorbereitetem Commerce-Stack.",
        en: "Own product: a German 18+ PWA with dating, social and casual worlds, selfie trust, matching, chat and a prepared commerce stack.",
      },
      category: { de: "Eigenes Produkt", en: "Own product" },
      clientType: "ownProject",
      year: "2026",
      status: "inProgress",
      liveLink: "https://nextcrush.de/",
      previewLink: "https://nextcrush.de/",
      technologies: ["Vite", "React", "Supabase", "TypeScript", "PWA"],
      services: {
        de: ["Produkt-UX", "Webapp", "Backend-Logik", "Moderation"],
        en: ["Product UX", "Web app", "Backend logic", "Moderation"],
      },
      caseStudyText: {
        de: "Proof of Work für komplexe Webapps: Welten-Logik, Vertrauensstufen, Gates, Admin und rechtssichere Produktflächen — nicht nur Marketing-Website.",
        en: "Proof of work for complex web apps: world logic, trust levels, gates, admin and legally structured product surfaces — not just a marketing site.",
      },
      outcome: {
        de: "Zeigt, dass ich echte Produkte bauen kann — von Landing über Onboarding bis zu Match- und Chat-Flows.",
        en: "Shows I can build real products — from landing and onboarding through match and chat flows.",
      },
      featured: true,
      order: 3,
      screenshots: [
        {
          src: "/references/nextcrush/01-landing.png",
          alt: { de: "Landingpage nextCrush", en: "nextCrush landing page" },
        },
        {
          src: "/references/nextcrush/02-preise.png",
          alt: { de: "Preisseite und Produktlogik", en: "Pricing page and product logic" },
        },
        {
          src: "/references/nextcrush/03-mobile.png",
          alt: { de: "Mobile Ansicht der Landingpage", en: "Mobile landing page view" },
        },
      ],
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
      featured: false,
      order: 4,
    },
  ],
  caseStudies: [
    {
      title: "Hausarztpraxis Klätschke",
      slug: "hausarztpraxis-klaetschke",
      eyebrow: { de: "Case Study", en: "Case study" },
      summary: {
        de: "CMS, Performance, Darkmode, Designsystem und Mehrsprachigkeit für einen professionellen Praxisauftritt.",
        en: "CMS, performance, dark mode, design system and multilingual structure for a professional practice website.",
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
        de: "Ein vertrauenswürdiger Auftritt, den die Praxis selbst pflegen kann und der sich jederzeit erweitern lässt.",
        en: "A trustworthy presence the practice can maintain itself and extend over time.",
      },
      metrics: {
        de: ["CMS-basiert", "Mehrsprachig vorbereitet", "Darkmode-fähig"],
        en: ["CMS based", "Prepared for multiple languages", "Dark-mode ready"],
      },
      projectSlug: "hausarztpraxis-klaetschke",
      order: 1,
    },
    {
      title: "nextCrush",
      slug: "nextcrush",
      eyebrow: { de: "Eigenes Produkt", en: "Own product" },
      summary: {
        de: "PWA für Dating, Community und Begegnung — mit drei Welten, Vertrauenslogik und vorbereitetem Commerce-Stack.",
        en: "PWA for dating, community and connection — with three worlds, trust logic and a prepared commerce stack.",
      },
      challenge: {
        de: "Ein 18+-Produkt braucht mehr als eine Landingpage: klare Welten-Logik, Vertrauensstufen, Moderation, rechtssichere Gates und echte App-Flows — ohne Agentur-Overhead.",
        en: "An 18+ product needs more than a landing page: clear world logic, trust levels, moderation, legally structured gates and real app flows — without agency overhead.",
      },
      solution: {
        de: "Eine deutschsprachige PWA mit Dating-, Social- und Casual-Welten, Selfie-Vertrauen, Matching, Chat, Admin und Supabase-Backend — als durchgängiges Produkt statt isolierter Screens.",
        en: "A German PWA with dating, social and casual worlds, selfie trust, matching, chat, admin and Supabase backend — as a coherent product instead of isolated screens.",
      },
      result: {
        de: "Proof of Work für komplexe Webapps: von Landing und Onboarding bis Match- und Chat-Flows — zeigt, dass ich echte Produkte bauen kann, nicht nur Marketing-Websites.",
        en: "Proof of work for complex web apps: from landing and onboarding through match and chat flows — showing I can build real products, not just marketing websites.",
      },
      metrics: {
        de: ["PWA", "Supabase", "Produkt-UX", "In Finalisierung"],
        en: ["PWA", "Supabase", "Product UX", "Finalizing"],
      },
      projectSlug: "nextcrush",
      order: 2,
    },
  ],
  labs: [
    {
      title: { de: "nextCrush", en: "nextCrush" },
      slug: "nextcrush",
      description: {
        de: "Eigenes PWA-Produkt für Begegnung, Dating und Community — zeigt, dass ich auch komplexere Webapps umsetzen kann.",
        en: "Own PWA product for connection, dating and community — showing I can also build more complex web apps.",
      },
      type: { de: "Eigenes Produkt", en: "Own product" },
      status: { de: "In Finalisierung", en: "Finalizing" },
      highlights: {
        de: ["PWA", "Supabase", "Produkt-UX"],
        en: ["PWA", "Supabase", "Product UX"],
      },
      order: 1,
    },
    {
      title: { de: "DeepaLunX", en: "DeepaLunX" },
      slug: "deepalunx",
      description: {
        de: "YouTube-Kanal für KI-Musikvideos, visuelle Storylines und experimentelle Content-Formate.",
        en: "YouTube channel for AI music videos, visual storylines and experimental content formats.",
      },
      type: { de: "YouTube / Content", en: "YouTube / content" },
      status: { de: "Live", en: "Live" },
      externalLink: "https://www.youtube.com/@DeepaLunX",
      highlights: {
        de: ["KI-Visuals", "Musikvideos", "YouTube"],
        en: ["AI visuals", "Music videos", "YouTube"],
      },
      order: 2,
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
      de: "Ich bin René Klenz — ich baue Websites und digitalen Content für Menschen, die professionell wirken wollen, ohne sich in Technik zu verlieren. Solo, mit modernen Tools, und mit dem Anspruch: gut aussehen, klar funktionieren, verständlich übergeben.",
      en: "I am René Klenz — I build websites and digital content for people who want to look professional without getting lost in technology. Solo, with modern tools, and with one standard: look good, work clearly, hand over understandably.",
    },
  },
  contact: {
    title: { de: "Unverbindlich anfragen.", en: "Ask without obligation." },
    lead: {
      de: "Schreib kurz, was du brauchst — Website, Landingpage oder KI-Visuals. Ich melde mich direkt bei dir.",
      en: "Send a short note about what you need — website, landing page or AI visuals. I will get back to you directly.",
    },
    email: "reneklenz@gmail.com",
    phone: "+49 176 45812748",
    cta: { de: "E-Mail schreiben", en: "Send an email" },
  },
};
