import axios from 'axios';
import { apiKey } from '../constants';


const apiBaseUrl = 'https://api.themoviedb.org/3';
const trendingMoviesEnpoint =  `${apiBaseUrl}/trending/movie/day?api_key=${apiKey}`
const upcomingMoviesEnpoint =  `${apiBaseUrl}/movie/upcoming?api_key=${apiKey}`
const topRatedMoviesEnpoint =  `${apiBaseUrl}/movie/top_rated?api_key=${apiKey}`
const searchMoviesEndpoint =  `${apiBaseUrl}/search/movie?api_key=${apiKey}`


// dynamic 
const movieDetailsEndpoint = id=> `${apiBaseUrl}/movie/${id}?api_key=${apiKey}`
const movieCreaditsEndpoint = id=> `${apiBaseUrl}/movie/${id}/credits?api_key=${apiKey}`
const similarMoviesEndpoint = id=> `${apiBaseUrl}/movie/${id}/similar?api_key=${apiKey}`



const personDetailsEndpoint = id=> `${apiBaseUrl}/person/${id}?api_key=${apiKey}`
const personMoviesEndpoint = id=> `${apiBaseUrl}/person/${id}/movie_credits?api_key=${apiKey}`



export const image500 = path=> path? `https://image.tmdb.org/t/p/w500${path}` : null;
export const image342 = path=> path? `https://image.tmdb.org/t/p/w342${path}` : null;
export const image185 = path=> path? `https://image.tmdb.org/t/p/w185${path}` : null;

export const fallbackMoviePoster = 'https://cdn.pixabay.com/photo/2016/04/14/07/50/film-1328405_1280.jpg';
export const fallbackPersonImage = 'https://cdn.pixabay.com/photo/2017/06/02/22/01/dog-2367414_1280.png'

async function apiCall(endponit, params) {
    const options = {
        method: 'GET',
        url: endponit,
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
export const fetchTrendingMovies = ()=>{
    return apiCall(trendingMoviesEnpoint)
}
export const fetchUpcomingMovies = ()=>{
    return apiCall(upcomingMoviesEnpoint)
}
export const fetchTopRatedMovies = ()=>{
    return apiCall(topRatedMoviesEnpoint)
}

export const fetchMovieDetails = id=>{
    return apiCall(movieDetailsEndpoint(id));
}
export const fetchMovieCredits = id=>{
    return apiCall(movieCreaditsEndpoint(id));
}
export const fetchSimilarMovies = id=>{
    return apiCall(similarMoviesEndpoint(id));
}
export const fetchPersonDetails = id=>{
    return apiCall(personDetailsEndpoint(id));
}
export const fetchPersonMovies = id=>{
    return apiCall(personMoviesEndpoint(id));
}

export const searchMovies = params=>{
    return apiCall(searchMoviesEndpoint, params);
}