import { StyleSheet, View, Text } from 'react-native';
import React from 'react';
import { WeatherForecast } from './Homescreen';
import { useFonts } from 'expo-font';
import { BlurView } from 'expo-blur';
import dayjs from 'dayjs';

const ForecastItem = ({ forecast }: { forecast: WeatherForecast }) => {
    const [fontsLoaded] = useFonts({
        'Inter': require('../assets/fonts/Inter-Medium.ttf'),
        'InterBlack': require('../assets/fonts/Inter-Black.ttf'),
        'InterBold': require('../assets/fonts/Inter-Bold.ttf'),
        'InterExtraBold': require('../assets/fonts/Inter-ExtraBold.ttf'),
        'InterReg': require('../assets/fonts/Inter-Regular.ttf'),
        'InterSemi': require('../assets/fonts/Inter-SemiBold.ttf')
      });
    
    return (
        <BlurView intensity={30} style={styles.container}>
            <Text style={styles.temp}>
                {Math.round(forecast.main.temp)}°C
            </Text>
            <Text style={styles.date}>
                {dayjs(forecast.dt * 1000).format('dddd, h a')}
            </Text>
        </BlurView>
    )
}

const styles = StyleSheet.create({
    container: {
        padding: 10,
        aspectRatio: 3 / 4 ,
        borderRadius: 10,
        alignItems: 'center',
        justifyContent: 'center',
        overflow: 'hidden',
        borderColor: 'gainsboro',
        borderWidth: 1,
    },

    temp: {
        fontFamily: 'InterBlack',
        fontSize: 20,
        color: 'white',
        textAlign: 'center',
        marginVertical: 10,
    },

    date: {
        fontFamily: 'InterSemi',
        fontWeight: 'bold',
        color: 'snow',
        alignSelf: 'flex-end',
    }
})

export default ForecastItem;