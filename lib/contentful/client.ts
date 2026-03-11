import { createClient, type ContentfulClientApi } from "contentful";

const spaceId = process.env.CONTENTFUL_SPACE_ID;
const accessToken = process.env.CONTENTFUL_ACCESS_TOKEN;

export function getContentfulClient(): ContentfulClientApi<undefined> | null {
  if (!spaceId || !accessToken) return null;
  return createClient({ space: spaceId, accessToken });
}

export const hasContentful = Boolean(spaceId && accessToken);
