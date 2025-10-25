import { Movie, getImageUrl, formatRating } from "@/services/movieService";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Star, Calendar } from "lucide-react";

interface MovieCardProps {
  movie: Movie;
}

/**
 * MovieCard Component
 * Displays individual movie information in a card format
 * Shows poster, title, rating, and release date
 */
export const MovieCard = ({ movie }: MovieCardProps) => {
  const imageUrl = getImageUrl(movie.poster_path);
  const rating = formatRating(movie.vote_average);
  const year = movie.release_date ? new Date(movie.release_date).getFullYear() : 'N/A';

  return (
    <Card className="group relative overflow-hidden rounded-xl border-0 bg-card transition-all duration-300 hover:scale-105 hover:shadow-[var(--shadow-hover)]">
      <div className="relative aspect-[2/3] overflow-hidden">
        <img
          src={imageUrl}
          alt={movie.title}
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
          loading="lazy"
        />
        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/50 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
        
        {/* Rating badge */}
        <div className="absolute right-3 top-3">
          <Badge className="flex items-center gap-1 bg-accent/90 text-accent-foreground backdrop-blur-sm">
            <Star className="h-3 w-3 fill-current" />
            {rating}
          </Badge>
        </div>

        {/* Movie info on hover */}
        <div className="absolute bottom-0 left-0 right-0 translate-y-full p-4 transition-transform duration-300 group-hover:translate-y-0">
          <h3 className="mb-2 font-semibold text-foreground line-clamp-2">{movie.title}</h3>
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Calendar className="h-3.5 w-3.5" />
            <span>{year}</span>
          </div>
          {movie.overview && (
            <p className="mt-2 text-xs text-muted-foreground line-clamp-3">{movie.overview}</p>
          )}
        </div>
      </div>
    </Card>
  );
};
