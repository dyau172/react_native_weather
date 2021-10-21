import React from 'react'
import { View, Text, StyleSheet, Image } from 'react-native'
//import { colors } from '../utils/index'

//const { PRIMARY_COLOR, SECONDARY_COLOR } = colors

export default function WeatherInfo({ currentWeather }) {
    const 
    {
        main: { temp },
        weather: [details],
        name,
    } = currentWeather
    const { icon, main, description } = details

    const iconUrl = `https://openweathermap.org/img/wn/${icon}@4x.png`

    return (
        <View style={styles.weatherInfo}>
            <Text style={styles.textInfo}>{name}</Text>
            <Image style={styles.weatherIcon} source={{ uri: iconUrl }} />
            <Text style={styles.weatherDescription}>{description}</Text>
            <Text style={styles.texSecondary}>{main}</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    weatherInfo: {
        alignItems: 'center',
        color: 'green',
    },
    weatherDescription: {
        textTransform: 'capitalize',
        //color: 'white',
    },
    weatherIcon: {
        width: 100,
        height: 100,
    },
    textInfo: {
        fontSize: 15,
       // color: 'white',
    },
    textPrimary: {
        fontSize: 40,
        //color: 'white',
    },
    texSecondary: {
        fontSize: 20,
       // color: 'white',
        fontWeight: '500',
        marginTop: 10,
    },
})