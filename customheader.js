import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';

const CustomHeader = () => {
  return (
    <View style={styles.container}>
      <Image source={require('./assets/app-ico2.jpg')} style={styles.logo} />
      <Text style={styles.title}>FEELZ WEATHER APP</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  logo: {
    width: 40,
    height: 40,
    marginRight: 10,
  },
  title: {
    fontSize: 20,
    color: '#fff',
  },
});

export default CustomHeader;
