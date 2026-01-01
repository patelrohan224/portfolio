import type { MetadataRoute } from 'next'
import { BLOGS } from './constants'
import { generateSlug } from './utils/slug'
import { Blog } from './types'
 
export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000"
  
  // Explicitly typing this as MetadataRoute.Sitemap solves the type mismatch
  const blogEntries: MetadataRoute.Sitemap = BLOGS.map((blog: Blog) => ({
    url: `${baseUrl}/${generateSlug(blog.title)}`,
    lastModified: new Date(blog.date),
    changeFrequency: "monthly",
    priority: 0.8,
  }));
 
  return [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'yearly',
      priority: 1,
    },
    {
      url: `${baseUrl}/blog`,
      lastModified: new Date(),
      changeFrequency: 'yearly',
      priority: 0.8,
    },
    ...blogEntries,
  ]
}