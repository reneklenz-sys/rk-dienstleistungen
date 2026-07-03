import { caseStudy } from "./caseStudy";
import { designPreset } from "./designPreset";
import { homepage } from "./homepage";
import { labProduct } from "./labProduct";
import { localizedString, localizedStringList, localizedText, projectScreenshot, sectionSetting, seo } from "./objects";
import { processStep } from "./processStep";
import { project } from "./project";
import { service } from "./service";
import { siteSettings } from "./siteSettings";

export const schemaTypes = [
  localizedString,
  localizedText,
  localizedStringList,
  projectScreenshot,
  seo,
  sectionSetting,
  siteSettings,
  designPreset,
  homepage,
  service,
  project,
  caseStudy,
  labProduct,
  processStep,
];
