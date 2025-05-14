"use client";
import WeatherFetcher from "./components/WeatherFetcher";

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-gray-100 via-gray-300 to-gray-400 p-12">
      <div className="max-w-7xl mx-auto text-center">
        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
          Weather App
        </h1>
        <p className="text-gray-500 mb-4">
          Choose a location and check the weather
        </p>
        <WeatherFetcher />
      </div>
    </main>
  );
}
