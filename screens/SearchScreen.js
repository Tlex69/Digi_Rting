import { View, Text, Dimensions, TextInput, TouchableOpacity, StyleSheet, ScrollView, TouchableOpacity as TouchableOpacityAlt, Image } from 'react-native';
import React, { useCallback, useState, useContext  } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { XMarkIcon } from 'react-native-heroicons/outline';
import { useNavigation } from '@react-navigation/native';
import Loading from '../components/loading';
import { fallbackMoviePoster, image185, searchMovies } from '../api/moviedb';
import { debounce } from 'lodash';
import { ThemeContext } from './ThemeContext';

const { width, height } = Dimensions.get('window');

export default function SearchScreen() {
  const navigation = useNavigation();
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const { isDarkMode } = useContext(ThemeContext);

  let movieName = 'Spider Man Far From Home';

  const handleSearch = value => {
    if (value && value.length > 2) {
      setLoading(true);
      searchMovies({
        query: value,
        include_adult: 'false',
        language: 'en-US',
        page: '1'
      }).then(data => {
        setLoading(false);
        //console.log('got movies: ',data);
        if (data && data.results) setResults(data.results);
      })
    } else {
      setLoading(false);
      setResults([])
    }
  }

  const handleTextDebounce = useCallback(debounce(handleSearch, 400), []);
  return (
    <SafeAreaView style={[styles.container, { backgroundColor: isDarkMode ? '#f5f5f5' : '#1f1f1f' }]}>
    <View style={styles.searchContainer}>
      <TextInput
        onChangeText={handleTextDebounce}
        placeholder='Search Movie'
        placeholderTextColor='lightgray'
        style={[styles.textInput, { color: isDarkMode ? 'black' : '#eab308' }]}
      />
      <TouchableOpacity
        onPress={() => navigation.navigate('Home')}
        style={styles.closeButton}
      >
        <XMarkIcon size={25} color='white' />
      </TouchableOpacity>
    </View>
  
    {/* Results */}
    {
      loading ? (
        <Loading />
      ) : results.length > 0 ? (
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.resultsContainer}
        >
          <Text style={styles.resultsText}>Results ({results.length})</Text>
          <View style={styles.imageContainer}>
            {
              results.map((item, index) => (
                <TouchableOpacity
                  key={index}
                  onPress={() => navigation.push("Movie", { item })}
                  style={styles.itemContainer}
                >
                  <Image
                    source={{ uri: image185(item?.poster_path) || fallbackMoviePoster }}
                    style={styles.image}
                  />
                  <Text style={[styles.movieName, { color: isDarkMode ? 'black' : 'white' }]}>
                    {
                      item?.title && item?.title.length > 20
                        ? item.title.slice(0, 20) + '...'
                        : item?.title || '' // แสดงค่าว่างหาก item.title เป็น undefined
                    }
                  </Text>
                </TouchableOpacity>
              ))
            }
          </View>
        </ScrollView>
      ) : (
        <View style={styles.noResultsContainer}>
          <Image
            source={require('../assets/img/movietime.png')}
            style={styles.noResultsImage}
          />
          <Text style={[styles.watch, { color: isDarkMode ? 'black' : '#eab308' }]}>What movie should I watch?</Text>
        </View>
      )
    }
  </SafeAreaView>
  
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#1f1f1f',
    flex: 1,
  },
  searchContainer: {
    marginHorizontal: 16,
    marginBottom: 12,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderColor: '#4b4b4b',
    borderWidth: 1,
    borderRadius: 50,
  },
  textInput: {
    paddingBottom: 4,
    paddingLeft: 24,
    flex: 1,
    fontSize: 16,
    fontWeight: '600',
    color: 'white',
    letterSpacing: 1,
  },
  closeButton: {
    borderRadius: 50,
    padding: 12,
    margin: 4,
    backgroundColor: '#4b4b4b',
  },
  resultsContainer: {
    paddingHorizontal: 15,
  },
  resultsText: {
    color: 'white',
    fontWeight: '600',
    marginVertical: 10,
  },
  imageContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  itemContainer: {
    marginBottom: 15,
  },
  image: {
    borderRadius: 15,
    width: width * 0.44,
    height: height * 0.3,
  },
  movieName: {
    fontSize: 13,
    color: 'lightgray',
    marginTop: 5,
  },
  noResultsContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  watch: {
    fontSize: 15,
    fontWeight: '400',
    color: '#eab308',
  },
  noResultsImage: {
    width: 200,
    height: 200,
  },
});
