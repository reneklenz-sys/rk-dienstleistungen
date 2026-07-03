export type Locale = "de" | "en";

export type LocalizedString = Record<Locale, string>;
export type LocalizedStringArray = Record<Locale, string[]>;

export type SeoData = {
  title: LocalizedString;
  description: LocalizedString;
};

export type SectionKey =
  | "services"
  | "why"
  | "featured"
  | "caseStudies"
  | "labs"
  | "process"
  | "about"
  | "contact";

export type DesignPreset = {
  surfaceStyle: "clear" | "frosted" | "premiumGlass";
  colorPreset?: "anthraciteCyan" | "amethyst" | "graphite" | "champagne" | "ocean";
  accent: string;
  accentSoft: string;
  radius: "soft" | "round" | "pill";
  heroVariant: "calm" | "product" | "editorial";
  defaultTheme: "system" | "light" | "dark";
};

export type HeroContent = {
  eyebrow: LocalizedString;
  title: LocalizedString;
  lead: LocalizedString;
  primaryCta: LocalizedString;
  secondaryCta: LocalizedString;
  proofPoints: LocalizedStringArray;
};

export type Service = {
  title: LocalizedString;
  description: LocalizedString;
  tags: LocalizedStringArray;
  order: number;
  visible: boolean;
};

export type ProjectScreenshot = {
  src: string;
  alt: LocalizedString;
};

export type ProjectStatus = "concept" | "inProgress" | "live" | "completed";

export type Project = {
  title: string;
  slug: string;
  shortDescription: LocalizedString;
  description: LocalizedString;
  category: LocalizedString;
  clientType: "client" | "ownProject";
  year: string;
  status: ProjectStatus;
  technologies: string[];
  services: LocalizedStringArray;
  liveLink?: string;
  githubLink?: string;
  previewLink?: string;
  caseStudyText: LocalizedString;
  outcome: LocalizedString;
  featured: boolean;
  order: number;
  screenshots?: ProjectScreenshot[];
  seo?: SeoData;
};

export type CaseStudy = {
  title: string;
  slug: string;
  eyebrow: LocalizedString;
  summary: LocalizedString;
  challenge: LocalizedString;
  solution: LocalizedString;
  result: LocalizedString;
  metrics: LocalizedStringArray;
  projectSlug?: string;
  order: number;
  seo?: SeoData;
};

export type LabProduct = {
  title: LocalizedString;
  slug: string;
  description: LocalizedString;
  type: LocalizedString;
  status: LocalizedString;
  highlights: LocalizedStringArray;
  externalLink?: string;
  order: number;
};

export type ProcessStep = {
  title: LocalizedString;
  description: LocalizedString;
  order: number;
};

export type HomepageData = {
  seo: SeoData;
  designPreset: DesignPreset;
  sectionOrder: SectionKey[];
  hiddenSections: SectionKey[];
  hero: HeroContent;
  services: Service[];
  why: {
    title: LocalizedString;
    lead: LocalizedString;
    points: LocalizedStringArray;
  };
  projects: Project[];
  caseStudies: CaseStudy[];
  labs: LabProduct[];
  process: ProcessStep[];
  about: {
    title: LocalizedString;
    text: LocalizedString;
  };
  contact: {
    title: LocalizedString;
    lead: LocalizedString;
    email: string;
    phone: string;
    cta: LocalizedString;
  };
};
