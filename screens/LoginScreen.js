import { View, Text, StyleSheet, Image, TextInput, TouchableOpacity } from 'react-native';
import React, { useState,useEffect } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ArrowLeftIcon } from 'react-native-heroicons/solid';
import { useNavigation } from '@react-navigation/native';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../Firebase';

export default function LoginScreen() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [uid, setUid] = useState('');
  const [name, setName] = useState('');
  const navigation = useNavigation();

  const UserLogin = async () => {
    console.log('Login');
    signInWithEmailAndPassword(auth, email, password).then((userCrendential) => {
      const user = userCrendential.user;
      console.log(auth);
      navigation.reset({ index: 0, routes: [{ name: 'Home' }] });
    }).catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      alert(errorCode + " " + errorMessage);
    })
  }

  useEffect(() => {
    async function CheckLogin() {
      onAuthStateChanged((user) => {
        if (user) {
          navigation.reset({ index: 0, routes: [{ name: 'Home' }] });
        }
      });
    }
    CheckLogin();
  }, []);

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
          <Text style={styles.title}>Login</Text>
        </View>
      </SafeAreaView>
      <View style={styles.formContainer}>
        <View style={styles.form}>
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
            style={styles.forgotPassword}
            onPress={() => navigation.navigate('Forgot')}
          >
            <Text style={styles.forgotPasswordText}>Forgot Password?</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.loginButton}
            onPress={() => UserLogin()}
          >
            <Text style={styles.loginButtonText}>Login</Text>
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
          <Text style={styles.promptText}>Don't have an account?</Text>
          <TouchableOpacity onPress={() => navigation.navigate('Register')}>
            <Text style={styles.registerText}> Register</Text>
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
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 16,
  },
  backButton: {
    backgroundColor: '#facc15',
    padding: 10,
    borderRadius: 15,
  },
  title: {
    flex: 1,
    textAlign: 'center',
    color: '#facc15',
    fontSize: 26,
    fontWeight: 'bold',
  },
  formContainer: {
    flex: 2,
    backgroundColor: 'white',
    paddingHorizontal: 32,
    paddingTop: 60,
    borderTopLeftRadius: 50,
    borderTopRightRadius: 50,
  },
  form: {
    marginBottom: 40,
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
  forgotPassword: {
    alignItems: 'flex-end',
    marginBottom: 16,
  },
  forgotPasswordText: {
    color: '#999',
  },
  loginButton: {
    backgroundColor: '#facc15',
    paddingVertical: 16,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 16,
  },
  loginButtonText: {
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
    padding: 1,
    borderRadius: 50,
  },
  socialLoginIcon: {
    width: 40,
    height: 40,
  },
  loginPrompt: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 16,
    marginBottom: 65,
  },
  promptText: {
    color: '#999',
  },
  registerText: {
    color: '#facc15',
    marginLeft: 4,
  },
});
