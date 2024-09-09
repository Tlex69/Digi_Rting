import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { useEffect, useState, useContext } from 'react';
import { View, Text, StyleSheet, FlatList, Image, TouchableOpacity, ActivityIndicator } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { image500, fallbackMoviePoster } from '../api/moviedb';
import { TrashIcon } from 'react-native-heroicons/solid';
import { ThemeContext } from './ThemeContext';

const MovieItem = React.memo(({ item,  onRemove, isDarkMode }) => (
    <View style={[styles.movieItem, { backgroundColor: isDarkMode ? '#dbdbdb' : '#333' }]}>
        <View style={[styles.movieContent, { backgroundColor: isDarkMode ? '#dbdbdb' : '#333' }]}>
            <Image
                source={{ uri: image500(item.poster_path) || fallbackMoviePoster }}
                style={styles.image}
                resizeMode="cover"
            />
            <View style={styles.titleContainer}>
                <Text 
                    style={[
                        styles.movieTitle, 
                        { color: isDarkMode ? '#333' : '#f5f5f5' }  // Dynamically change text color
                    ]} 
                    numberOfLines={1}
                >
                    {item.title}
                </Text>
            </View>
        </View>
        <TouchableOpacity 
            onPress={() => onRemove(item.id)} 
            style={styles.removeButton} 
            accessibilityLabel={`Remove ${item.title}`} 
            accessibilityHint="Removes this movie from favorites"
        >
            <TrashIcon size="24" color="#eab308" />
        </TouchableOpacity>
    </View>
));

export default function MoviesFavScreen() {
    const [favouriteMovies, setFavouriteMovies] = useState([]);
    const [loading, setLoading] = useState(true);
    const navigation = useNavigation();
    const { isDarkMode } = useContext(ThemeContext);

    useEffect(() => {
        const loadFavouriteMovies = async () => {
            try {
                const favourites = await AsyncStorage.getItem('MovieFav');
                if (favourites) {
                    setFavouriteMovies(JSON.parse(favourites));
                }
            } catch (error) {
                console.error('Error loading favourite movies:', error);
            } finally {
                setLoading(false);
            }
        };

        loadFavouriteMovies();
    }, []);

    const handlePress = (movie) => {
        navigation.navigate('Movie', { item: { item: movie } });
    };

    const removeFromFavourites = async (movieId) => {
        try {
            const favourites = await AsyncStorage.getItem('MovieFav');
            if (favourites) {
                let favouritesList = JSON.parse(favourites);
                favouritesList = favouritesList.filter(movie => movie.id !== movieId);
                await AsyncStorage.setItem('MovieFav', JSON.stringify(favouritesList));
                setFavouriteMovies(favouritesList);
            }
        } catch (error) {
            console.error('Error removing movie from favourites:', error);
        }
    };

    if (loading) {
        return (
            <View style={[styles.container, { backgroundColor: isDarkMode ? '#f5f5f5' : '#1f1f1f' }]}>
                <ActivityIndicator size="large" color="#eab308" />
            </View>
        );
    }

    return (
        <View style={[styles.container, { backgroundColor: isDarkMode ? '#f5f5f5' : '#1f1f1f' }]}>
            {favouriteMovies.length === 0 ? (
                <Text style={[styles.emptyText, { color: isDarkMode ? 'black' : 'white' }]}>No favorite movies found.</Text>
            ) : (
                <FlatList
                    data={favouriteMovies}
                    renderItem={({ item }) => (
                        <MovieItem
                            item={item}
                            onPress={handlePress}
                            onRemove={removeFromFavourites}
                            isDarkMode={isDarkMode}  // Pass isDarkMode to MovieItem
                        />
                    )}
                    keyExtractor={(item) => item.id.toString()}
                />
            )}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
    },
    movieItem: {
        marginBottom: 10,
        padding: 1,
        backgroundColor: '#333',
        borderRadius: 10,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    movieContent: {
        flexDirection: 'row',
        alignItems: 'center',
        flex: 1,
        pointerEvents: 'none',
    },
    image: {
        width: 95,
        height: 105,
        borderRadius: 8,
        marginRight: 15,
    },
    titleContainer: {
        flex: 1,
    },
    movieTitle: {
        fontSize: 14,
    },
    removeButton: {
        padding: 8,
    },
    emptyText: {
        color: '#fff',
        textAlign: 'center',
        marginTop: 20,
    },
});
