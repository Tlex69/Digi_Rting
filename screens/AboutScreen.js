import React, { useContext } from 'react';
import { View, Text, StyleSheet, Image, ScrollView, Linking, TouchableOpacity } from 'react-native';
import { ThemeContext } from './ThemeContext'; 
export default function AboutScreen() {
    const { isDarkMode } = useContext(ThemeContext);

    return (
        <ScrollView style={[styles.container, { backgroundColor: isDarkMode ? '#ffffff' : '#1f1f1f' }]}>
            <Image
                source={require('../assets/img/logo.png')}
                style={styles.logo}
            />
            <Text style={[styles.header, { color: isDarkMode ? '#000000' : '#eab308' }]}>About This App</Text>
            <Text style={[styles.description, { color: isDarkMode ? '#000000' : '#ffffff' }]}>
                This app is designed to help you watch trending movies and their synopsis efficiently.
            </Text>

            <Text style={[styles.header, { color: isDarkMode ? '#000000' : '#eab308' }]}>Developer Info</Text>
            <Text style={[styles.text, { color: isDarkMode ? '#000000' : '#ffffff' }]}>
                Developed by DigiRating group. If you have any questions or feedback, feel free to contact us.
            </Text>

            <Text style={[styles.header, { color: isDarkMode ? '#000000' : '#eab308' }]}>Email Us</Text>
            <Text style={[styles.text, { color: isDarkMode ? '#000000' : '#ffffff' }]}>
                DigiRating@gmail.com
            </Text>

            <TouchableOpacity onPress={() => Linking.openURL('https://example.com')}>
                <Text style={[styles.header, { color: isDarkMode ? '#000000' : '#eab308' }]}>Website</Text>
                <Text style={[styles.link, { color: isDarkMode ? '#eab308' : '#eab308' }]}>View Website</Text>
            </TouchableOpacity>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
    },
    logo: {
        width: 150,
        height: 150,
        alignSelf: 'center',
        marginBottom: 25,
    },
    header: {
        fontSize: 22,
        fontWeight: 'bold',
        marginBottom: 20,
    },
    description: {
        fontSize: 16,
        marginBottom: 20,
    },
    text: {
        fontSize: 16,
        marginBottom: 12,
    },
    link: {
        fontSize: 16,
        marginBottom: 10,
        textDecorationLine: 'underline',
    },
});
