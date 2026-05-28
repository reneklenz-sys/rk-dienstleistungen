import { groq } from "next-sanity";

export const homepageQuery = groq`
  *[_type == "homepage"][0]{
    seo,
    "designPreset": designPreset->{
      "surfaceStyle": surfaceStyle,
      "accent": accentColor,
      "accentSoft": accentSoftColor,
      "radius": radiusPreset,
      "heroVariant": heroVariant,
      "defaultTheme": darkModeDefault
    },
    "sectionOrder": sections[].key,
    "hiddenSections": sections[visible == false].key,
    hero,
    why,
    about,
    contact,
    "services": *[_type == "service" && visible != false] | order(order asc){
      title,
      description,
      tags,
      order,
      visible
    },
    "projects": coalesce(featuredProjects[]->, *[_type == "project" && featured == true] | order(order asc)){
      title,
      "slug": slug.current,
      shortDescription,
      description,
      category,
      clientType,
      year,
      status,
      technologies,
      services,
      liveLink,
      githubLink,
      previewLink,
      caseStudyText,
      outcome,
      featured,
      order
    },
    "caseStudies": coalesce(featuredCaseStudies[]->, *[_type == "caseStudy"] | order(order asc)[0...3]){
      title,
      "slug": slug.current,
      eyebrow,
      summary,
      challenge,
      solution,
      result,
      metrics,
      "projectSlug": project->slug.current,
      order
    },
    "labs": coalesce(featuredLabs[]->, *[_type == "labProduct" && visible != false] | order(order asc)){
      title,
      "slug": slug.current,
      description,
      type,
      status,
      highlights,
      order
    },
    "process": *[_type == "processStep" && visible != false] | order(order asc){
      title,
      description,
      order
    }
  }
`;

export const projectBySlugQuery = groq`
  *[_type == "project" && slug.current == $slug][0]{
    title,
    "slug": slug.current,
    shortDescription,
    description,
    category,
    clientType,
    year,
    status,
    technologies,
    services,
    liveLink,
    githubLink,
    previewLink,
    caseStudyText,
    outcome,
    featured,
    order,
    seo
  }
`;

export const caseStudyBySlugQuery = groq`
  *[_type == "caseStudy" && slug.current == $slug][0]{
    title,
    "slug": slug.current,
    eyebrow,
    summary,
    challenge,
    solution,
    result,
    metrics,
    "projectSlug": project->slug.current,
    order,
    seo
  }
`;
