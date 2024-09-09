import React, { useEffect } from 'react';
import { View, Image, Dimensions, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';

export default function SplashScreen() {
  const navigation = useNavigation();
  const { width, height } = Dimensions.get('window'); 

  useEffect(() => {
    const timer = setTimeout(() => {
      navigation.replace('Welcome'); 
    }, 2000); 

    // เคลียร์ timeout เมื่อ component ถูก unmount
    return () => clearTimeout(timer);
  }, [navigation]);

  return (
    <View style={styles.container}>
      <Image
        source={require('../assets/img/logo.png')} 
        style={{ width: width * 0.6, height: height * 0.3 }} 
        resizeMode="contain"
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#1f1f1f', 
  },
});
