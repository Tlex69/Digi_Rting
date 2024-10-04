import React, { useState, useContext, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { ThemeContext } from './ThemeContext'; // Import the ThemeContext
import { sendEmailVerification, updateEmail, deleteUser } from 'firebase/auth';
import { doc, getDoc, updateDoc } from 'firebase/firestore';
import { auth, db } from '../Firebase';

export default function ManageAccountScreen() {
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const navigation = useNavigation();
  const { isDarkMode } = useContext(ThemeContext); // Access the theme context

  const handleUpdateProfile = async () => {
    const user = auth.currentUser;
    if (user) {
      try {
        const userRef = doc(db, 'users', user.uid);
        await updateDoc(userRef, { name: name });
        Alert.alert("Update username success!!");
      } catch (error) {
        Alert.alert('Failed to update profile', error.message);
      }
    }
  };

  const handleDeleteUser = () => {
    const user = auth.currentUser; 
    
    if (user) {
      Alert.alert(
        'Delete Account',
        'Are you sure you want to delete your account? This action cannot be undone.',
        [
          { text: 'Cancel', style: 'cancel' },
          {
            text: 'Delete',
            onPress: async () => {
              try {
                await deleteUser(user);
                Alert.alert('Account Deleted', 'Your account has been deleted.');
                navigation.navigate('Welcome');
              } catch (error) {
                Alert.alert('Failed to delete account', error.message);
              }
            }
          },
        ],
      );
    } else {
      Alert.alert('Error', 'No user is currently logged in.');
    }
  };
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const user = auth.currentUser;
        if (user) {
          const userRef = doc(db, 'users', user.uid);
          const docSnap = await getDoc(userRef);
          if (docSnap.exists) {
            setName(docSnap.data().name);
            setEmail(user.email);
          }
        }
      } catch (error) {
        console.error('error fetching username and email:', error);
      }
    };
    fetchUser();
  }, []);

  return (
    <View style={[styles.container, { backgroundColor: isDarkMode ? '#f5f5f5' : '#1f1f1f' }]}>
      <Text style={[styles.header, { color: isDarkMode ? '#333' : 'white' }]}>Manage Account</Text>

      <View style={styles.formGroup}>
        <Text style={[styles.header2, { color: isDarkMode ? '#333' : 'white' }]}>{email} </Text>
      </View>


      <View style={styles.formGroup}>
        <Text style={[styles.label, { color: isDarkMode ? '#333' : 'white' }]}>Username</Text>
        <TextInput
          style={[styles.input, { color: isDarkMode ? '#444343' : '#fff', backgroundColor: isDarkMode ? '#fff' : '#333' }]}
          value={name}
          onChangeText={setName}
        />
      </View>

      
      <TouchableOpacity
        style={[styles.button, { backgroundColor: '#eab308' }]}
        onPress={handleUpdateProfile}
      >
        <Text style={styles.buttonText}>Update Username</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={[styles.button, { backgroundColor: '#eab308' }]}
        onPress={handleDeleteUser}
      >
        <Text style={styles.buttonText}>Delete Account</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.linkButton}
        onPress={() => navigation.goBack()}
      >
        <Text style={[styles.linkText, { color: '#eab308' }]}>Back to Settings</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  header2: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
    alignSelf: 'center',
  },
  formGroup: {
    marginBottom: 15,
  },
  label: {
    fontSize: 16,
    marginBottom: 5,
  },
  input: {
    borderWidth: 1,
    borderColor: '#eab308',
    borderRadius: 4,
    padding: 10,
    fontSize: 16,
  },
  email: {
    borderRadius: 4,
    padding: 10,
    fontSize: 16,
  },
  button: {
    paddingVertical: 12,
    borderRadius: 4,
    marginBottom: 10,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
  },
  linkButton: {
    marginTop: 20,
    alignItems: 'center',
  },
  linkText: {
    fontSize: 16,
  },
});
