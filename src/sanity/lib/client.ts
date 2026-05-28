import { createClient } from "next-sanity";

import { apiVersion, dataset, hasSanityConfig, projectId } from "./env";

export const sanityClient = hasSanityConfig
  ? createClient({
      projectId,
      dataset,
      apiVersion,
      useCdn: true,
      perspective: "published",
    })
  : null;
