import React, { useState, useEffect } from 'react';
import {
  Image,
  SafeAreaView,
  StyleSheet,
  View,
  Text,
  Dimensions,
  FlatList
} from 'react-native';
import { CalendarIcon } from "react-native-heroicons/outline";
import InfoCard from '../components/InfoCard';
import SearchBar from '../components/SearchBar';
import { weatherImages } from '../constants/constants';
import { fetchWeatherForecast } from '../api/weather';
import * as Progress from 'react-native-progress';
import { getData } from '../utils/asyncStorage';

const { width, height } = Dimensions.get('window');
const COLORS = {
  white: '#FFFFFF',
  gray: '#c5c2c2ff'
};

const Home = () => {
  const [weather, setWeather] = useState<any>(null);
  const { location, current } = weather || {};
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDefaultWeather();
  }, []);

  const fetchDefaultWeather = async () => {
    setLoading(true);
    try {
      let savedCity = await getData('city');
      if (!savedCity) savedCity = 'New Delhi';

      const data = await fetchWeatherForecast({
        cityName: savedCity,
        days: '7'
      });
      setWeather(data);
    } catch (error) {
      console.error("Error fetching weather:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Image
        blurRadius={70}
        source={require('../../assets/images/bg.png')}
        style={styles.bgImage}
      />

      {loading ? (
        <View style={[styles.common, { flex: 1 }]}>
          <Progress.CircleSnail
            thickness={5}
            size={80}
            color={['#0bb3b2', '#f472b6', '#facc15']}
          />
          <Text style={{ color: COLORS.white, marginTop: 10 }}>
            Loading Weather...
          </Text>
        </View>
      ) : (
        <SafeAreaView style={styles.container}>
          <View style={styles.common}>
            <SearchBar onWeatherFetched={setWeather} setLoading={setLoading} />

            <View style={styles.areaRow}>
              <Text style={styles.city}>{location?.name}, </Text>
              <Text style={styles.country}>{" " + location?.country}</Text>
            </View>

            <Image
              source={
                weatherImages[current?.condition?.text?.toLowerCase() as keyof typeof weatherImages] ||
                weatherImages.other
              }
              style={styles.weatherImg}
            />
            <Text style={styles.tempText}>{current?.temp_c}°</Text>
            <Text style={styles.weatherText}>{current?.condition?.text}</Text>
          </View>

          <View style={styles.infoContainer}>
            <InfoCard
              icon={require('../../assets/icons/wind.png')}
              text={`${current?.wind_kph} km`}
            />
            <InfoCard
              icon={require('../../assets/icons/drop.png')}
              text={`${current?.humidity}%`}
            />
            <InfoCard
              icon={require('../../assets/icons/sun.png')}
              text={`${weather?.forecast?.forecastday[0]?.astro?.sunrise}`}
            />
          </View>

          <View style={styles.forecastContainer}>
            <CalendarIcon color={COLORS.white} size={20} />
            <Text style={styles.forecastText}>Daily Forecast</Text>
          </View>

          <FlatList
            data={weather?.forecast?.forecastday || []}
            horizontal
            keyExtractor={(item, index) => index.toString()}
            showsHorizontalScrollIndicator={false}
            renderItem={({ item }) => {
              const date = new Date(item.date);
              const options: Intl.DateTimeFormatOptions = { weekday: 'long' };
              const dayName = date.toLocaleDateString('en-US', options);

              return (
                <View style={styles.forecast}>
                  <View style={[styles.dailyForcastContainer, styles.common]}>
                    <Image
                      source={
                        weatherImages[item?.day?.condition?.text?.toLowerCase() as keyof typeof weatherImages] ||
                        weatherImages.other
                      }
                      style={styles.dailyForecastImg}
                    />
                    <Text style={styles.weekDayText}>{dayName}</Text>
                    <Text style={styles.dailyTempText}>
                      {item?.day?.avgtemp_c}°
                    </Text>
                  </View>
                </View>
              );
            }}
          />
        </SafeAreaView>
      )}
    </View>
  );
};

export default Home;

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  bgImage: {
    height: '100%',
    width: '100%',
    position: 'absolute'
  },
  common: {
    justifyContent: 'center',
    alignItems: 'center'
  },
  areaRow: {
    flexDirection: 'row',
    paddingTop: height * 0.1,
    paddingBottom: height * 0.03,
    alignItems: 'baseline'
  },
  city: {
    fontWeight: '600',
    color: COLORS.white,
    fontSize: 22
  },
  country: {
    color: COLORS.gray,
    fontWeight: '400',
    fontSize: 20
  },
  weatherImg: {
    height: height * 0.22,
    width: height * 0.22,
    marginVertical: height * 0.02
  },
  tempText: {
    color: COLORS.white,
    fontSize: height * 0.07,
    fontWeight: '700'
  },
  weatherText: {
    color: COLORS.gray,
    fontWeight: '400',
    fontSize: 18
  },
  infoContainer: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    paddingVertical: 40,
    justifyContent: 'space-between'
  },
  forecastText: {
    color: COLORS.gray,
    fontWeight: '400',
    fontSize: 18,
    marginLeft: 10
  },
  forecastContainer: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    paddingVertical: 10
  },
  dailyForcastContainer: {
    backgroundColor: 'rgba(255, 255, 255, 0.33)',
    height: height * 0.18,
    width: width * 0.25,
    borderRadius: 15
  },
  dailyForecastImg: {
    height: 40,
    width: 40
  },
  weekDayText: {
    color: COLORS.gray,
    fontWeight: '400',
    fontSize: 16,
    marginTop: 5
  },
  dailyTempText: {
    color: COLORS.white,
    fontWeight: '500',
    fontSize: 18,
    marginTop: 10
  },
  forecast: {
    paddingLeft: 20,
    paddingTop: 10
  }
});
