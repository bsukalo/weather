import { useState, useEffect } from "react";
import "./Background.css";
import { conditionList } from "../../data/conditionList.tsx";
import Rainfall from "../rainfall/Rainfall.tsx";

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
  const imageURL = new URL(`../../assets/${bgImage}`, import.meta.url).href;
  const [isTransitioning, setTransitioning] = useState(false);
  const [currentBg, setCurrentBg] = useState<String | null>(imageURL);
  const [nextBg, setNextBg] = useState<String | null>(imageURL);
  const [raining, setRaining] = useState(false);

  useEffect(() => {
    if (conditionList[key].rainIntensity > 0) setRaining(true);
    else setRaining(false);
  }, [key]);

  useEffect(() => {
    if (conditionList[key].darkMode === false || is_day === 0)
      onThemeChange("light");
    else onThemeChange("dark");
  }, [key, is_day]);

  useEffect(() => {
    setNextBg(imageURL);
    setTransitioning(true);
    const timeout = setTimeout(() => {
      setCurrentBg(imageURL);
      setTransitioning(false);
    }, 700);

    return () => clearTimeout(timeout);
  }, [imageURL]);

  return (
    <div className="background-container">
      {raining && <Rainfall intensity={conditionList[key].rainIntensity} />}
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
