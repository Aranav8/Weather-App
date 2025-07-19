import axios from "axios";
import { api_key } from "../constants/constants";

const forecastEndpoint = params => `http://api.weatherapi.com/v1/forecast.json?key=${api_key}&q=${params.cityName}&days=${params.days}&aqi=no&alerts=no`
const locationEndpoint = params => `http://api.weatherapi.com/v1/search.json?key=${api_key}&q=${params.cityName}`

const apiCall = async (endpoint) => {
    const options = {
        method: 'GET',
        url: endpoint
    }
    try {
        const response = await axios.request(options);
        return response.data;
    } catch (error) {
        console.log('error: ', error);
        return null;
    }
}

export const fetchWeatherForecast = params => {
    return apiCall(forecastEndpoint(params));
}

export const fetchLocations = params => {
    return apiCall(locationEndpoint(params));
}