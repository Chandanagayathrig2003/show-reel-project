import { Genre } from "@/services/movieService";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Filter } from "lucide-react";

interface FilterBarProps {
  genres: Genre[];
  selectedGenre: string;
  selectedRating: string;
  onGenreChange: (genreId: string) => void;
  onRatingChange: (rating: string) => void;
}

const ratingOptions = [
  { value: "all", label: "All Ratings" },
  { value: "9", label: "9+ Stars" },
  { value: "8", label: "8+ Stars" },
  { value: "7", label: "7+ Stars" },
  { value: "6", label: "6+ Stars" },
];

/**
 * FilterBar Component
 * Provides filtering options for movies by genre and rating
 * Uses Select components for dropdown filters
 */
export const FilterBar = ({
  genres,
  selectedGenre,
  selectedRating,
  onGenreChange,
  onRatingChange,
}: FilterBarProps) => {
  return (
    <div className="flex flex-wrap items-end gap-4">
      <div className="flex items-center gap-2 text-muted-foreground">
        <Filter className="h-5 w-5" />
        <span className="text-sm font-medium">Filters:</span>
      </div>

      <div className="flex-1 min-w-[200px]">
        <Label htmlFor="genre-select" className="mb-2 block text-sm text-muted-foreground">
          Genre
        </Label>
        <Select value={selectedGenre} onValueChange={onGenreChange}>
          <SelectTrigger 
            id="genre-select"
            className="h-10 rounded-lg border-border bg-secondary/50 backdrop-blur-sm transition-all hover:bg-secondary"
          >
            <SelectValue placeholder="All Genres" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Genres</SelectItem>
            {genres.map((genre) => (
              <SelectItem key={genre.id} value={genre.id.toString()}>
                {genre.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="flex-1 min-w-[200px]">
        <Label htmlFor="rating-select" className="mb-2 block text-sm text-muted-foreground">
          Minimum Rating
        </Label>
        <Select value={selectedRating} onValueChange={onRatingChange}>
          <SelectTrigger 
            id="rating-select"
            className="h-10 rounded-lg border-border bg-secondary/50 backdrop-blur-sm transition-all hover:bg-secondary"
          >
            <SelectValue placeholder="All Ratings" />
          </SelectTrigger>
          <SelectContent>
            {ratingOptions.map((option) => (
              <SelectItem key={option.value} value={option.value}>
                {option.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
    </div>
  );
};
