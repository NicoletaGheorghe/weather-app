

export const getIcon = (code) => {
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
  

