export default function WeatherDisplay({
  loading,
  forecast,
  currentTemperature,
}) {
  const today = new Date().toISOString().split("T")[0];
  const getIcon = (code) => {
    if (code === 0) return {label: "Clear sky", icon: "/icons/sun.png"};
    if (code >=1 && code <=3) return {label: "Partly cloudy", icon: "/icons/partlyCloudy.png"};
    if (code >= 45 && code <= 48) return {label: "Fog", icon: "icons/cloudy.png"};
    if (code >= 66 && code <= 67) return {label: "Freezing rain", icon: "/icons/freezingRain.png"};
    if (code >= 51 && code <= 57) return {label: "Drizzle", icon: "/icons/rain.png"};
    if (code >= 61 && code <= 65) return {label:"Rain", icon: "/icons/rain.png"};
    if (code >= 71 && code <= 77) return {label: "Snow", icon: "/icons/snow.png"};
    if (code === 85 || code === 86) return {label: "Snow showers", icon: "/icons/snow.png"};
    if (code >= 80 && code <= 82) return {label: "Rain showers", icon: "/icons/rain.png"};
    if (code >= 95 && code <= 99) return {label: "Thunderstorm", icon: "/icons/storm.png"};
  
    return "/icons/unknown.png";
  }

  if (loading) return <div className="text-center">Loading...</div>;

  return (  
    <div className="justify-center grid grid-cols gap-6 mx-5">
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
