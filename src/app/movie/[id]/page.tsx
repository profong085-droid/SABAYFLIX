import { notFound } from "next/navigation";
import { allMoviesList } from "@/lib/mockData";
import HorizontalMovieList from "@/components/HorizontalMovieList";
import MovieView from "@/components/MovieView";

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

      {/* Similar Movies */}
      <div className="mt-2">
        <HorizontalMovieList title="រឿងស្រដៀង" movies={similarMovies} />
      </div>
    </main>
  );
}
