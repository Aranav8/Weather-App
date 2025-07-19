import React, { useCallback, useState } from 'react';
import {
  StyleSheet,
  TextInput,
  View,
  Dimensions,
  TouchableOpacity,
  Text,
  ActivityIndicator
} from 'react-native';
import { MagnifyingGlassIcon } from 'react-native-heroicons/outline';
import { MapPinIcon } from 'react-native-heroicons/solid';
import { debounce } from 'lodash';
import { fetchLocations, fetchWeatherForecast } from '../api/weather';
import { storeData } from '../utils/asyncStorage';

const { width, height } = Dimensions.get('window');
const COLORS = {
  white: '#FFFFFF',
  gray: '#c5c2c2ff'
};

type LocationType = {
  name: string;
  country: string;
  [key: string]: any;
};

type SearchBarProps = {
  onWeatherFetched: (data: any) => void;
  setLoading: (loading: boolean) => void; 
};

const SearchBar = ({ onWeatherFetched, setLoading }: SearchBarProps) => {
  const [expanded, setExpanded] = useState(false);
  const [locations, setLocations] = useState<LocationType[]>([]);
  const [searchLoading, setSearchLoading] = useState(false);

  const handleLocation = async (loc: LocationType) => {
    console.log("Selected Location: ", loc.name, loc.country);
    setLocations([]);
    setExpanded(false);
    setLoading(true);

    try {
      await storeData('city', loc.name);

      const data = await fetchWeatherForecast({
        cityName: loc.name,
        days: "7",
      });
      onWeatherFetched(data);
    } catch (error) {
      console.error("Error fetching weather: ", error);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = async (value: string) => {
    if (value.length > 2) {
      setSearchLoading(true);
      try {
        const data = await fetchLocations({ cityName: value });
        setLocations(data);
      } catch (error) {
        console.error("Error fetching locations: ", error);
      } finally {
        setSearchLoading(false);
      }
    }
  };

  const handleTextDebounce = useCallback(debounce(handleSearch, 1200), []);

  return expanded ? (
    <View>
      <View style={styles.expandedContainer}>
        <TextInput
          placeholder="Enter City"
          onChangeText={handleTextDebounce}
          placeholderTextColor={COLORS.gray}
          style={styles.barText}
          autoFocus
        />
        <TouchableOpacity
          style={styles.iconContainer}
          onPress={() => setExpanded(false)}
          activeOpacity={0.7}
        >
          <MagnifyingGlassIcon color={COLORS.white} size={20} />
        </TouchableOpacity>
      </View>

      {searchLoading && (
        <View style={styles.loaderContainer}>
          <ActivityIndicator size="small" color={COLORS.white} />
          <Text style={{ color: COLORS.white, marginLeft: 5 }}>Searching...</Text>
        </View>
      )}

      {!searchLoading && locations.length > 0 && (
        <View style={styles.searchbar}>
          {locations.map((loc, index) => (
            <TouchableOpacity
              key={index}
              style={styles.searches}
              onPress={() => handleLocation(loc)}
            >
              <MapPinIcon size={20} color={'#c92525ff'} />
              <Text style={{ color: COLORS.white, marginLeft: 5 }}>
                {loc?.name}, {loc?.country}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      )}
    </View>
  ) : (
    <TouchableOpacity
      style={styles.collapsedContainer}
      onPress={() => setExpanded(true)}
      activeOpacity={0.7}
    >
      <View style={styles.iconContainer}>
        <MagnifyingGlassIcon color={COLORS.white} size={20} />
      </View>
    </TouchableOpacity>
  );
};

export default SearchBar;

const styles = StyleSheet.create({
  collapsedContainer: {
    height: height * 0.06,
    width: height * 0.06,
    borderRadius: (height * 0.06) / 2,
    alignSelf: 'flex-end',
    top: height * 0.06,
    right: width * 0.05,
    justifyContent: 'center',
    alignItems: 'center'
  },
  expandedContainer: {
    backgroundColor: 'rgba(255, 255, 255, 0.35)',
    borderRadius: height * 0.05,
    height: height * 0.07,
    width: width * 0.9,
    flexDirection: 'row',
    alignSelf: 'center',
    top: height * 0.06,
    paddingHorizontal: 15,
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  barText: {
    color: COLORS.white,
    fontWeight: '400',
    fontSize: 16,
    flex: 1
  },
  iconContainer: {
    height: height * 0.05,
    width: height * 0.05,
    borderRadius: (height * 0.05) / 2,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    justifyContent: 'center',
    alignItems: 'center'
  },
  searchbar: {
    position: 'absolute',
    top: height * 0.14,
    width: width * 0.9,
    backgroundColor: '#a4a3a3ff',
    borderRadius: 15,
    alignSelf: 'center',
    padding: 5,
    zIndex: 999
  },
  searches: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderBottomColor: 'rgba(255,255,255,0.2)',
    borderBottomWidth: 1
  },
  loaderContainer: {
    position: 'absolute',
    top: height * 0.14,
    width: width * 0.9,
    backgroundColor: '#a4a3a3ff',
    borderRadius: 15,
    alignSelf: 'center',
    padding: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 1000
  }
});
