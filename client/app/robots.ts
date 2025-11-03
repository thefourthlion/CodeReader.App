import { MetadataRoute } from 'next'
import { siteConfig } from '@/config/site'

export const dynamic = 'force-static'
export const revalidate = false

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/pages/qrcodehistory', '/pages/login', '/pages/register', '/api/'],
      },
    ],
    sitemap: `${siteConfig.url}/sitemap.xml`,
  }
}

