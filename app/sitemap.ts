import type { MetadataRoute } from 'next';

const SITE_URL = 'https://duarte-a-c-g-a.com';

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: SITE_URL, lastModified: new Date(), changeFrequency: 'monthly', priority: 1 },
    { url: `${SITE_URL}/projects/onboarding`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.8 },
    { url: `${SITE_URL}/projects/fostering-trust`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.8 },
    { url: `${SITE_URL}/projects/heritage-homeowners`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.8 },
  ];
}
