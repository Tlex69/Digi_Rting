import React, { useEffect, useState, useContext } from 'react';
import { StatusBar, StyleSheet, Text, View, TouchableOpacity, ScrollView, Modal, Pressable } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Bars3CenterLeftIcon, MagnifyingGlassIcon, LightBulbIcon   } from 'react-native-heroicons/outline';
import TrendingMovies from '../components/trendingMovies';
import MovieList from '../components/movieList';
import Loading from '../components/loading';
import { useNavigation } from '@react-navigation/native';
import { fetchTopRatedMovies, fetchTrendingMovies, fetchUpcomingMovies } from '../api/moviedb';
import { ThemeContext } from './ThemeContext'; 

export default function HomeScreen() {
    const [trending, setTrending] = useState([]);
    const [upcoming, setUpcoming] = useState([]);
    const [topRated, setToprated] = useState([]);
    const [loading, setLoading] = useState(true);
    const [modalVisible, setModalVisible] = useState(false);
    const navigation = useNavigation();
    const { isDarkMode } = useContext(ThemeContext); 

    useEffect(() => {
        getTrendingMovies();
        getUpcomingMovies();
        getTopRatedMovies();
    }, []);

    const getTrendingMovies = async () => {
        const data = await fetchTrendingMovies();
        if (data && data.results) setTrending(data.results);
        setLoading(false);
    };

    const getUpcomingMovies = async () => {
        const data = await fetchUpcomingMovies();
        if (data && data.results) setUpcoming(data.results);
    };

    const getTopRatedMovies = async () => {
        const data = await fetchTopRatedMovies();
        if (data && data.results) setToprated(data.results);
    };

    const handleNavigation = (screen) => {
        setModalVisible(false);
        navigation.navigate(screen);
    };

    return (
        <View style={[styles.container, { backgroundColor: isDarkMode ? '#ffffff' : '#1c1c1e' }]}>
            <SafeAreaView style={styles.safeArea}>
                <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
                <View style={styles.header}>
                    <TouchableOpacity onPress={() => setModalVisible(true)}>
                        <Bars3CenterLeftIcon size={30} strokeWidth={2} color={isDarkMode ? 'black' : 'white'} />
                    </TouchableOpacity>
                    <Text style={[styles.title, { color: isDarkMode ? 'black' : 'white' }]}>
                        <Text style={styles.textd}>Digi</Text> Rating
                    </Text>
                    <TouchableOpacity onPress={() => navigation.navigate('Search')}>
                        <MagnifyingGlassIcon size={30} strokeWidth={2} color={isDarkMode ? 'black' : 'white'} />
                    </TouchableOpacity>
                </View>
            </SafeAreaView>

            <Modal
                transparent={true}
                animationType="slide"
                visible={modalVisible}
                onRequestClose={() => setModalVisible(false)}
            >
                <Pressable style={styles.modalBackground} onPress={() => setModalVisible(false)}>
                    <View style={[styles.modalContainer, { backgroundColor: isDarkMode ? '#ffffff' : '#1c1c1e' }]}>
                        <Pressable style={styles.menuItem} onPress={() => handleNavigation('Home')}>
                            <Text style={[styles.menuText, { color: isDarkMode ? 'black' : 'white' }]}>Home</Text>
                        </Pressable>
                        <Pressable style={styles.menuItem} onPress={() => handleNavigation('Upcoming')}>
                            <Text style={[styles.menuText, { color: isDarkMode ? 'black' : 'white' }]}>Upcoming</Text>
                        </Pressable>
                        <Pressable style={styles.menuItem} onPress={() => handleNavigation('Top Rated')}>
                            <Text style={[styles.menuText, { color: isDarkMode ? 'black' : 'white' }]}>Top Rated</Text>
                        </Pressable>
                        <Pressable style={styles.menuItem} onPress={() => handleNavigation('User')}>
                            <Text style={[styles.menuText, { color: isDarkMode ? 'black' : 'white' }]}>Users</Text>
                        </Pressable>
                    </View>
                </Pressable>
            </Modal>

            {loading ? (
                <Loading />
            ) : (
                <ScrollView
                    showsVerticalScrollIndicator={false}
                    contentContainerStyle={{ paddingBottom: 10 }}
                >
                    {trending.length > 0 && <TrendingMovies data={trending} />}
                    <MovieList title="Upcoming" data={upcoming} />
                    <MovieList title="Top Rated" data={topRated} />
                </ScrollView>
            )}

            {/* Floating button positioned absolutely */}
            <TouchableOpacity style={styles.floatingButton} onPress={() => navigation.navigate('Recom')}>
    <LightBulbIcon   size={30} color="white" />
</TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        paddingTop: 5,
        flex: 1,
    },
    safeArea: {
        marginBottom: 3,
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginHorizontal: 16,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
    },
    textd: {
        color: '#eab308',
        fontSize: 24,
        fontWeight: 'bold',
    },
    floatingButton: {
        position: 'absolute',
        bottom: 30,
        right: 3,
        backgroundColor: '#eab308',
        width: 60,
        height: 60,
        borderRadius: 30,
        justifyContent: 'center',
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.8,
        shadowRadius: 2,
        elevation: 5,
        zIndex: 100, 
    },
    modalBackground: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0,0,0,0.5)',
    },
    modalContainer: {
        borderRadius: 10,
        padding: 20,
        width: '80%',
        alignItems: 'center',
    },
    menuItem: {
        padding: 12,
        borderBottomWidth: 2,
        borderRadius: 50,
        borderBottomColor: '#eab308',
        width: '65%',
    },
    menuText: {
        fontSize: 18,
        fontWeight: 'bold',
        textAlign: 'center',
    },
});
