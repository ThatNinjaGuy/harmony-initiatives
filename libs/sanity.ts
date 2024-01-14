// import { createClient } from "next-sanity";
import { createClient } from "@sanity/client";

const sanityClient = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET,
  useCdn: process.env.NODE_ENV === "production",
  token: process.env.SANITY_STUDIO_TOKEN,
  apiVersion: process.env.NEXT_PUBLIC_SANITY_API_VERSION,
});

export default sanityClient;
