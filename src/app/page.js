"use client";
import ApiClient from "../../ApiClient/client";
import { useState, useEffect } from "react";
export default function Home() {
  const [locations, setLocations] = useState([]);
  const [selectedLocation, setSelectedLocation] = useState('');
  const [ hourlyTemp, setHourlyTemperature] = useState("");
  const [minimumTemperature, setMinTemperature] = useState('');
  const [maximumTemperature, setMAxTemperature] = useState("");
  const [windSpeed, setWindSpeed] = useState('');
  const [uvIndex, setUvIndex] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const client = new ApiClient();
  const fetchLocation = async () => {
    setLoading(true);
    setError(null);
    try {
      const locationResponse = await client.getLocation({ location: selectedLocation || "London" });
      const results = locationResponse.data.results;
      setLocations(results);
      if (results && results.length > 0) {
        const first = results[0];
        const weatherRes = await client.getWeather({
          latitude: first.latitude,
          longitude: first.longitude  
        });
        const data = weatherRes.data;
          setHourlyTemperature(data.hourly.temperature_2m[0]); // or show multiple
          setMinTemperature(data.daily.temperature_2m_min[0]);
          setMAxTemperature(data.daily.temperature_2m_max[0]);
          setUvIndex(data.daily.uv_index_max[0]);
          setWindSpeed(data.daily.wind_speed_10m_max[0]);

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
          
              <div className="bg-white p-4 rounded shadow mb-4">
                <h2 className="text-xl font-semibold mb-2">Weather Info</h2>
                <p>Temperature: {hourlyTemp}°C</p>
                <p>Minimum Temperature: {minimumTemperature}</p>
                <p>Maximum Temperature: {maximumTemperature}</p>
                <p>UV Index: {uvIndex}</p>
                <p>Wind Speed: {windSpeed} km/h</p>
              </div>
            
          
        )}
      </div>
    </main>
  );
}