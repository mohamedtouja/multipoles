import { MetadataRoute } from 'next';
import { baseUrl } from '@/lib/seo';

export default function sitemap(): MetadataRoute.Sitemap {
  const routes = [
    '',
    '/solutions',
    '/realisations',
    '/apropos',
    '/equipe',
    '/blog',
    '/contact',
    '/devis',
    '/simulateur',
  ].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date().toISOString(),
    changeFrequency: route === '' || route === '/blog' ? ('daily' as const) : ('weekly' as const),
    priority: route === '' ? 1 : route === '/contact' ? 0.9 : 0.8,
  }));

  return routes;
}
