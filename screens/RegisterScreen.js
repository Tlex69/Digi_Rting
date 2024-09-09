import { View, Text, StyleSheet, Image, TextInput } from 'react-native';
import React, { useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { TouchableOpacity } from 'react-native';
import { ArrowLeftIcon } from 'react-native-heroicons/solid';
import { useNavigation } from '@react-navigation/native';

export default function RegisterScreen() {
  const navigation = useNavigation();

  // State variables for the input fields
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  return (
    <View style={styles.container}>
      <SafeAreaView>
        <View style={styles.header}>
          <TouchableOpacity
            onPress={() => navigation.goBack()}
            style={styles.backButton}
          >
            <ArrowLeftIcon size={20} color="black" />
          </TouchableOpacity>
        </View>
      </SafeAreaView>
      <View style={styles.formContainer}>
        <Text style={styles.pageTitle}>Register</Text>
        <View style={styles.form}>
          <Text style={styles.label}>Username</Text>
          <TextInput
            style={styles.input}
            value={username}
            onChangeText={setUsername}
            placeholder="Enter Name"
            placeholderTextColor="#999"
          />
          <Text style={styles.label}>Email Address</Text>
          <TextInput
            style={styles.input}
            value={email}
            onChangeText={setEmail}
            placeholder="Enter Email"
            placeholderTextColor="#999"
          />
          <Text style={styles.label}>Password</Text>
          <TextInput
            style={styles.input}
            secureTextEntry
            value={password}
            onChangeText={setPassword}
            placeholder="Enter Password"
            placeholderTextColor="#999"
          />
          <TouchableOpacity
            style={styles.registerButton}
            onPress={() => navigation.navigate('Login')}
          >
            <Text style={styles.registerButtonText}>Register</Text>
          </TouchableOpacity>
        </View>
        <Text style={styles.orText}>or</Text>
        <View style={styles.socialLoginContainer}>
          <TouchableOpacity style={styles.socialLoginButton}>
            <Image
              source={require('../assets/img/google.png')}
              style={styles.socialLoginIcon}
            />
          </TouchableOpacity>
        </View>
        <View style={styles.loginPrompt}>
          <Text style={styles.promptText}>Already have an account?</Text>
          <TouchableOpacity onPress={() => navigation.navigate('Login')}>
            <Text style={styles.registerText}> Login</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1c1c1e',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    padding: 16,
  },
  backButton: {
    backgroundColor: '#facc15',
    padding: 10,
    borderRadius: 15,
    marginLeft: 16,
  },
  pageTitle: {
    textAlign: 'center',
    color: '#333',
    fontSize: 24,
    fontWeight: 'bold',
    marginVertical: 20,
  },
  formContainer: {
    flex: 2,
    backgroundColor: 'white',
    paddingHorizontal: 32,
    paddingTop: 32,
    borderTopLeftRadius: 50,
    borderTopRightRadius: 50,
  },
  form: {
    marginBottom: 16,
  },
  label: {
    color: '#999',
    marginBottom: 8,
    marginLeft: 4,
  },
  input: {
    backgroundColor: '#f0f0f0',
    padding: 16,
    borderRadius: 10,
    marginBottom: 16,
    color: '#333',
  },
  registerButton: {
    backgroundColor: '#facc15',
    paddingVertical: 16,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 16,
  },
  registerButtonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  orText: {
    textAlign: 'center',
    color: '#999',
    marginVertical: 16,
  },
  socialLoginContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginVertical: 16,
  },
  socialLoginButton: {
    backgroundColor: '#f0f0f0',
    padding: 16,
    borderRadius: 50,
  },
  socialLoginIcon: {
    width: 40,
    height: 40,
  },
  loginPrompt: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 2,
    marginBottom: 18,
  },
  promptText: {
    color: '#999',
  },
  registerText: {
    color: '#facc15',
    marginLeft: 7,
  },
});
