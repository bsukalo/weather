import { useState, useEffect } from "react";
import "./Background.css";
import { conditionList } from "../../data/conditionList.tsx";
import Rainfall from "../rainfall/Rainfall.tsx";

interface Props {
  weather: string | undefined;
  time: string | undefined;
}

function dayOrNight(time: string | undefined) {
  if (time === undefined) return "day";
  else {
    const formattedTime = parseInt(time?.slice(10, 13));
    if (formattedTime > 5 && formattedTime < 19) return "day";
    else return "night";
  }
}

function formatBackground(key: string, time: string | undefined) {
  const formattedWeather = conditionList[key].icon;
  return formattedWeather + (time ? time : "day") + ".png";
}

const Background = ({ weather, time }: Props) => {
  const key = weather?.toLowerCase().replace(/ /g, "") || "clear";
  const bgImage = formatBackground(key, dayOrNight(time));
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
    setNextBg(imageURL);
    setTransitioning(true);
    setTimeout(() => {
      setCurrentBg(imageURL);
      setTransitioning(false);
    }, 700);
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
