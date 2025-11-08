import "./MainApp.css";
import { useCallback, useEffect, useRef, useState } from "react";
import apiClient from "../../services/api-client";
import Forecast from "../forecast/Forecast.tsx";
import SearchBar from "../searchBar/SearchBar.tsx";
import Background from "../background/Background.tsx";
import CurrentWeatherWindow from "../currentWeatherWindow/CurrentWeatherWindow";

interface Props {
  location: Time;
  current: Weather;
}

interface Time {
  name: string;
  localtime: string;
  country: string;
}

interface Weather {
  temp_c: number;
  is_day: number;
  condition: {
    text: string;
    icon: string;
  };
}

const MainApp = () => {
  const [theme, setTheme] = useState("dark");

  const [city, setCity] = useState("new_york");
  const [weatherData, setWeatherData] = useState<Props>();
  const ref = useRef<HTMLDivElement>(null);

  const fetchWeather = useCallback(() => {
    apiClient
      .get("current.json", {
        params: {
          q: city,
        },
      })
      .then((res) => {
        setWeatherData(res.data);
      })
      .catch((err) => console.error(err));
  }, [city]);

  useEffect(() => {
    fetchWeather();

    const interval = setInterval(() => {
      fetchWeather();
    }, 60000);

    return () => clearInterval(interval);
  }, [fetchWeather]);

  useEffect(() => {
    if (!ref.current) return;
    ref.current.style.animation = "none";
    void ref.current.offsetHeight;
    ref.current.style.animation = "fadeInBottomContainer 1s both";
  }, [city]);

  return (
    <>
      <div className="upper-layer-container">
        <div className={`${theme}-mode`}>
          <div className="upper-layer">
            <SearchBar onSearch={setCity} />
            <div className="weather-window">
              <div ref={ref} className="location-info-container">
                <CurrentWeatherWindow
                  city={city}
                  time={weatherData?.location}
                  weather={weatherData?.current}
                />
              </div>
            </div>
            <Forecast city={city} />
          </div>
        </div>
      </div>
      <Background
        weather={weatherData?.current.condition.text}
        is_day={weatherData?.current.is_day}
        onThemeChange={setTheme}
      />
    </>
  );
};

export default MainApp;
