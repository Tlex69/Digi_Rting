import axios from 'axios';
import { apiKey } from '../constants';

const apiBaseUrl = 'https://api.themoviedb.org/3';

const trendingMoviesEndpoint = `${apiBaseUrl}/trending/movie/day?api_key=${apiKey}`;
const upcomingMoviesEndpoint = `${apiBaseUrl}/movie/upcoming?api_key=${apiKey}`;
const topRatedMoviesEndpoint = `${apiBaseUrl}/movie/top_rated?api_key=${apiKey}`;
const searchMoviesEndpoint = `${apiBaseUrl}/search/movie?api_key=${apiKey}`;

// Dynamic endpoints
const movieDetailsEndpoint = id => `${apiBaseUrl}/movie/${id}?api_key=${apiKey}`;
const movieCreditsEndpoint = id => `${apiBaseUrl}/movie/${id}/credits?api_key=${apiKey}`;
const similarMoviesEndpoint = id => `${apiBaseUrl}/movie/${id}/similar?api_key=${apiKey}`;

const personDetailsEndpoint = id => `${apiBaseUrl}/person/${id}?api_key=${apiKey}`;
const personMoviesEndpoint = id => `${apiBaseUrl}/person/${id}/movie_credits?api_key=${apiKey}`;

// Image URLs
export const image500 = path => path ? `https://image.tmdb.org/t/p/w500${path}` : null;
export const image342 = path => path ? `https://image.tmdb.org/t/p/w342${path}` : null;
export const image185 = path => path ? `https://image.tmdb.org/t/p/w185${path}` : null;

export const fallbackMoviePoster = 'https://cdn.pixabay.com/photo/2016/04/14/07/50/film-1328405_1280.jpg';
export const fallbackPersonImage = 'https://cdn.pixabay.com/photo/2017/06/02/22/01/dog-2367414_1280.png';

async function apiCall(endpoint, params) {
    const options = {
        method: 'GET',
        url: endpoint,
        params: params ? params : {}
    };

    try {
        const response = await axios.request(options);
        return response.data;
    } catch (error) {
        console.log('error: ', error);
        return {};
    }
}

export const fetchTrendingMovies = () => {
    return apiCall(trendingMoviesEndpoint);
};

export const fetchUpcomingMovies = () => {
    return apiCall(upcomingMoviesEndpoint);
};

export const fetchTopRatedMovies = () => {
    return apiCall(topRatedMoviesEndpoint);
};

export const fetchMovieDetails = id => {
    return apiCall(movieDetailsEndpoint(id));
};

export const fetchMovieCredits = id => {
    return apiCall(movieCreditsEndpoint(id));
};

export const fetchSimilarMovies = id => {
    return apiCall(similarMoviesEndpoint(id));
};

export const fetchPersonDetails = id => {
    return apiCall(personDetailsEndpoint(id));
};

export const fetchPersonMovies = id => {
    return apiCall(personMoviesEndpoint(id));
};

export const searchMovies = params => {
    return apiCall(searchMoviesEndpoint, params);
};

// Function to fetch a random movie
const randomMoviesEndpoint = `${apiBaseUrl}/movie/popular?api_key=${apiKey}`;

export const fetchRandomMovie = async () => {
    try {
        const response = await axios.get(randomMoviesEndpoint);
        const movies = response.data.results;

        if (movies.length === 0) {
            throw new Error('No movies found');
        }

        // Choose a random movie from the results
        const randomMovie = movies[Math.floor(Math.random() * movies.length)];
        return randomMovie; // Assuming data contains properties like poster_path and title
    } catch (error) {
        console.error('Error fetching movie:', error);
        throw error;
    }
};
