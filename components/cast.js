import { View, Text, ScrollView, TouchableOpacity, StyleSheet, Image } from 'react-native';
import React, { useContext } from 'react'; // Corrected import for useContext
import { fallbackPersonImage, image185 } from '../api/moviedb';
import { ThemeContext } from '../screens/ThemeContext'; // Adjust the path as needed

export default function Cast({ cast, navigation }) {
  const { isDarkMode } = useContext(ThemeContext);

  return (
    <View style={[styles.container, { backgroundColor: isDarkMode ? '#f5f5f5' : '#1f1f1f' }]}>
      <Text style={[styles.title, { color: isDarkMode ? '#000' : '#FFF' }]}>Top Cast</Text>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.scrollViewContainer}
      >
        {cast && cast.map((person, index) => (
          <TouchableOpacity
            key={index}
            style={styles.castItem}
            onPress={() => navigation.navigate('Person', person)}
          >
            <View style={styles.imageContainer}>
              <Image
                style={styles.castImage}
                source={{ uri: image185(person?.profile_path) || fallbackPersonImage }}
              />
            </View>
            <Text style={[styles.characterName, { color: isDarkMode ? '#000' : '#FFF' }]}>
              {
                person?.character
                  ? (person.character.length > 10
                    ? person.character.slice(0, 10) + '...'
                    : person.character)
                  : 'Unknown Character'  
              }
            </Text>

            <Text style={[styles.personName, { color: isDarkMode ? '#000' : '#FFF' }]}>
              {
                person?.original_name
                  ? (person.original_name.length > 10
                    ? person.original_name.slice(0, 10) + '...'
                    : person.original_name)
                  : 'Unknown Name'  
              }
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  title: {
    fontSize: 18,
    marginHorizontal: 16,
    marginBottom: 20,
    marginTop: 25,
  },
  scrollViewContainer: {
    paddingHorizontal: 15,
  },
  castItem: {
    marginRight: 17,
    alignItems: 'center',
  },
  characterName: {
    fontSize: 12,
  },
  personName: {
    fontSize: 9,
  },
  castImage: {
    borderRadius: 16,
    height: 96,
    width: 80,
  },
  imageContainer: {
    overflow: 'hidden',
    borderRadius: 50,
    height: 85,
    width: 85,
    borderColor: '#5d5d5d',
    borderWidth: 0.5,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
