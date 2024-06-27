import React, { useEffect, useState } from 'react';
import { FlatList, Text, View, ActivityIndicator, StyleSheet, ImageBackground } from 'react-native';
import { useFonts } from 'expo-font';
import LottieView from 'lottie-react-native';
import * as Location from 'expo-location';
import ForecastItem from './ForecastItem';
import { assets } from '../react-native.config';

const BASE_URL = 'https://api.openweathermap.org/data/2.5';
const WEATHER_KEY = process.env.EXPO_PUBLIC_OPENWEATHERKEY;
const SET_UNIT = 'metric';
const bgimg = 'https://notjustdev-dummy.s3.us-east-2.amazonaws.com/vertical-images/1.jpg';

type MainWeather = {
  temp: number;
  feels_like: number;
  temp_min: number;
  temp_max: number;
  pressure: number;
  humidity: number;
  sea_level: number;
  grnd_level: number;
};

type Weather = {
  name: string;
  main: MainWeather;
  weather: [
    {
      id: string;
      main: string;
      description: string;
      icon: string;
    }
  ];
};

export type WeatherForecast = {
  main: MainWeather;
  dt: number;
};

const Homescreen=()=> {
  const [location, setLocation] = useState<Location.LocationObject>();
  const [errormsg, setErrorMsg] = useState('');
  const [weather, setWeather] = useState<Weather>();
  const [forecast, setForecast] = useState<WeatherForecast[]>();

  const [fontsLoaded] = useFonts({
    'Inter': require('../assets/fonts/Inter-Medium.ttf'),
    'InterBlack': require('../assets/fonts/Inter-Black.ttf'),
    'InterBold': require('../assets/fonts/Inter-Bold.ttf'),
    'InterExtraBold': require('../assets/fonts/Inter-ExtraBold.ttf'),
    'InterReg': require('../assets/fonts/Inter-Regular.ttf'),
    'InterSemi': require('../assets/fonts/Inter-SemiBold.ttf')
  });

  useEffect(() => {
    if (location) {
      fetchWeather();
      fetchForecast();
    }
  }, [location]);
  
  useEffect(() => {
    (async () => {
      
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        setErrorMsg('Permission to access location was denied');
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      console.log('Location: ', location);
      setLocation(location);
    })();
  }, []);
  
  const fetchWeather = async () =>{
    if(!location) {
      return;
    }

    const result = await fetch(
      `${BASE_URL}/weather?lat=${location.coords.latitude}&lon=${location.coords.longitude}&appid=${WEATHER_KEY}&units=${SET_UNIT}`
    );

    const data = await result.json();
    console.log(JSON.stringify(data, null, 2));
    setWeather(data);
  };

  const fetchForecast = async () => {
    if(!location) {
      return;
    };

    const nodays = 6;
    const result = await fetch(
      `${BASE_URL}/forecast?lat=${location.coords.latitude}&lon=${location.coords.longitude}&appid=${WEATHER_KEY}&cnt=${nodays}&units=${SET_UNIT}`
    );

    const data = await result.json();
    console.log(JSON.stringify(data, null, 2));
    setForecast(data.list);
  }

  if(!weather) {
      return <ActivityIndicator/>
  }
    
  return(
    <ImageBackground source={{uri: bgimg}} style={styles.container}>
      <View 
        style={{ 
          ...StyleSheet.absoluteFillObject, 
          backgroundColor: 'rgba(0, 0, 0, 0.5)', 
        }}
      />
      <View style={{
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
       }}>
          <LottieView 
            source= {
              weather.weather[0].main == 'Rain' ? require('./../assets/lottie-files/rain.json') : require('./../assets/lottie-files/sunny.json')
            }
            style= {{
              width: 200,
              aspectRatio: 1,             
            }}
            loop
            autoPlay
        />
        <Text style={styles.location}>{weather.name}</Text>
        <Text style={styles.temp}>{Math.round(weather.main.temp)}°C</Text>
      </View>

      <FlatList
        data={forecast}
        horizontal
        showsHorizontalScrollIndicator={false}
        style ={{
          flexGrow: 0,
          height: 150,
          marginBottom: 40,
        }}
        contentContainerStyle={{ 
          gap: 10,
          paddingHorizontal: 10,
         }}
        renderItem={({item}) => <ForecastItem forecast={item} />}
      />
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
  },
  
  location: {
    fontFamily: 'InterSemi',
    fontSize: 50,
    color: 'lightgray',
  },
  
  temp: {
    fontFamily: 'InterBlack',
    fontSize: 100,
    color: '#fefefe',
  },
})

export default Homescreen;