import { MetadataRoute } from 'next'
import { allMoviesList } from '@/lib/mockData'
 
export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://sabayflix-4.vercel.app'
  
  // Static Routes
  const routes = [
    '',
    '/movies',
    '/search',
    '/vip',
    '/promotions',
    '/login',
    '/register'
  ].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: 'daily' as const,
    priority: route === '' ? 1 : 0.8,
  }))
  
  // Dynamic Routes for Movies
  const movieRoutes = allMoviesList.map((movie) => ({
    url: `${baseUrl}/movie/${movie.id}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: 0.9,
  }))

  return [...routes, ...movieRoutes]
}
