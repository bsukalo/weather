import "./Background.css";
import { useState, useEffect } from "react";
import { conditionList } from "../../data/conditionList.tsx";
import Precipitation from "../precipitation/Precipitation.tsx";

interface Props {
  weather: string | undefined;
  is_day: number | undefined;
  onThemeChange: (theme: string) => void;
}

function dayOrNight(isDay: number | undefined) {
  if (isDay === undefined || isDay === 1) return "day";
  else return "night";
}

function formatBackground(key: string, time: string | undefined) {
  const formattedWeather =
    conditionList[key].icon + (time ? time : "day") + ".png";
  if (formattedWeather === "sunnynight.png") return "clearnight.png";
  else return formattedWeather;
}

const Background = ({ weather, is_day, onThemeChange }: Props) => {
  const key = weather?.toLowerCase().replace(/ /g, "") || "clear";
  const bgImage = formatBackground(key, dayOrNight(is_day));
  const imageUrl = new URL(`../../assets/${bgImage}`, import.meta.url).href;
  const [isTransitioning, setTransitioning] = useState(false);
  const [currentBg, setCurrentBg] = useState<String | null>(imageUrl);
  const [nextBg, setNextBg] = useState<String | null>(imageUrl);
  const [raining, setRaining] = useState(false);
  const [isSnowing, setSnowing] = useState(false);

  useEffect(() => {
    if (conditionList[key].rainIntensity > 0) setRaining(true);
    else setRaining(false);

    if (conditionList[key].snowIntensity > 0) setSnowing(true);
    else setSnowing(false);
  }, [key]);

  useEffect(() => {
    if (conditionList[key].darkMode === false || is_day === 0)
      onThemeChange("light");
    else onThemeChange("dark");
  }, [key, is_day, imageUrl]);

  useEffect(() => {
    setNextBg(imageUrl);
    setTransitioning(true);
    const timeout = setTimeout(() => {
      setCurrentBg(imageUrl);
      setTransitioning(false);
    }, 700);

    return () => clearTimeout(timeout);
  }, [imageUrl]);

  return (
    <div className="background-container">
      {raining && (
        <Precipitation
          intensity={conditionList[key].rainIntensity}
          isSnowing={isSnowing}
        />
      )}
      <div
        className="dynamic-background"
        style={{
          backgroundImage: `url(${currentBg})`,
          opacity: `${isTransitioning ? "0" : "1"}`,
        }}
      ></div>
      <div
        className="dynamic-background next"
        style={{ backgroundImage: `url(${nextBg})` }}
      ></div>
    </div>
  );
};

export default Background;
