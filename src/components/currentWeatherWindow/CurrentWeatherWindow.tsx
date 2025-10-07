import "./CurrentWeatherWindow.css";
import { useCallback, useEffect, useRef, useState } from "react";
import apiClient from "../../services/api-client.ts";
import LocationWeatherData from "../locationWeatherData/LocationWeatherData.tsx";
import Skeleton from "../skeleton/Skeleton.tsx";

interface Props {
  city: string | null;
}

interface Time {
  location: {
    name: string;
    localtime: string;
    country: string;
  };
}

const CurrentWeatherWindow = ({ city }: Props) => {
  const [time, setTime] = useState<Time | null>();
  const ref = useRef<HTMLDivElement>(null);

  const fetchTime = useCallback(() => {
    apiClient
      .get<Time>("current.json", {
        params: {
          q: city,
        },
      })
      .then((res) => {
        setTime(res.data);
      })
      .catch((err) => console.error(err));
  }, [city]);

  useEffect(() => {
    fetchTime();

    // plays fade in animation every time city changes
    if (ref.current) {
      ref.current.style.animation = "none";
      void ref.current.offsetHeight;
      ref.current.style.animation = "fadeInBottomContainer 1s both";
    }

    const interval = setInterval(() => {
      fetchTime();
    }, 10000);

    return () => clearInterval(interval);
  }, [fetchTime]);

  return (
    <div className="weather-window">
      <div ref={ref} className="location-info-container">
        <div className="location-info">
          {time ? (
            <div className="city-name">
              {time?.location.name},
              <div className="country-name">{time?.location.country}</div>
            </div>
          ) : (
            <div className="city-name">
              <Skeleton skeletonWidth="200px" skeletonHeight="1em" />
              <div className="country-name">
                <Skeleton skeletonWidth="150px" skeletonHeight="1em" />
              </div>
            </div>
          )}
          {time ? (
            <div className="location-time">
              {time.location.localtime.slice(11, 16)}
            </div>
          ) : (
            <div className="location-time">
              <Skeleton skeletonWidth="100px" skeletonHeight="1em" />
            </div>
          )}
        </div>
        <LocationWeatherData city={city} />
      </div>
    </div>
  );
};

export default CurrentWeatherWindow;
