import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import React from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';

export default function WelcomeScreen() {
  const navigation = useNavigation();

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.welcomeText}>Welcome to the App!</Text>
        <View style={styles.imageContainer}>
          <Image source={require("../assets/img/wel.png")}
            style={styles.image} />
        </View>
        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={styles.loginButton}
            onPress={() => navigation.navigate('Register')}
          >
            <Text style={styles.loginButtonText}>Register</Text>
          </TouchableOpacity>
          <View style={styles.loginPrompt}>
            <Text style={styles.promptText}>Already have an account?</Text>
            <TouchableOpacity onPress={() => navigation.navigate('Login')}>
              <Text style={styles.loginText}> Log In</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1c1c1e',
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  welcomeText: {
    color: '#eab305',
    fontSize: 24,
    textAlign: 'center',
    marginBottom: 20,
    fontWeight: "500",
  },
  imageContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 30,
  },
  image: {
    width: 300,
    height: 200,
  },
  buttonContainer: {
    marginVertical: 20,
    width: '100%',
    alignItems: 'center',
  },
  loginButton: {
    backgroundColor: '#eab308', 
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 15,
    width: '80%',
  },
  loginButtonText: {
    color: '#1c1c1e', // equivalent to text-gray-700
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  loginPrompt: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 15,
  },
  promptText: {
    color: 'white',
    fontWeight: 'bold',
  },
  loginText: {
    color: '#eab308',
    fontWeight: 'bold',
    marginLeft: 5,
  },
});
