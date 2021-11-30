import { StatusBar } from "expo-status-bar";
import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View, ActivityIndicator } from "react-native";
import * as Location from "expo-location";
//import {Location, Permissions} from 'expo';
import WeatherInfo from "./components/WeatherInfo";
import WeatherDetails from "./components/WeatherDetails";
import UnitsPicker from "./components/UnitsPicker";
import ReloadIcon from "./components/ReloadIcon";
import { colors } from "./components/index";

const WEATHER_API_KEY = "813e3a9b93bdb7cd510452b0e49af603";
const BASE_WEATHER_URL = "https://api.openweathermap.org/data/2.5/weather?";

export default function App() {
  const [errorMsg, setErrorMsg] = useState(null);
  const [currentWeather, setCurrentWeather] = useState(null);
  const [unitsSystem, setUnitsSystem] = useState("metric");

  //Effect hook which allows states to be used without writing a class
  //Mainly used to handle states and side effects in react functional components 
  useEffect(() => {
    load();
  }, [unitsSystem]);
  
  
  async function load() {
    setCurrentWeather(null)
    try {
      let { status } = await Location.requestForegroundPermissionsAsync();

      if (status !== "granted") {
        setErrorMsg("Access to location is needed");
        return;
      }
      const location = await Location.getCurrentPositionAsync({
        enableHighAccuracy: true,
      });

      const { latitude, longitude } = location.coords;

      const weatherUrl = `${BASE_WEATHER_URL}lat=${latitude}&lon=${longitude}&units=${unitsSystem}&appid=${WEATHER_API_KEY}`;

      //API request
      //response is used to get the weather info
      //result is response in json
      const response = await fetch(weatherUrl);
      const result = await response.json();

      //if response is ok, the new state of the currentWeather is the result
      if (response.ok) {
        setCurrentWeather(result);
      } else {
        setErrorMsg(result.message);
      }
    } catch (error) {
      setErrorMsg(error.message);
    }
  }

  if (currentWeather) {
    return (
        <View style={styles.container}>
            <StatusBar style="auto" />
            <View style={styles.main}>
                <UnitsPicker unitsSystem={unitsSystem} setUnitsSystem={setUnitsSystem} />
                <ReloadIcon load={load} />
                <WeatherInfo currentWeather={currentWeather} />
            </View>
            <WeatherDetails currentWeather={currentWeather} unitsSystem={unitsSystem} />
        </View>
    );
  } else if (errorMsg) {
    return (
      <View style={styles.container}>
        <Text>{errorMsg}</Text>
        <Text>'Doesn't work'</Text>
        <StatusBar style="auto" />
      </View>
    );
  } else {
    return (
        <View style={styles.container}>
            <ActivityIndicator size="large" color={colors.PRIMARY_COLOR} />
            <StatusBar style="auto" />
        </View>
    )
}
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    backgroundColor: "white",
    textAlign: "center",
  },
  main: {
    flex: 1,
    justifyContent: "center",
  },
});
