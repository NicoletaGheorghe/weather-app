"use client";
import WeatherFetcher from "./components/WeatherFetcher";

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-gray-100 via-gray-300 to-gray-400 p-12">
      <div className="max-w-7xl mx-auto text-center">
        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
          7-Days Weather checker
        </h1>
        <p className="text-gray-500 mb-4">
          Choose locations
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2 mt-10"><WeatherFetcher />
          <div className="hidden md:block">
            <WeatherFetcher />
          </div>
          <div className="hidden lg:block">
           <WeatherFetcher />
          </div>
        </div>
      </div>
    </main>
  );
}
