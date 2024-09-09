import { View, ScrollView, TouchableOpacity, StyleSheet, Dimensions, Image, Text, TextInput, KeyboardAvoidingView, Platform } from 'react-native';
import React, { useEffect, useState, useContext } from 'react';
import { useRoute, useNavigation } from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ChevronLeftIcon } from 'react-native-heroicons/outline';
import { HeartIcon, PaperAirplaneIcon } from 'react-native-heroicons/solid';
import { LinearGradient } from 'expo-linear-gradient';
import Cast from '../components/cast';
import MovieList from '../components/movieList';
import Loading from '../components/loading';
import { fallbackMoviePoster, fetchMovieCredits, fetchMovieDetails, fetchSimilarMovies, image500 } from '../api/moviedb';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { ThemeContext } from './ThemeContext'; // Adjust the path as needed

const { width, height } = Dimensions.get('window');

export default function MovieScreen() {
  const { params: item } = useRoute();
  const [isFavourite, setIsFavourite] = useState(false);
  const navigation = useNavigation();
  const [cast, setCast] = useState([]);
  const [similarMovies, setSimilarMovies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [movie, setMovie] = useState({});
  const [comment, setComment] = useState('');
  const [comments, setComments] = useState([]);
  const [showAllComments, setShowAllComments] = useState(false);
  const { isDarkMode } = useContext(ThemeContext);

  useEffect(() => {
    const movieId = item?.item?.id;
    if (!movieId) {
      console.log('No movie ID available');
      setLoading(false);
      return;
    }
    setLoading(true);
    getMovieDetails(movieId);
    getMovieCredits(movieId);
    getSimilarMovies(movieId);
    checkIfFavourite(movieId);
  }, [item]);

  const getMovieDetails = async (id) => {
    const data = await fetchMovieDetails(id);
    if (data) setMovie(data);
    setLoading(false);
  };

  const getMovieCredits = async (id) => {
    const data = await fetchMovieCredits(id);
    if (data && data.cast) setCast(data.cast);
  };

  const getSimilarMovies = async (id) => {
    const data = await fetchSimilarMovies(id);
    if (data && data.results) setSimilarMovies(data.results);
  };

  const checkIfFavourite = async (id) => {
    try {
      const existingFavourites = await AsyncStorage.getItem('MovieFav');
      let favourites = existingFavourites ? JSON.parse(existingFavourites) : [];
      const isAlreadyFavourite = favourites.some((fav) => fav.id === id);
      setIsFavourite(isAlreadyFavourite);
    } catch (error) {
      console.error('Error checking if movie is favourite:', error);
    }
  };

  const handleCommentSubmit = () => {
    if (comment.trim()) {
      const newComment = { username: 'User : ', text: comment };
      setComments([...comments, newComment]);
      setComment('');
    }
  };

  const toggleComments = () => {
    setShowAllComments(!showAllComments);
  };

  const saveFavouriteMovie = async (movie) => {
    try {
      const existingFavourites = await AsyncStorage.getItem('MovieFav');
      let favourites = existingFavourites ? JSON.parse(existingFavourites) : [];
      const isAlreadyFavourite = favourites.some((fav) => fav.id === movie.id);
      if (!isAlreadyFavourite) {
        favourites.push(movie);
        await AsyncStorage.setItem('MovieFav', JSON.stringify(favourites));
        setIsFavourite(true);
        console.log('Movie saved as favourite!');
      } else {
        favourites = favourites.filter((fav) => fav.id !== movie.id);
        await AsyncStorage.setItem('MovieFav', JSON.stringify(favourites));
        setIsFavourite(false);
        console.log('Movie removed from favourites.');
      }
    } catch (error) {
      console.error('Error saving favourite movie:', error);
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={{ flex: 1 }}
    >
      <ScrollView
        contentContainerStyle={{ paddingBottom: 20 }}
        style={[styles.container, { backgroundColor: isDarkMode ? '#f5f5f5' : '#1f1f1f' }]}
      >
        <View style={[styles.posterContainer, { backgroundColor: isDarkMode ? '#f5f5f5' : '#1f1f1f' }]}>
          <SafeAreaView style={styles.safeArea}>
            <TouchableOpacity
              style={styles.backButton}
              onPress={() => navigation.goBack()}
            >
              <ChevronLeftIcon size="28" strokeWidth={2.5} color={isDarkMode ? 'white' : 'black'} />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => saveFavouriteMovie(movie)}>
              <HeartIcon size="35" color={isFavourite ? '#eab308' : (isDarkMode ? 'black' : 'white')} />
            </TouchableOpacity>
          </SafeAreaView>
          {loading ? (
            <Loading />
          ) : (
            <View style={[styles.imageContainer, { backgroundColor: isDarkMode ? '#f5f5f5' : '#1f1f1f' }]}>
              <Image
                source={{ uri: image500(movie?.poster_path) || fallbackMoviePoster }}
                style={[styles.image, { backgroundColor: isDarkMode ? '#f5f5f5' : '#1f1f1f' }]}
                resizeMode="cover"
              />
              <LinearGradient
                colors={isDarkMode ? ['transparent', '#f5f5f5', '#f5f5f5'] : ['transparent', '#1f1f1f', '#1f1f1f']}
                style={styles.linearGradient}
                start={{ x: 0.5, y: 0 }}
                end={{ x: 0.5, y: 1 }}
              />

            </View>
          )}
        </View>

        <View style={[styles.movieDetailsContainer, { backgroundColor: isDarkMode ? '#f5f5f5' : '#1f1f1f' }]}>
          <Text style={[styles.movieTitle, { color: isDarkMode ? '#000' : '#f5f5f5' }]}>{movie?.title}</Text>
          {movie?.id && (
            <Text style={[styles.movieInfo, { color: isDarkMode ? '#000' : '#f5f5f5' }]}>
              {movie?.status} · {movie?.release_date?.split('-')[0]} · {movie?.runtime} min
            </Text>
          )}
          <View style={[styles.genresContainer, { backgroundColor: isDarkMode ? '#f5f5f5' : '#1f1f1f' }]}>
            {movie?.genres?.map((genre, index) => {
              let showDot = index + 1 !== movie.genres.length;
              return (
                <Text key={index} style={[styles.genresText, { color: isDarkMode ? '#000' : '#f5f5f5' }]}>
                  {genre?.name} {showDot ? '·' : null}
                </Text>
              );
            })}
          </View>
          <Text style={[styles.description, { color: isDarkMode ? '#333' : '#cccccc' }]}>{movie?.overview}</Text>
        </View>
        <Cast navigation={navigation} cast={cast} />
        <MovieList title="Similar Movies" hideSeeAll={true} data={similarMovies} />

        <View style={styles.commentsSection}>
          <Text style={[styles.commentsTitle, { color: isDarkMode ? '#000' : '#f5f5f5' }]}>Comments:</Text>
          <View style={styles.commentInputContainer}>
            <TextInput
              placeholder="Add a comment"
              placeholderTextColor={isDarkMode ? '#333' : '#cccccc'}
              value={comment}
              onChangeText={setComment}
              onSubmitEditing={handleCommentSubmit}
              style={[styles.commentInput, { backgroundColor: isDarkMode ? '#fff' : '#333', color: isDarkMode ? '#000' : '#f5f5f5' }]}
            />
            <TouchableOpacity onPress={handleCommentSubmit} style={styles.submitButton}>
              <PaperAirplaneIcon size="25" color={isDarkMode ? '#000' : '#f5f5f5'} />
            </TouchableOpacity>
          </View>
          <ScrollView style={styles.commentsList}>
            {(showAllComments ? comments : comments.slice(-3)).map((comment, index) => (
              <View key={index} style={styles.commentItem}>
                <Text style={[styles.commentText, { color: isDarkMode ? '#000' : '#f5f5f5' }]}>
                  {comment.username}
                  <Text style={[styles.commentText, { color: isDarkMode ? '#333' : '#cccccc' }]}>{comment.text}</Text>
                </Text>
              </View>
            ))}
          </ScrollView>
          <TouchableOpacity onPress={toggleComments} style={styles.showMoreButton}>
            <Text style={[styles.showMoreText, { color: isDarkMode ? '#eab308' : '#eab308' }]}>
              {showAllComments ? 'Show Less' : 'Show More'}
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1f1f1f',
  },
  posterContainer: {
    width: '100%',
    position: 'relative',
  },
  safeArea: {
    zIndex: 20,
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    position: 'absolute',
    top: 0,
  },
  backButton: {
    backgroundColor: '#eab308',
    borderRadius: 15,
    padding: 9,
  },
  imageContainer: {
    width: '100%',
    height: height * 0.65,
    position: 'relative',
  },
  image: {
    width: '100%',
    height: '100%',
  },
  linearGradient: {
    position: 'absolute',
    width: '100%',
    height: '40%',
    bottom: 0,
  },
  movieDetailsContainer: {
    marginTop: -(height * 0.09),
    paddingHorizontal: 10,
    alignItems: 'center',
  },
  movieTitle: {
    color: 'white',
    fontSize: 30,
    fontWeight: 'bold',
    textAlign: 'center',
    letterSpacing: 0.9,
    marginBottom: 5,
  },
  movieInfo: {
    color: 'white',
    fontSize: 15,
    textAlign: 'center',
  },
  genresContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    flexWrap: 'wrap',
    marginVertical: 10,
  },
  genresText: {
    color: 'white',
    fontSize: 14,
    marginHorizontal: 3,
  },
  description: {
    color: '#cccccc',
    fontSize: 16,
    textAlign: 'center',
    marginHorizontal: 10,
  },
  commentsContainer: {
    marginTop: 20,
    paddingHorizontal: 16,
  },
  commentsTitle: {
    color: 'white',
    fontSize: 22,
    fontWeight: 'bold',
    paddingLeft: 10,
    paddingTop: 10,
  },
  commentInputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 10,
  },
  commentInput: {
    flex: 1,
    backgroundColor: '#333',
    color: 'white',
    borderRadius: 20,
    padding: 10,
    marginRight: 10,
  },
  commentButton: {
    backgroundColor: '#eab308',
    borderRadius: 15,
    padding: 8,
  },
  commentsList: {
    marginTop: 10,
  },
  commentItem: {
    marginBottom: 10,
    paddingVertical: 10,
  },
  usernameText: {
    color: '#eab308',
    fontWeight: 'bold',
    marginBottom: 5,
  },
  commentText: {
    color: 'white',
  },
  viewAllButton: {
    marginVertical: 10,
    alignItems: 'center',
  },
  viewAllText: {
    color: '#eab308',
    fontWeight: 'bold',
  },
  showMoreText: {
    paddingLeft: 10,


  }
});
