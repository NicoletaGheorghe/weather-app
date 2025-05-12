import axios from "axios";

const geo_base_url = "https://geocoding-api.open-meteo.com/v1/search";
const weather_base_url = "https://api.open-meteo.com/v1/forecast";

export default class ApiClient {

    async responseStatusCheck(responseObject) {
        if (responseObject.status >= 200 && responseObject.status < 300) {
            return responseObject;
        }
        throw new Error(responseObject.statusText);
    }

    async getRequest(url, params = {}) {
        try {
            const response = await axios.get(url, { params });
            return this.responseStatusCheck(response);
        } catch (error) {
            throw new Error('Something went wrong. Mistakes happen.');
        }
    }

    // Get matching locations by name
    async getLocation({ location } = {}) {
        if (!location) throw new Error("Location is required");
        const params = { name: location, count: 10 };
        return this.getRequest(geo_base_url, params);
    }

    // Get weather data for a location (lat/lon)
    async getWeather({ latitude, longitude }) {
        const params = {
            latitude,
            longitude,
            hourly: "temperature_2m",
            current_weather: true
        };
        return this.getRequest(weather_base_url, params);
    }
}
