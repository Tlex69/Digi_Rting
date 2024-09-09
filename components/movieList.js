import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image, Dimensions } from 'react-native';
import React, { useContext } from 'react';
import { useNavigation } from '@react-navigation/native';
import { fallbackMoviePoster, image185 } from '../api/moviedb';
import { ThemeContext } from '../screens/ThemeContext'; // Ensure this path is correct

const { width, height } = Dimensions.get('window');

export default function MovieList({ title, data = [], hideSeeAll }) {
    const navigation = useNavigation();
    const { isDarkMode } = useContext(ThemeContext); // Access theme context

    const handleSeeAllPress = () => {
        if (title === 'Upcoming') {
            navigation.navigate('Upcoming'); // Navigate to UpcomingScreen
        } else if (title === 'Top Rated') {
            navigation.navigate('Top Rated'); // Navigate to TopRatedScreen
        }
    };

    return (
        <View style={[styles.container, { backgroundColor: isDarkMode ? '#f9f9f9' : '#212120' }]}>
            <View style={styles.header}>
                <Text style={[styles.title, { color: isDarkMode ? 'black' : 'white' }]}>{title}</Text>
                {
                    !hideSeeAll && (
                        <TouchableOpacity onPress={handleSeeAllPress}>
                            <Text style={[styles.texts, { color: isDarkMode ? '#eab308' : '#eab308' }]}>See All</Text>
                        </TouchableOpacity>
                    )
                }
            </View>
            <ScrollView
                horizontal
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={styles.scrollContainer}
            >
                {data.map((item, index) => (
                    <TouchableOpacity
                        key={index}
                        onPress={() => navigation.push('Movie', { item })}
                        style={styles.movieCard}
                    >
                        <Image
                            source={{ uri: image185(item.poster_path) || fallbackMoviePoster }}
                            style={styles.image}
                        />
                        <Text style={[styles.movieName, { color: isDarkMode ? '#000000' : '#d1d1d1' }]}>
                            {item?.title ? (item.title.length > 14 ? item.title.slice(0, 14) + '...' : item.title) : 'No Title'}
                        </Text>
                    </TouchableOpacity>
                ))}
            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        marginHorizontal: 0,
        marginVertical: 8,
        paddingTop: 10,
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    title: {
        fontSize: 20,
        paddingBottom: 12,
        paddingLeft: 20,

    },
    texts: {
        fontSize: 16,
        paddingRight: 20,
    },
    scrollContainer: {
        paddingHorizontal: 15,
    },
    movieCard: {
        marginRight: 16,
        alignItems: 'center',
    },
    image: {
        width: width * 0.33,
        height: height * 0.22,
        borderRadius: 15,
    },
    movieName: {
        marginTop: 4,
        textAlign: 'center',
    },
});
