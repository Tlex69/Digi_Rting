import React, { useEffect, useState, useContext } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, FlatList, Image, Dimensions } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { fetchTopRatedMovies } from '../api/moviedb';
import { image185, fallbackMoviePoster } from '../api/moviedb';
import { ThemeContext } from './ThemeContext'; 

const { width, height } = Dimensions.get('window');
const numColumns = 2;

const TopratedScreen = () => {
    const [toprated, setToprated] = useState([]);
    const [loading, setLoading] = useState(true);
    const navigation = useNavigation();
    const { isDarkMode } = useContext(ThemeContext); // Access theme context

    useEffect(() => {
        const getTopRatedMovies = async () => {
            const data = await fetchTopRatedMovies();
            if (data && data.results) setToprated(data.results);
            setLoading(false);
        };

        getTopRatedMovies();
    }, []);

    const handlePress = (item) => {
        // Navigate to the movie detail screen, pass the item data
        navigation.navigate('Movie', { item });
    };

    const renderItem = ({ item }) => (
        <TouchableOpacity style={styles.itemContainer} onPress={() => handlePress(item)}>
            <Image
                source={{ uri: image185(item.poster_path) || fallbackMoviePoster }}
                style={styles.image}
                resizeMode='cover'
            />
            <Text style={[styles.itemTitle, { color: isDarkMode ? '#000000' : '#d1d1d1' }]}>
                {item.title ? (item.title.length > 14 ? item.title.slice(0, 14) + '...' : item.title) : 'No Title'}
            </Text>
        </TouchableOpacity>
    );

    return (
        <View style={[styles.container, { backgroundColor: isDarkMode ? '#ffffff' : '#1c1c1e' }]}>
            {loading ? (
                <Text style={[styles.loadingText, { color: isDarkMode ? '#000000' : '#d1d1d1' }]}>Loading...</Text>
            ) : (
                <FlatList
                    data={toprated}
                    renderItem={renderItem}
                    keyExtractor={item => item.id.toString()}
                    numColumns={numColumns}
                    columnWrapperStyle={styles.row}
                />
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 1,
    },
    itemContainer: {
        flex: 1,
        margin: 5,
        borderRadius: 10,
        overflow: 'hidden',
        alignItems: 'center',
    },
    image: {
        width: width * 0.45,
        height: height * 0.25,
        borderRadius: 15,
    },
    itemTitle: {
        fontSize: 14,
        margin: 8,
    },
    loadingText: {
        fontSize: 18,
        textAlign: 'center',
    },
    row: {
        justifyContent: 'space-between',
    },
});

export default TopratedScreen;
