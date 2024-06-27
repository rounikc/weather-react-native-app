//import packs
import * as React from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Button } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

//import screens here
import Homescreen from './Screens/Homescreen';
import CustomHeader from './customheader';

const Stack = createNativeStackNavigator();

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerStyle: {backgroundColor: 'black',
          },
          headerTintColor: 'white',
        }}>
        
        <Stack.Screen 
          name="Homescreen" 
          component={ Homescreen }
          options={{
            headerTitle: () => <CustomHeader/>
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default App;