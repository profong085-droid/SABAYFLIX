import { notFound } from "next/navigation";
import { Metadata } from "next";
import { allMoviesList } from "@/lib/mockData";
import HorizontalMovieList from "@/components/HorizontalMovieList";
import MovieView from "@/components/MovieView";

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }): Promise<Metadata> {
  const { id } = await params;
  const movie = allMoviesList.find(m => m.id === id);
  
  if (!movie) {
    return { title: "មិនមានរឿងនេះទេ - PhumCine" };
  }

  const relativeImageUrl = typeof movie.poster === 'string' ? movie.poster : movie.poster.src;
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://sabayflix-4.vercel.app";
  const fullImageUrl = relativeImageUrl.startsWith("http")
    ? relativeImageUrl
    : `${baseUrl}${relativeImageUrl.startsWith("/") ? "" : "/"}${relativeImageUrl}`;
  const pageUrl = `${baseUrl}/movie/${movie.id}`;

  return {
    title: `${movie.title} | PhumCine`,
    description: movie.description || `ទស្សនារឿង ${movie.title} កម្រិត ${movie.quality} នៅលើ PhumCine`,
    metadataBase: new URL(baseUrl),
    openGraph: {
      title: movie.title,
      description: movie.description || `ទស្សនារឿង ${movie.title} កម្រិត ${movie.quality} នៅលើ PhumCine`,
      url: pageUrl,
      siteName: "PhumCine",
      images: [
        {
          url: fullImageUrl,
          width: 1200,
          height: 630,
          alt: movie.title,
        },
      ],
      type: "video.movie",
    },
    twitter: {
      card: "summary_large_image",
      title: movie.title,
      description: movie.description || `ទស្សនារឿង ${movie.title} កម្រិត ${movie.quality} នៅលើ PhumCine`,
      images: [fullImageUrl],
    },
  };
}

export default async function MovieDetailsPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const movie = allMoviesList.find(m => m.id === id);
  
  // For demo, if not found, use a fallback so we don't break
  const m = movie || allMoviesList[0];

  // Find similar movies (same genre), exclude current
  const similarMovies = allMoviesList
    .filter(x => x.id !== m.id && x.genre === m.genre)
    .slice(0, 5);
    
  // If we don't have enough similar movies, fill up with other movies
  if (similarMovies.length < 5) {
    const fillMovies = allMoviesList
      .filter(x => x.id !== m.id && x.genre !== m.genre)
      .slice(0, 5 - similarMovies.length);
    similarMovies.push(...fillMovies);
  }

  return (
    <main className="min-h-screen bg-background pb-20">
      <MovieView movie={m} />
    </main>
  );
}
