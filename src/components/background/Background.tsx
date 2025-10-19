import { useState, useEffect } from "react";
import "./Background.css";
import { conditionList } from "../../data/conditionList.tsx"

interface Props {
  weather: string | undefined;
  time: string | undefined;
}

function dayOrNight(time: string | undefined) {
  if (time === undefined) return "day";
  else {
    const formattedTime = parseInt((time?.slice(10, 13)));
    if (formattedTime > 5 && formattedTime < 19) return "day";
    else return "night";
  }
}

function formatBackgroundImage(weather: string | undefined, time: string | undefined) {
  const key = weather?.toLowerCase().replace(/ /g, "") || "clear";
  const formattedWeather = conditionList[key];
  return formattedWeather + (time ? time : "day") + ".png";
}

const Background = ({ weather, time }: Props) => {
  const bgImage = formatBackgroundImage(weather, dayOrNight(time));
  const imageURL = new URL(`../../assets/${bgImage}`, import.meta.url).href;
  const [isTransitioning, setTransitioning] = useState(false);
  const [currentBg, setCurrentBg] = useState<String | null>(imageURL);
  const [nextBg, setNextBg] = useState<String | null>(imageURL);

  useEffect(() => {
    setNextBg(imageURL);
    setTransitioning(true);
    setTimeout(() => {
      setCurrentBg(imageURL);
      setTransitioning(false);
    }, 700)
  }, [imageURL])

  return <>
    <div
      className="dynamic-background"
      style={{ backgroundImage: `url(${currentBg})`, opacity: `${isTransitioning ? '0' : '1'}` }
      }
    >
    </div >
    <div
      className="dynamic-background next"
      style={{ backgroundImage: `url(${nextBg})` }
      }
    >
    </div >
  </>;
};

export default Background;
