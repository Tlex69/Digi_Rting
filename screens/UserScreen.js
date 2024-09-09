import { View, Text, TouchableOpacity, StyleSheet, SafeAreaView } from 'react-native';
import React, { useContext } from 'react';
import { useNavigation } from '@react-navigation/native';
import { ThemeContext } from './ThemeContext'; // Path to your ThemeContext

export default function UserScreen() {
    const navigation = useNavigation();
    const { isDarkMode } = useContext(ThemeContext);
    const userName = 'user';

    const handleNavigate = (screen) => {
        navigation.navigate(screen);
    }

    const handleSignOut = () => {
        // Add sign-out logic here if needed
        navigation.navigate('Welcome');
    }

    return (
        <SafeAreaView style={[styles.container, { backgroundColor: isDarkMode ? '#f5f5f5' : '#1f1f1f' }]}>
            <View style={styles.content}>
                <View style={[styles.userNameContainer, { backgroundColor: isDarkMode ? '#fff' : '#424242', borderColor: isDarkMode ? '#eab308' : '#eab308' }]}>
                    <Text style={[styles.userName, { color: isDarkMode ? '#000' : '#f5f5f5' }]}>{userName}</Text>
                </View>

                <TouchableOpacity
                    style={[styles.item, { backgroundColor: isDarkMode ? '#fff' : '#424242' }]}
                    onPress={() => handleNavigate('MovieFav')}
                >
                    <Text style={[styles.itemText, { color: isDarkMode ? '#000' : '#ffffff' }]}>Movie Favorite</Text>
                </TouchableOpacity>
                <View style={styles.separator} />

                <TouchableOpacity
                    style={[styles.item, { backgroundColor: isDarkMode ? '#fff' : '#424242' }]}
                    onPress={() => handleNavigate('PersonFav')}
                >
                    <Text style={[styles.itemText, { color: isDarkMode ? '#000' : '#ffffff' }]}>Person Favorite</Text>
                </TouchableOpacity>
                <View style={styles.separator} />

                <TouchableOpacity
                    style={[styles.item, { backgroundColor: isDarkMode ? '#fff' : '#424242' }]}
                    onPress={() => handleNavigate('Setting')}
                >
                    <Text style={[styles.itemText, { color: isDarkMode ? '#000' : '#ffffff' }]}>Settings</Text>
                </TouchableOpacity>
                <View style={styles.separator} />

                <TouchableOpacity
                    style={[styles.item, { backgroundColor: isDarkMode ? '#fff' : '#424242' }]}
                    onPress={handleSignOut}
                >
                    <Text style={[styles.itemText, { color: '#eab308' }]}>Sign Out</Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    content: {
        flex: 1,
        paddingHorizontal: 18,
        paddingVertical: 8,
    },
    userNameContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 20,
        paddingHorizontal: 30,
        borderRadius: 25,
        borderWidth: 1,
        marginBottom: 20,
        elevation: 5,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.5,
        shadowRadius: 5,
    },
    userName: {
        fontSize: 22,
        fontWeight: 'bold',
        marginLeft: 15,
    },
    item: {
        paddingVertical: 15,
        borderRadius: 15,
        marginVertical: 5,
        elevation: 3, // Add shadow effect here
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.3,
        shadowRadius: 3,
    },
    itemText: {
        fontSize: 18,
        fontWeight: '500',
        textAlign: 'center',
    },
    
});
