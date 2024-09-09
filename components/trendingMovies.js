import React, { useContext } from 'react';
import { View, Text, StyleSheet, Dimensions, Image, FlatList, TouchableWithoutFeedback } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { image500 } from '../api/moviedb';
import { ThemeContext } from '../screens/ThemeContext'; // Import ThemeContext

const { width, height } = Dimensions.get('window');

export default function TrendingMovies({ data }) {
    const navigation = useNavigation();
    const { isDarkMode } = useContext(ThemeContext); // Access theme context

    const handleClick = (item) => {
        navigation.navigate('Movie', { item });
    };

    const renderItem = ({ item }) => (
        <MovieCard item={item} handleClick={() => handleClick(item)} isDarkMode={isDarkMode} />
    );

    return (
        <View style={[styles.container, { backgroundColor: isDarkMode ? '#ffffff' : '#1c1c1e' }]}>
            <Text style={[styles.text, { color: isDarkMode ? '#000000' : '#ffffff' }]}>Trending</Text>
            <FlatList
                data={data}
                renderItem={renderItem}
                keyExtractor={(item, index) => index.toString()}
                horizontal
                showsHorizontalScrollIndicator={false}
                snapToInterval={width * 0.62}  // Snap to item width
                decelerationRate="fast"
                snapToAlignment="center"
            />
        </View>
    );
}

const MovieCard = ({ item, handleClick, isDarkMode }) => {
    return (
        <TouchableWithoutFeedback onPress={() => handleClick(item)}>
            <View style={[styles.cardContainer, { backgroundColor: isDarkMode ? '#333' : '#f5f5f5' }]}>
                <Image
                    source={{ uri: image500(item.poster_path) }}
                    style={styles.image}
                    resizeMode="cover"
                />
            </View>
        </TouchableWithoutFeedback>
    );
}

const styles = StyleSheet.create({
    container: {
        marginBottom: 7,
        padding: 10,
    },
    text: {
        fontSize: 20,
        marginBottom: 10,
    },
    cardContainer: {
        marginHorizontal: 8,  // Space between images
        borderRadius: 10,     // Rounded corners
        overflow: 'hidden',   // Clip image to rounded corners
    },
    image: {
        width: width * 0.5,
        height: height * 0.33,
        borderRadius: 10,     // Rounded corners
    },
});
