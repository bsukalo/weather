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
  const [precipitation, setPrecipitation] = useState(false);
  const [snowing, setSnowing] = useState(false);

  useEffect(() => {
    if (conditionList[key].precipitationIntensity > 0) setPrecipitation(true);
    else setPrecipitation(false);

    if (conditionList[key].typeOfPrecipitation === "rain") {
      setSnowing(false);
      setPrecipitation(false);
      const timeout = setTimeout(() => {
        setPrecipitation(true);
      }, 200);
      return () => clearTimeout(timeout);
    } else if (conditionList[key].typeOfPrecipitation === "snow") {
      setSnowing(true);
      setPrecipitation(false);
      const timeout = setTimeout(() => {
        setPrecipitation(true);
      }, 200);
      return () => clearTimeout(timeout);
    }
  }, [key]);

  useEffect(() => {
    let metaThemeColor = document.querySelector('meta[name="theme-color"]');
    let metaSafariThemeColor = document.querySelector(
      'meta[name="apple-mobile-web-app-status-bar-style"]',
    );

    if (!metaThemeColor) {
      metaThemeColor = document.createElement("meta");
      metaThemeColor.setAttribute("name", "theme-color");
      document.head.appendChild(metaThemeColor);
    }

    if (!metaSafariThemeColor) {
      metaSafariThemeColor = document.createElement("meta");
      metaSafariThemeColor.setAttribute(
        "name",
        "apple-mobile-web-app-status-bar-style",
      );
      document.head.appendChild(metaSafariThemeColor);
    }

    const bgColor =
      (conditionList[key].darkMode === false &&
        (conditionList[key].icon !== "overcast" || "foggy")) ||
      is_day === 0
        ? conditionList[key].nighttimeTheme
        : conditionList[key].daytimeTheme;

    metaThemeColor.setAttribute("content", bgColor);
    metaSafariThemeColor.setAttribute("content", "black-translucent");

    document.body.style.setProperty("background-color", bgColor, "important");
    document.documentElement.style.setProperty(
      "background-color",
      bgColor,
      "important",
    );

    if (conditionList[key].darkMode === false || is_day === 0) {
      onThemeChange("light");
    } else {
      onThemeChange("dark");
    }
  }, [key, is_day]);

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
      {precipitation && (
        <Precipitation
          intensity={conditionList[key].precipitationIntensity}
          isSnowing={snowing}
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
