import { useState, useEffect } from "react";
import "./Background.css";

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

const Background = ({ weather, time }: Props) => {
  const locationTime = time;
  let condition = (weather?.toLowerCase().replace(/ /g, "") || "clear") + dayOrNight(locationTime) + ".png";
  const imageURL = new URL(`../../assets/${condition}`, import.meta.url).href;
  const [isTransitioning, setTransitioning] = useState(false);
  const [currentBg, setCurrentBg] = useState<String | null>(imageURL);
  const [nextBg, setNextBg] = useState<String | null>(imageURL);

  console.log(currentBg);

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
