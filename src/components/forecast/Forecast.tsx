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

const Forecast = ({ city }: Props) => {
  const [forecastData, setForecastData] = useState<ForecastDay[]>([]);
  const fetchWeather = useCallback(() => {
    apiClient
      .get("forecast.json", {
        params: {
          q: city,
          days: 1,
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

  return (
    <div className="forecast-window">
      {forecastData.map((data) => (
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
