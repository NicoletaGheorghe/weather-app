"use client";
import ApiClient from "../../ApiClient/client";
import { useState, useEffect } from "react";

export default function Home() {
  const [dailyForecast, setDailyForecast] = useState([]);
  const [locations, setLocations] = useState([]);
  const [selectedLocation, setSelectedLocation] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const client = new ApiClient();

  const fetchLocation = async () => {
    setLoading(true);
    setError(null);
    try {
      const locationResponse = await client.getLocation({ location: selectedLocation || "London" });
          console.log("Location response:", locationResponse); // 👈 Log the full location response
      const results = locationResponse.data.results;
      setLocations(results);

      if (results && results.length > 0) {
        const first = results[0];
        console.log("First location result:", first);
        const weatherRes = await client.getWeather({
          latitude: first.latitude,
          longitude: first.longitude  
        });
        console.log("Weather response:", weatherRes);
        const data = weatherRes.data;

        // Map daily data to an array of forecast for each day
        const forecastArray = data.daily.time.map((date, index) => ({
          date,
          min: data.daily.temperature_2m_min[index],
          max: data.daily.temperature_2m_max[index],
          uv: data.daily.uv_index_max[index],
          wind: data.daily.wind_speed_10m_max[index]
        }));
console.log("Processed forecast array:", forecastArray);
        setDailyForecast(forecastArray);
      }
    } catch (error) {
      setError("Something went wrong. Mistakes happen");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLocation();
  }, [selectedLocation]);

  return (
    
    <main className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-12">
      {error && <div className="text-red-500">{error}</div>}
      <div className="max-w-7xl mx-auto text-center">
        <h1 className="text-3xl font-bold mb-4">Weather App</h1>
        <p className="text-gray-500 mb-4">
          Choose a location and check the weather
        </p>

        <select
          value={selectedLocation}
          onChange={(e) => setSelectedLocation(e.target.value)}
          className="mb-6 p-2 border rounded"
        >
          <option value="">Select a city</option>
          <option value="London">London</option>
          <option value="New York">New York</option>
          <option value="Berlin">Berlin</option>
          <option value="Tokyo">Tokyo</option>
          <option value="Sydney">Sydney</option>
          <option value="Vilnius">Vilnius</option>
          <option value="Glasgow">Glasgow</option>
        </select>

        {loading ? (
          <div className="text-center">Loading...</div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {dailyForecast.map((day, index) => (
              <div key={index} className="bg-white p-4 rounded shadow">
                <h3 className="font-semibold mb-1">{new Date(day.date).toDateString()}</h3>
                <p>Min Temp: {day.min}°C</p>
                <p>Max Temp: {day.max}°C</p>
                <p>UV Index: {day.uv}</p>
                <p>Wind Speed: {day.wind} km/h</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </main>
  );
}
