import { View, Dimensions, StyleSheet } from 'react-native';
import React from 'react';
import * as Progress from 'react-native-progress';

const { width, height } = Dimensions.get('window');

export default function Loading() {
  return (
    <View style={styles.container}>
      <Progress.CircleSnail
        thickness={12}
        size={135}
        color="#eab308" // เปลี่ยนสีที่นี่ตามต้องการ
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    height,
    width,
    position: 'absolute',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
