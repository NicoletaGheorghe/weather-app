export default function WeatherDisplay({
  loading,
  forecast,
  currentTemperature,
}) {
  const today = new Date().toISOString().split("T")[0];

  if (loading) return <div className="text-center">Loading...</div>;

  return (  
    <div className="justify-center grid grid-cols gap-6 mx-5">
      {forecast.map((day, index) => {
        const isToday = day.date === today;
        return (
          <div
            key={index}
            className={`${isToday ? 'bg-white' : 'bg-gray-400'} p-4 rounded-lg shadow-md shadow-gray-600`}
          >
            <h3 className="font-bold text-2xl text-indigo-800 mb-1">
              {new Date(day.date).toDateString()}
            </h3>
            {isToday && currentTemperature !== null && (
              <p className="text-indigo-800 font-bold mb-2">Current temperature:
                {currentTemperature}°C
              </p>
            )}
            <div className={`grid grid-cols-2 gap-2 font-semibold text-zinc-700`}>
              <p>Min Temp: {day.min}°C</p>
              <p>Max Temp: {day.max}°C</p>
              <p>UV Index: {day.uv}</p>
              <p>Wind Speed: {day.wind} km/h</p>
            </div>
          </div>
        );
      })}
    </div>
  );
}
