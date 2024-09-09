import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { useEffect, useState, useContext } from 'react';
import { View, Text, StyleSheet, FlatList, Image, TouchableOpacity, ActivityIndicator } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { TrashIcon } from 'react-native-heroicons/solid'; 
import { image342 } from '../api/moviedb';
import { ThemeContext } from './ThemeContext';

// Fallback image URL
const fallbackPersonImage = 'https://example.com/path/to/fallback/image.jpg'; 

const PersonItem = React.memo(({ item, onRemove, isDarkMode }) => (
  <View style={[styles.personItem, { backgroundColor: isDarkMode ? '#dbdbdb' : '#333' }]}>
    <View style={styles.personContent}>
      <Image
        style={[styles.personImage, { backgroundColor: isDarkMode ? '#dbdbdb' : '#333' }]}
        source={{ uri: image342(item.profile_path) || fallbackPersonImage }}
        defaultSource={{ uri: fallbackPersonImage }} // Fallback for iOS
      />
      <View style={styles.titleContainer}>
        <Text style={[styles.personName, { color: isDarkMode ? '#333' : '#fff' }]} numberOfLines={1}>
          {item.name}
        </Text>
      </View>
    </View>
    <TouchableOpacity onPress={() => onRemove(item.id)} style={styles.removeButton} accessibilityLabel={`Remove ${item.name}`} accessibilityHint="Removes this person from favorites">
      <TrashIcon size="24" color="#eab308" />
    </TouchableOpacity>
  </View>
));

export default function PersonFavScreen() {
  const [favoritePersons, setFavoritePersons] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigation = useNavigation();
  const { isDarkMode } = useContext(ThemeContext);

  useEffect(() => {
    const loadFavoritePersons = async () => {
      try {
        const favorites = await AsyncStorage.getItem('PersonFav');
        if (favorites) {
          setFavoritePersons(JSON.parse(favorites));
        }
      } catch (error) {
        console.error('Error loading favorite persons:', error);
      } finally {
        setLoading(false);
      }
    };

    loadFavoritePersons();
  }, []);

  const removeFromFavorites = async (personId) => {
    try {
      const favorites = await AsyncStorage.getItem('PersonFav');
      if (favorites) {
        let favoritesList = JSON.parse(favorites);
        favoritesList = favoritesList.filter(person => person.id !== personId);
        await AsyncStorage.setItem('PersonFav', JSON.stringify(favoritesList));
        setFavoritePersons(favoritesList);
      }
    } catch (error) {
      console.error('Error removing person from favorites:', error);
    }
  };

  if (loading) {
    return (
      <View style={[styles.container, { backgroundColor: isDarkMode ? '#f5f5f5' : '#1f1f1f' }]}>
        <ActivityIndicator size="large" color="#eab308" />
      </View>
    );
  }

  if (favoritePersons.length === 0) {
    return (
      <View style={[styles.container, { backgroundColor: isDarkMode ? '#f5f5f5' : '#1f1f1f' }]}>
        <Text style={styles.emptyText}>No favorite persons found.</Text>
      </View>
    );
  }

  return (
    <View style={[styles.container, { backgroundColor: isDarkMode ? '#f5f5f5' : '#1f1f1f' }]}>
      <FlatList
        data={favoritePersons}
        renderItem={({ item }) => (
          <PersonItem
            item={item}
            onRemove={removeFromFavorites}
            isDarkMode={isDarkMode}
          />
        )}
        keyExtractor={(item) => item.id.toString()}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  personItem: {
    marginBottom: 10,
    padding: 1,
    borderRadius: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  personContent: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  personImage: {
    width: 90,
    height: 105,
    borderRadius: 8,
    marginRight: 15,
  },
  titleContainer: {
    flex: 1,
  },
  personName: {
    fontSize: 14,
  },
  removeButton: {
    padding: 8,
  },
  emptyText: {
    textAlign: 'center',
    marginTop: 20,
    color: '#fff',
  },
});
