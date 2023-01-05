import sanityClient from "@sanity/client";
import imgeUrlByuilder from "@sanity/image-url";

export const client = sanityClient({
  projectId: "crm663ch",
  dataset: "production",
  apiVersion: "2022-03-10",
  useCdn: true,
  token: process.env.NEXT_PUBLIC_SANITY_TOKEN,
});

const builder = imgeUrlByuilder(client);

export const urlFor = (source) => builder.image(source);
