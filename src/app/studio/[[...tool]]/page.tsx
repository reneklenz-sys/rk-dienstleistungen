"use client";

import { NextStudio } from "next-sanity/studio";

import { StudioSetupGuide } from "@/components/studio/StudioSetupGuide";
import config from "../../../../sanity.config";

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID ?? "";
const studioReady =
  Boolean(projectId) && projectId !== "your-project-id" && projectId !== "replace-with-project-id";

export default function StudioPage() {
  if (!studioReady) {
    return <StudioSetupGuide />;
  }

  return <NextStudio config={config} />;
}
