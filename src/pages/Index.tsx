import { useState, useEffect } from "react";
import { SearchBar } from "@/components/SearchBar";
import { FilterBar } from "@/components/FilterBar";
import { MovieGrid } from "@/components/MovieGrid";
import { LoadingSkeleton } from "@/components/LoadingSkeleton";
import { ErrorMessage } from "@/components/ErrorMessage";
import {
  fetchPopularMovies,
  searchMovies,
  fetchGenres,
  fetchMoviesByGenre,
  Movie,
  Genre,
} from "@/services/movieService";
import { Film } from "lucide-react";
import { toast } from "sonner";

/**
 * Index Page Component
 * Main application page that displays movie browsing interface
 * Manages state for movies, genres, filters, and loading/error states
 */
const Index = () => {
  // State management using useState hook
  const [movies, setMovies] = useState<Movie[]>([]);
  const [genres, setGenres] = useState<Genre[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedGenre, setSelectedGenre] = useState("all");
  const [selectedRating, setSelectedRating] = useState("all");

  /**
   * Fetches initial data (popular movies and genres)
   * Runs on component mount
   */
  useEffect(() => {
    const initializeData = async () => {
      try {
        setLoading(true);
        setError(null);

        const [moviesData, genresData] = await Promise.all([
          fetchPopularMovies(),
          fetchGenres(),
        ]);

        setMovies(moviesData.results);
        setGenres(genresData);
      } catch (err) {
        const errorMessage = err instanceof Error ? err.message : "An unexpected error occurred";
        setError(errorMessage);
        toast.error(errorMessage);
      } finally {
        setLoading(false);
      }
    };

    initializeData();
  }, []);

  /**
   * Handles search and filter changes
   * Fetches movies based on current search query and filters
   */
  useEffect(() => {
    const fetchFilteredMovies = async () => {
      try {
        setLoading(true);
        setError(null);

        let moviesData;

        // Priority: Search query > Genre filter > Popular movies
        if (searchQuery.trim()) {
          moviesData = await searchMovies(searchQuery);
        } else if (selectedGenre !== "all") {
          moviesData = await fetchMoviesByGenre(parseInt(selectedGenre));
        } else {
          moviesData = await fetchPopularMovies();
        }

        // Apply rating filter client-side
        let filteredMovies = moviesData.results;
        if (selectedRating !== "all") {
          const minRating = parseInt(selectedRating);
          filteredMovies = filteredMovies.filter(
            (movie) => movie.vote_average >= minRating
          );
        }

        setMovies(filteredMovies);
      } catch (err) {
        const errorMessage = err instanceof Error ? err.message : "An unexpected error occurred";
        setError(errorMessage);
        toast.error(errorMessage);
      } finally {
        setLoading(false);
      }
    };

    // Debounce search queries
    const debounceTimer = setTimeout(() => {
      if (searchQuery || selectedGenre !== "all" || selectedRating !== "all") {
        fetchFilteredMovies();
      }
    }, 500);

    return () => clearTimeout(debounceTimer);
  }, [searchQuery, selectedGenre, selectedRating]);

  /**
   * Event handler for search input changes
   */
  const handleSearch = (query: string) => {
    setSearchQuery(query);
  };

  /**
   * Event handler for genre filter changes
   */
  const handleGenreChange = (genreId: string) => {
    setSelectedGenre(genreId);
  };

  /**
   * Event handler for rating filter changes
   */
  const handleRatingChange = (rating: string) => {
    setSelectedRating(rating);
  };

  /**
   * Retry handler for error state
   */
  const handleRetry = () => {
    window.location.reload();
  };

  return (
    <div className="min-h-screen">
      {/* Header */}
      <header className="sticky top-0 z-50 border-b border-border/50 bg-background/80 backdrop-blur-lg">
        <div className="container mx-auto px-4 py-6">
          <div className="mb-6 flex items-center gap-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-accent to-accent/80">
              <Film className="h-7 w-7 text-accent-foreground" />
            </div>
            <div>
              <h1 className="text-3xl font-bold tracking-tight">Streamify</h1>
              <p className="text-sm text-muted-foreground">Discover your next favorite movie</p>
            </div>
          </div>

          <div className="space-y-4">
            <SearchBar onSearch={handleSearch} />
            <FilterBar
              genres={genres}
              selectedGenre={selectedGenre}
              selectedRating={selectedRating}
              onGenreChange={handleGenreChange}
              onRatingChange={handleRatingChange}
            />
          </div>
        </div>
      </header>

      {/* Main content */}
      <main className="container mx-auto px-4 py-8">
        {error ? (
          <ErrorMessage message={error} onRetry={handleRetry} />
        ) : loading ? (
          <LoadingSkeleton />
        ) : (
          <MovieGrid movies={movies} />
        )}
      </main>

      {/* Footer */}
      <footer className="mt-16 border-t border-border/50 py-8">
        <div className="container mx-auto px-4 text-center text-sm text-muted-foreground">
          <p>Powered by The Movie Database (TMDB) API</p>
          <p className="mt-2">Built with React, TypeScript, and Axios</p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
