import React, { useContext } from 'react';
import { View, Text, Switch, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import { ThemeContext } from './ThemeContext'; // Path to your ThemeContext
import { useNavigation } from '@react-navigation/native';

export default function SettingScreen() {
  const { isDarkMode, toggleDarkMode, resetTheme } = useContext(ThemeContext);
  const navigation = useNavigation();

  const handleResetSettings = () => {
    Alert.alert(
      'Reset Settings',
      'Are you sure you want to reset all settings to default?',
      [
        { text: 'Cancel', style: 'cancel' },
        { text: 'OK', onPress: () => {
            resetTheme(); // Reset theme to default (light mode)
            console.log('Settings reset');
          },
        },
      ],
    );
  };

  return (
    <View style={[styles.container, { backgroundColor: isDarkMode ? '#f5f5f5' : '#1f1f1f' }]}>
      <View style={styles.settingRow}>
        <Text style={[styles.settingLabel, { color: isDarkMode ? '#000': '#eab308' }]}>Light Mode</Text>
        <Switch
          value={isDarkMode}
          onValueChange={toggleDarkMode}
          thumbColor={isDarkMode ? '#f4f3f4' : '#f5f5f5'}
          trackColor={{ false: '#81b0ff', true: '#767577' }}
        />
      </View>

      <TouchableOpacity
        style={[styles.settingButton, { backgroundColor: isDarkMode ? '#fff' : '#424242' }]}
        onPress={() => navigation.navigate('Manage')} 
      >
        <Text style={[styles.settingText, { color: isDarkMode ? 'black' : '#eab308' }]}>Manage Account</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={[styles.settingButton, { backgroundColor: isDarkMode ? '#fff' : '#424242' }]}
        onPress={handleResetSettings}
      >
        <Text style={[styles.settingText, { color: isDarkMode ? 'red' : 'white' }]}>Reset Setting</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={[styles.settingButton, { backgroundColor: isDarkMode ? '#fff' : '#424242' }]}
        onPress={() => navigation.navigate('About')} 
      >
        <Text style={[styles.settingText, { color: isDarkMode ? 'black' : '#eab308' }]}>About App</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  settingRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginVertical: 20,
  },
  settingLabel: {
    fontSize: 18,
  },
  settingButton: {
    paddingVertical: 15,
    borderRadius: 8,
    marginVertical: 5,
    elevation: 1,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 3,
    shadowOffset: { width: 0, height: 2 },
  },
  settingText: {
    fontSize: 18,
    fontWeight: '500',
    textAlign: 'center',
  },
});
