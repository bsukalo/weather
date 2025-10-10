import { useState, useEffect, useCallback } from "react";
import "./Forecast.css";
import apiClient from "../../services/api-client";
import ForecastCard from "../forecastCard/ForecastCard";
import ForecastCardSkeleton from "../forecastCardSkeleton/ForecastCardSkeleton";

interface Props {
  city: string;
}

interface Condition {
  text: string;
  icon: string;
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
  const [fetchCount, setFetchCount] = useState(0);
  const skeletons = [1, 2, 3];

  const fetchForecast = useCallback(() => {
    apiClient
      .get("forecast.json", {
        params: {
          q: city,
          days: 3,
        },
      })
      .then((res) => {
        setForecastData(res.data.forecast.forecastday);
        setDate(new Date(res.data.forecast.forecastday[0].date));
        setFetchCount((prev) => prev + 1);
      })
      .catch((err) => console.error(err));
  }, [city]);

  useEffect(() => {
    fetchForecast();
  }, [fetchForecast]);

  const height = useViewportHeight();

  let cardsShown = 7;
  if (height < 520) cardsShown = 1;
  else if (height < 650) cardsShown = 2;

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
      days.push("Sunday");
      console.log(days);
      break;
    case "Tue":
      days.splice(0, 3);
      days.unshift("Today (Tuesday)");
      days.push("Sunday", "Monday");
      break;
    case "Wed":
      days.splice(0, 4);
      days.unshift("Today (Wednesday)");
      days.push("Sunday", "Monday", "Tuesday");
      break;
    case "Thu":
      days.splice(0, 5);
      days.unshift("Today (Thursday)");
      days.push("Sunday", "Monday", "Tuesday", "Wednesday");
      break;
    case "Fri":
      days.splice(0, 6);
      days.unshift("Today (Friday)");
      days.push("Sunday", "Monday", "Tuesday", "Wednesday", "Thursday");
      break;
    case "Sat":
      days.splice(0, 7);
      days.unshift("Today (Saturday)");
      days.push(
        "Sunday",
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
      );
      break;
  }
  console.log(forecastData.length);


  return (
    <div className="forecast-window">
      {forecastData.length > 0 ? (
        forecastData.slice(0, cardsShown).map((data, index) => (
          <ForecastCard
            key={`${fetchCount} - ${index}`}
            forecast_day={days[index]}
            weather_description={data.day.condition.text}
            forecast_icon={data.day.condition.icon}
            min_temperature={data.day.mintemp_c}
            avg_temperature={data.day.avgtemp_c}
            max_temperature={data.day.maxtemp_c}
            delay={index * 0.1}
          />))
      ) : (skeletons.map((index) => (<ForecastCardSkeleton key={index} />)))}
    </div>
  );
};

export default Forecast;
