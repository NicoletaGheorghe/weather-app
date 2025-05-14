"use client";
import { useState, useEffect } from "react";
import ApiClient from "../../../ApiClient/client";
import LocationSelect from "./LocationSelect";
import WeatherDisplay from "./WeatherDisplay";

export default function WeatherFetcher() {
  const [selectedLocation, setSelectedLocation] = useState("");
  const [dailyForecast, setDailyForecast] = useState([]);
  const [currentTemperature, setCurrentTemperature] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const client = new ApiClient();

  const fetchLocation = async () => {
    setLoading(true);
    setError(null);
    try {
      const locationResponse = await client.getLocation({
        location: selectedLocation || "London",
      });
      const results = locationResponse.data.results;

      if (results && results.length > 0) {
        const first = results[0];
        const weatherRes = await client.getWeather({
          latitude: first.latitude,
          longitude: first.longitude,
        });
        const data = weatherRes.data;
        const forecastArray = data.daily.time.map((date, index) => ({
          date,
          min: data.daily.temperature_2m_min[index],
          max: data.daily.temperature_2m_max[index],
          uv: data.daily.uv_index_max[index],
          wind: data.daily.wind_speed_10m_max[index],
        }));

        setDailyForecast(forecastArray);
        setCurrentTemperature(data.current.temperature_2m);
      }
    } catch (error) {
      setError("Something went wrong. Mistakes happen.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLocation();
  }, [selectedLocation]);

  return (
    <>
    <div className="flex flex-col">
      {error && <div className="text-red-500">{error}</div>}
      <LocationSelect
        selectedLocation={selectedLocation}
        setSelectedLocation={setSelectedLocation}
      />
      <WeatherDisplay
        loading={loading}
        forecast={dailyForecast}
        currentTemperature={currentTemperature}
      />
      </div>
    </>
  );
}
