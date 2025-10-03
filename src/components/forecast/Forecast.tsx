import apiClient from "../../services/api-client";
import ForecastCard from "../forecastCard/ForecastCard";
import "./Forecast.css";
import { useState, useEffect, useCallback } from "react";

interface Props {
  city: string;
}

interface Condition {
  text: string;
}

interface Day {
  mintemp_c: number;
  avgtemp_c: number;
  maxtemp_c: number;
  condition: Condition;
}

export interface ForecastDay {
  date: string;
  day: Day;
}

function useViewportHeight() {
  const [height, setHeight] = useState(window.innerHeight);

  useEffect(() => {
    const handleResize = () => setHeight(window.innerHeight);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return height;
}

const Forecast = ({ city }: Props) => {
  const [forecastData, setForecastData] = useState<ForecastDay[]>([]);
  const fetchWeather = useCallback(() => {
    apiClient
      .get("forecast.json", {
        params: {
          q: city,
          days: 7,
        },
      })
      .then((res) => {
        setForecastData(res.data.forecast.forecastday);
      })
      .catch((err) => console.error(err));
  }, [city]);

  useEffect(() => {
    fetchWeather();
  }, [fetchWeather()]);

  const height = useViewportHeight();

  let cardsShown = 7;
  if (height < 520) cardsShown = 1;
  else if (height < 650) cardsShown = 2;
  else if (height < 760) cardsShown = 3;
  else if (height < 900) cardsShown = 4;
  else if (height < 1030) cardsShown = 5;
  else if (height < 1180) cardsShown = 6;

  return (
    <div className="forecast-window">
      {forecastData.slice(0, cardsShown).map((data) => (
        <ForecastCard
          key={data.date}
          forecast_day={data.date}
          weather_description={data.day.condition.text}
          min_temperature={data.day.mintemp_c}
          avg_temperature={data.day.avgtemp_c}
          max_temperature={data.day.maxtemp_c}
        />
      ))}
    </div>
  );
};

export default Forecast;
