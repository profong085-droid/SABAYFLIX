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

  const imageUrl = typeof movie.poster === 'string' ? movie.poster : movie.poster.src;

  return {
    title: `${movie.title} | PhumCine`,
    description: movie.description || `ទស្សនារឿង ${movie.title} កម្រិត ${movie.quality} នៅលើ PhumCine`,
    openGraph: {
      title: `${movie.title} | PhumCine`,
      description: movie.description || `ទស្សនារឿង ${movie.title} កម្រិត ${movie.quality} នៅលើ PhumCine`,
      images: [
        {
          url: imageUrl,
          width: 800,
          height: 600,
          alt: movie.title,
        },
      ],
      type: "video.movie",
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
