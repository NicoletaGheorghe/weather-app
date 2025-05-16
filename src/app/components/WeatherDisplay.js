import { getIcon } from "./getIcon";
export default function WeatherDisplay({
  loading,
  forecast,
  currentTemperature,
}) {
  const today = new Date().toISOString().split("T")[0];
  

  if (loading) return <div className="text-center">Loading...</div>;

  return (  
    <div className="mx-2 grid grid-cols gap-6">
      {forecast.map((day, index) => {
        const isToday = day.date === today;
        const weather = getIcon(day.code);
        return (
          <div
            key={index}
            className={`${isToday ? 'bg-white' : 'bg-gray-400'} p-4 rounded-lg shadow-md shadow-gray-600`}
          >
            <h3 className="font-bold text-2xl text-indigo-800 mb-1">
              {new Date(day.date).toDateString()}
            </h3>
            <img src={weather.icon} alt={weather.label} title={weather.label} className="w-22 h-20 mb-2 place-self-center"/>
            {isToday && currentTemperature !== null && (
              <p className="text-indigo-800 font-bold mb-2">{weather.label} &nbsp;
                {currentTemperature}°C
              </p>
            )}
            <div className={`grid grid-cols-2 gap-5 font-semibold text-zinc-700`}>
              <p>Min Temp: {day.min}°C</p>
              <p>Max Temp: {day.max}°C</p>
              <p>Precipitation: {day.precip}%</p>
              <p>UV Index: {day.uv}</p>
              <p className="col-span-2">Wind Speed: {day.wind} km/h</p>
            </div>
          </div>
        );
      })}
    </div>
  );
}
