import { View, Dimensions, ScrollView, TouchableOpacity, StyleSheet, Image, Text } from 'react-native';
import React, { useEffect, useState,useContext } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ChevronLeftIcon } from 'react-native-heroicons/outline';
import { HeartIcon } from 'react-native-heroicons/solid';
import { useNavigation, useRoute } from '@react-navigation/native';
import MovieList from '../components/movieList';
import Loading from '../components/loading';
import { fallbackPersonImage, fetchPersonDetails, fetchPersonMovies, image342 } from '../api/moviedb';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { ThemeContext } from './ThemeContext'; // ปรับเส้นทางให้ถูกต้อง

var { width, height } = Dimensions.get('window');

export default function PersonScreen() {
    const { params: item } = useRoute();
    const navigation = useNavigation();
    const [isFavourite, setIsFavourite] = useState(false);
    const [personMovies, setPersonMovies] = useState([]);
    const [person, setPerson] = useState([]);
    const [loading, setLoading] = useState(false);
    const { isDarkMode } = useContext(ThemeContext);

    useEffect(() => {
        if (item && item.id) {
            setLoading(true);
            getPersonDetails(item.id);
            getPersonMovies(item.id);
            checkIfFavourite(item.id);
        } else {
            console.log('No valid item or ID');
        }
    }, [item]);

    const getPersonDetails = async id => {
        if (!id) {
            console.error('No valid person ID');
            setLoading(false);
            return;
        }
        try {
            const data = await fetchPersonDetails(id);
            console.log('Got person details: ', data);  // ข้อมูลที่ได้จาก API
            if (data) {
                setPerson(data);
            }
            setLoading(false);
        } catch (error) { setLoading(false); }
    };

    const getPersonMovies = async id => {
        if (!id) {
            console.error('No valid person ID');
            setLoading(false);
            return;
        }
        try {
            const data = await fetchPersonMovies(id);
            console.log('Got person movies: ', data);  // ข้อมูลที่ได้จาก API
            if (data && data.cast) {
                setPersonMovies(data.cast);  // อัปเดต state ที่เก็บข้อมูลหนังของบุคคลนี้
            }
            setLoading(false);  
        } catch (error) {
            console.error('Error fetching person movies: ', error);
            setLoading(false);   
        }
    };

    const checkIfFavourite = async (id) => {
        try {
            const existingFavourites = await AsyncStorage.getItem('PersonFav');
            let favourites = existingFavourites ? JSON.parse(existingFavourites) : [];
            const isAlreadyFavourite = favourites.some((fav) => fav.id === id);
            setIsFavourite(isAlreadyFavourite);
        } catch (error) {
            console.error('Error checking if person is favourite:', error);
        }
    };

    const saveFavouritePerson = async (person) => {
        try {
            const existingFavourites = await AsyncStorage.getItem('PersonFav');
            let favourites = existingFavourites ? JSON.parse(existingFavourites) : [];
            const isAlreadyFavourite = favourites.some((fav) => fav.id === person.id);
            if (!isAlreadyFavourite) {
                favourites.push(person);
                await AsyncStorage.setItem('PersonFav', JSON.stringify(favourites));
                setIsFavourite(true);
                console.log('Person saved as favourite!');
            } else {
                favourites = favourites.filter((fav) => fav.id !== person.id);
                await AsyncStorage.setItem('PersonFav', JSON.stringify(favourites));
                setIsFavourite(false);
                console.log('Person removed from favourites.');
            }
        } catch (error) {
            console.error('Error saving favourite person:', error);
        }
    };

    return (
        <ScrollView style={styles.scrollView} contentContainerStyle={[styles.contentContainer, { backgroundColor: isDarkMode ? '#f5f5f5' : '#1f1f1f' }]}>
            {/* back button */}
            <SafeAreaView style={styles.safeArea}>
                <TouchableOpacity
                    style={styles.backButton}
                    onPress={() => navigation.goBack()}>
                    <ChevronLeftIcon size="28" strokeWidth={2.5} color="white" />
                </TouchableOpacity>

                <TouchableOpacity onPress={() => saveFavouritePerson(person)}>
                    <HeartIcon size="35" color={isFavourite ? 'red' : 'white'} />
                </TouchableOpacity>
            </SafeAreaView>

            {/* person details */}
            {
                loading ? (
                    <Loading />
                ) : (
                    <View style={[styles.personDetailsContainer, { color: isDarkMode ? '#333' : '#cccccc' }]}>
                        <View style={[styles.personImageContainer, { color: isDarkMode ? '#333' : '#cccccc' }]}>
                            <Image
                                style={styles.personImage}
                                source={{ uri: image342(person?.profile_path) || fallbackPersonImage }}
                            />
                        </View>
                        <View style={[styles.textContainer, { color: isDarkMode ? '#333' : '#cccccc' }]}>
                            <Text style={[styles.nameText, { color: isDarkMode ? '#333' : '#cccccc' }]}>{person?.name}</Text>
                            <Text style={[styles.locationText, { color: isDarkMode ? '#333' : '#cccccc' }]}>{person?.place_of_birth}</Text>
                        </View>
                        <View style={[styles.infoContainer, { color: isDarkMode ? '#333' : '#cccccc' }]}>
                            <View style={styles.infoItem}>
                                <Text style={styles.infoTitle}>Gender</Text>
                                <Text style={styles.infoText}>{person?.gender === 1 ? 'Female' : 'Male'}</Text>
                            </View>
                            <View style={styles.infoItem}>
                                <Text style={styles.infoTitle}>Birthday</Text>
                                <Text style={styles.infoText}>{person?.birthday}</Text>
                            </View>
                            <View style={styles.infoItem}>
                                <Text style={styles.infoTitle}>Know for</Text>
                                <Text style={styles.infoText}>{person?.known_for_department}</Text>
                            </View>
                            <View style={[styles.infoItem, styles.lastInfoItem]}>
                                <Text style={styles.infoTitle}>Popularity</Text>
                                <Text style={styles.infoText}>{person?.popularity?.toFixed(2)} %</Text>
                            </View>

                        </View>
                        <View style={[styles.biographyContainer, { color: isDarkMode ? '#333' : '#cccccc' }]}>
                            <Text style={[styles.biographyTitle, { color: isDarkMode ? '#333' : '#cccccc' }]}>Biography</Text>
                            <Text style={[styles.biographyText, { color: isDarkMode ? '#333' : '#cccccc' }]}>
                                {person?.biography || 'N/A'}
                            </Text>
                        </View>

                        {/* movies */}
                        <MovieList title={'Movies'} hideSeeAll={true} data={personMovies} />
                    </View>
                )
            }
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    scrollView: {
        flex: 1,
        backgroundColor: '#1e1e1e',
    },
    contentContainer: {
        paddingBottom: 25,
    },
    safeArea: {
        zIndex: 20,
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 22,
        position: 'absolute',
        top: 0,
    },
    backButton: {
        padding: 10,
        backgroundColor: '#eab308',
        borderRadius: 15,
    },
    personDetailsContainer: {
        alignItems: 'center',
        paddingVertical: 100,
    },
    personImageContainer: {
        shadowColor: 'gray',
        shadowRadius: 40,
        shadowOffset: { width: 5, height: 5 },
        shadowOpacity: 1,
    },
    personImage: {
        height: height * 0.3,
        width: width * 0.65,
        borderRadius: 1000,
        overflow: 'hidden',
        borderColor: '#757575',
        borderWidth: 2,
    },
    textContainer: {
        marginTop: 25,
    },
    nameText: {
        fontSize: 24,
        color: 'white',
        fontWeight: 'bold',
        textAlign: 'center',
    },
    locationText: {
        paddingTop: 5,
        fontSize: 15,
        color: '#9e9e9e',
        textAlign: 'center',
    },
    infoContainer: {
        marginTop: 20,
        flexDirection: 'row',
        width: width * 0.95,
        backgroundColor: '#2d2d2d',
        borderRadius: 45,
        borderColor: '#2d2d2d',
        borderWidth: 11,
        overflow: 'hidden',
    },
    infoItem: {
        flex: 1,
        alignItems: 'center',
        paddingVertical: 15,
        paddingHorizontal: 5,
        borderRightWidth: 1.5,
        borderRightColor: '#757575',
    },
    infoTitle: {
        textAlign: 'center',
        color: 'white',
        fontWeight: 'bold',
        fontSize: 12,
    },
    lastInfoItem: {
        borderRightWidth: 0,
    },
    infoText: {
        paddingTop: 3,
        color: 'white',
        fontSize: 12,
        textAlign: 'center',
    },
    biographyContainer: {
        marginTop: 20,
        width: width * 0.95,
    },
    biographyTitle: {
        color: 'white',
        fontSize: 15,
        fontWeight: 'bold',
        paddingBottom: 20,
    },
    biographyText: {
        color: 'white',
        fontSize: 13,
    },
});