import React, { useState, useEffect } from 'react';
import { Text, View, StyleSheet, Image, TouchableOpacity, Alert } from 'react-native';
import { Accelerometer } from 'expo-sensors';
import { useNavigation } from '@react-navigation/native';
import { fetchRandomMovie, image500, fallbackMoviePoster } from '../api/moviedb';
import { ArrowLeftIcon } from 'react-native-heroicons/outline';

const MovieRecommendationScreen = () => {
  const [data, setData] = useState({ x: 0, y: 0, z: 0 });
  const [recommendedMovie, setRecommendedMovie] = useState(null);
  const navigation = useNavigation();

  useEffect(() => {
    const subscription = Accelerometer.addListener(accelerometerData => {
      const { x, y, z } = accelerometerData;
      setData({ x, y, z });

      console.log(`Accelerometer data: x: ${x}, y: ${y}, z: ${z}`);

      if (Math.abs(x) > 2.5 || Math.abs(y) > 2.5 || Math.abs(z) > 2.5) {
        setTimeout(async () => {
          try {
            const randomMovie = await fetchRandomMovie();
            console.log('Fetched movie:', randomMovie);
            setRecommendedMovie(randomMovie);
          } catch (error) {
            Alert.alert('Error', 'Failed to fetch movie. Please try again later.');
          }
        }, 500);
      }
    });

    Accelerometer.setUpdateInterval(1000);

    return () => {
      subscription.remove();
    };
  }, []);

  const handlePress = () => {
    if (recommendedMovie) {
      navigation.navigate('Movie', { item: recommendedMovie });
    } else {
      Alert.alert('No Movie', 'No movie available to navigate');
    }
  };

  const handleBack = () => {
    navigation.goBack();
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.backButton} onPress={handleBack}>
        <ArrowLeftIcon size={24} color="#f2a900" />
      </TouchableOpacity>
      <Text style={styles.title}>Shake your phone to get a movie recommendation!</Text>
      
      {recommendedMovie && (
        <TouchableOpacity style={styles.movieItem} onPress={handlePress}>
          <Image
            source={{ uri: image500(recommendedMovie.poster_path) || fallbackMoviePoster }}
            style={styles.image}
            resizeMode="cover"
          />
          <View style={styles.titleContainer}>
            <Text style={styles.movieTitle}>{recommendedMovie.title}</Text>
          </View>
        </TouchableOpacity>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#121212',
    padding: 20,
  },
  title: {
    fontSize: 22,
    fontWeight: '700',
    marginBottom: 40,
    color: '#f2a900',
    textAlign: 'center',
    paddingHorizontal: 10,
  },
  movieItem: {
    marginTop: 20,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#1e1e1e',
    borderRadius: 15,
    padding: 15,
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.25,
    shadowRadius: 12,
    elevation: 6,
    width: '100%',
    maxWidth: 340,
  },
  image: {
    width: 130,
    height: 190,
    borderRadius: 12,
    marginRight: 15,
  },
  titleContainer: {
    flex: 1,
  },
  movieTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#f2a900',
    textAlign: 'left',
  },
  backButton: {
    padding: 10,
    marginBottom: 20,
  },
});

export default MovieRecommendationScreen;
