import { AboutSection } from "./AboutSection";
import { CaseStudiesSection } from "./CaseStudiesSection";
import { ContactSection } from "./ContactSection";
import { LabsSection } from "./LabsSection";
import { ProcessSection } from "./ProcessSection";
import { ProjectsSection } from "./ProjectsSection";
import { ServicesSection } from "./ServicesSection";

import type { ReactNode } from "react";
import type { HomepageData, Locale, SectionKey } from "@/types/content";

const sectionComponents: Record<SectionKey, (props: { data: HomepageData; locale: Locale }) => ReactNode> = {
  services: ({ data, locale }) => <ServicesSection services={data.services} locale={locale} />,
  why: () => null,
  featured: ({ data, locale }) => (
    <ProjectsSection projects={data.projects} caseStudies={data.caseStudies} locale={locale} />
  ),
  caseStudies: ({ data, locale }) => (
    <CaseStudiesSection caseStudies={data.caseStudies} projects={data.projects} locale={locale} />
  ),
  labs: ({ data, locale }) => <LabsSection labs={data.labs} locale={locale} />,
  process: ({ data, locale }) => <ProcessSection steps={data.process} locale={locale} />,
  about: ({ data, locale }) => <AboutSection about={data.about} why={data.why} locale={locale} />,
  contact: ({ data, locale }) => <ContactSection contact={data.contact} locale={locale} />,
};

export function PageSections({ data, locale }: { data: HomepageData; locale: Locale }) {
  return (
    <>
      {data.sectionOrder
        .filter((section) => !data.hiddenSections.includes(section))
        .map((section) => (
          <div key={section}>{sectionComponents[section]({ data, locale })}</div>
        ))}
    </>
  );
}
