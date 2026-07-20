import { ChevronRight } from "lucide-react";
import MovieCard from "./MovieCard";
import type { Movie } from "@/lib/mockData";
import Link from "next/link";

interface HorizontalMovieListProps {
  title: string;
  movies: Movie[];
  viewAllLink?: string;
}

export default function HorizontalMovieList({ title, movies, viewAllLink }: HorizontalMovieListProps) {
  return (
    <div className="py-4">
      <div className="flex items-center justify-between px-4 mb-3">
        <h2 className="text-lg font-medium text-textPrimary">{title}</h2>
        {viewAllLink && (
          <Link href={viewAllLink} className="text-textSecondary hover:text-white">
            <ChevronRight className="w-5 h-5" />
          </Link>
        )}
      </div>
      
      <div className="flex overflow-x-auto gap-3 px-4 pb-4 scrollbar-hide snap-x">
        {movies.map((movie) => (
          <div key={movie.id} className="snap-start w-[100px] flex-none">
            <MovieCard movie={movie} />
          </div>
        ))}
      </div>
    </div>
  );
}
