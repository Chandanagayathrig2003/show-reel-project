import { Movie } from "@/services/movieService";
import { MovieCard } from "./MovieCard";

interface MovieGridProps {
  movies: Movie[];
}

/**
 * MovieGrid Component
 * Renders a responsive grid of movie cards
 * Uses CSS Grid for optimal layout across different screen sizes
 */
export const MovieGrid = ({ movies }: MovieGridProps) => {
  if (movies.length === 0) {
    return (
      <div className="flex min-h-[400px] items-center justify-center">
        <div className="text-center">
          <p className="text-xl text-muted-foreground">No movies found</p>
          <p className="mt-2 text-sm text-muted-foreground">Try adjusting your search or filters</p>
        </div>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6">
      {movies.map((movie) => (
        <MovieCard key={movie.id} movie={movie} />
      ))}
    </div>
  );
};
