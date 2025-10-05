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
  const [date, setDate] = useState<Date>(new Date());
  const fetchWeather = useCallback(() => {
    apiClient
      .get("forecast.json", {
        params: {
          q: city,
          days: 7,
          aqi: "no",
          alerts: "no",
        },
      })
      .then((res) => {
        setForecastData(res.data.forecast.forecastday);
        setDate(new Date(res.data.forecast.forecastday[0].date));
      })
      .catch((err) => console.error(err));
  }, [city]);

  useEffect(() => {
    fetchWeather();
  }, [fetchWeather]);

  const height = useViewportHeight();

  let cardsShown = 7;
  if (height < 520) cardsShown = 1;
  else if (height < 650) cardsShown = 2;
  else if (height < 760) cardsShown = 3;
  else if (height < 900) cardsShown = 4;
  else if (height < 1030) cardsShown = 5;
  else if (height < 1180) cardsShown = 6;

  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  switch (date.toString().slice(0, 3)) {
    case "Sun":
      days.splice(0, 1);
      days.unshift("Today (Sunday)");
      break;
    case "Mon":
      days.splice(0, 2);
      days.unshift("Today (Monday)");
      days.push("Monday");
      break;
    case "Tue":
      days.splice(0, 3);
      days.unshift("Today (Tuesday)");
      days.push("Monday", "Tuesday");
      break;
    case "Wed":
      days.splice(0, 4);
      days.unshift("Today (Wednesday)");
      days.push("Monday", "Tuesday", "Wednesday");
      break;
    case "Thu":
      days.splice(0, 5);
      days.unshift("Today (Thursday)");
      days.push("Monday", "Tuesday", "Wednesday", "Thursday");
      break;
    case "Fri":
      days.splice(0, 6);
      days.unshift("Today (Friday)");
      days.push("Monday", "Tuesday", "Wednesday", "Thursday", "Friday");
      break;
    case "Sat":
      days.splice(0, 7);
      days.unshift("Today (Saturday)");
      days.push(
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday",
      );
      break;
  }

  return (
    <div className="forecast-window">
      {forecastData.slice(0, cardsShown).map((data, index) => (
        <ForecastCard
          key={data.date}
          forecast_day={days[index]}
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
