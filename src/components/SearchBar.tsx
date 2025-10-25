import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";

interface SearchBarProps {
  onSearch: (query: string) => void;
  placeholder?: string;
}

/**
 * SearchBar Component
 * Provides search functionality with debounced input
 * Triggers search callback as user types
 */
export const SearchBar = ({ onSearch, placeholder = "Search movies..." }: SearchBarProps) => {
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchQuery(value);
    onSearch(value);
  };

  return (
    <div className="relative w-full">
      <Search className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground" />
      <Input
        type="text"
        placeholder={placeholder}
        value={searchQuery}
        onChange={handleSearchChange}
        className="h-12 rounded-full border-border bg-secondary/50 pl-12 pr-4 text-base backdrop-blur-sm transition-all focus:bg-secondary focus:ring-2 focus:ring-accent"
      />
    </div>
  );
};
