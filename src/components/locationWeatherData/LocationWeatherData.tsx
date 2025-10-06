import { useCallback, useEffect, useState } from "react";
import apiClient from "../../services/api-client";
import "./LocationWeatherData.css";
import Skeleton from "../skeleton/Skeleton.tsx";

interface Props {
  city: string | null;
}

interface Weather {
  current: {
    temp_c: number;
    condition: {
      text: string;
      icon: string;
    };
  };
}

const LocationWeatherData = ({ city }: Props) => {
  const [weather, setWeather] = useState<Weather | null>(null);

  const fetchWeather = useCallback(() => {
    apiClient
      .get<Weather>("current.json", {
        params: {
          q: city,
        },
      })
      .then((res) => {
        setWeather(res.data);
      })
      .catch((err) => console.error(err));
  }, [city]);

  useEffect(() => {
    fetchWeather();
  }, [fetchWeather]);

  return (
    <div className="weather-data-container">
      {weather ? (
        <div className="weather-data">
          <p className="temperature"> {weather.current.temp_c.toString()}°</p>
          <img
            className="weather-icon"
            src={weather.current.condition.icon}
          ></img>
          <p className="weather-description">
            {weather.current.condition.text.toString()}
          </p>
        </div>
      ) : (
        <div className="weather-data">
          <div className="temperature">
            <Skeleton
              skeletonWidth="150px"
              skeletonHeight="50px"
              skeletonMargin="25px"
            />
          </div>
          <div className="weather-description">
            <Skeleton skeletonWidth="150px" skeletonHeight="1em" />
          </div>
        </div>
      )}
    </div>
  );
};

export default LocationWeatherData;
