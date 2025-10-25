import axios from 'axios';

const API_KEY = 'e5a4ec8daa7da266ba415f86715bf416';
const BASE_URL = 'https://api.themoviedb.org/3';
const IMAGE_BASE_URL = 'https://image.tmdb.org/t/p/w500';

export interface Movie {
  id: number;
  title: string;
  poster_path: string;
  vote_average: number;
  release_date: string;
  overview: string;
  genre_ids: number[];
}

export interface Genre {
  id: number;
  name: string;
}

export interface MovieResponse {
  results: Movie[];
  total_pages: number;
  total_results: number;
}

/**
 * Fetches popular movies from TMDB API
 * @param page - Page number for pagination
 * @returns Promise with movie data
 */
export const fetchPopularMovies = async (page: number = 1): Promise<MovieResponse> => {
  try {
    const response = await axios.get(`${BASE_URL}/movie/popular`, {
      params: {
        api_key: API_KEY,
        page,
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching popular movies:', error);
    throw new Error('Failed to fetch movies. Please try again later.');
  }
};

/**
 * Searches for movies by title
 * @param query - Search query string
 * @param page - Page number for pagination
 * @returns Promise with search results
 */
export const searchMovies = async (query: string, page: number = 1): Promise<MovieResponse> => {
  try {
    const response = await axios.get(`${BASE_URL}/search/movie`, {
      params: {
        api_key: API_KEY,
        query,
        page,
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error searching movies:', error);
    throw new Error('Failed to search movies. Please try again later.');
  }
};

/**
 * Fetches available movie genres
 * @returns Promise with genre list
 */
export const fetchGenres = async (): Promise<Genre[]> => {
  try {
    const response = await axios.get(`${BASE_URL}/genre/movie/list`, {
      params: {
        api_key: API_KEY,
      },
    });
    return response.data.genres;
  } catch (error) {
    console.error('Error fetching genres:', error);
    throw new Error('Failed to fetch genres. Please try again later.');
  }
};

/**
 * Fetches movies by genre
 * @param genreId - Genre ID to filter by
 * @param page - Page number for pagination
 * @returns Promise with filtered movie data
 */
export const fetchMoviesByGenre = async (genreId: number, page: number = 1): Promise<MovieResponse> => {
  try {
    const response = await axios.get(`${BASE_URL}/discover/movie`, {
      params: {
        api_key: API_KEY,
        with_genres: genreId,
        page,
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching movies by genre:', error);
    throw new Error('Failed to fetch movies by genre. Please try again later.');
  }
};

/**
 * Constructs full image URL from poster path
 * @param posterPath - Poster path from API
 * @returns Full image URL or placeholder
 */
export const getImageUrl = (posterPath: string | null): string => {
  if (!posterPath) {
    return 'https://via.placeholder.com/500x750/1a1a2e/e94560?text=No+Image';
  }
  return `${IMAGE_BASE_URL}${posterPath}`;
};

/**
 * Formats vote average to one decimal place
 * @param voteAverage - Raw vote average
 * @returns Formatted rating string
 */
export const formatRating = (voteAverage: number): string => {
  return voteAverage.toFixed(1);
};
