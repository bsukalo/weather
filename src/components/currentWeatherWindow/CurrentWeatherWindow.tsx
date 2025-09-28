import "./CurrentWeatherWindow.css";
import { useEffect, useState } from "react";
import apiClient from "../../services/api-client.ts";
import LocationWeatherData from "../locationWeatherData/LocationWeatherData.tsx";
import Skeleton from "../skeleton/Skeleton.tsx";

interface Time {
  location: {
    localtime: string;
  };
}

const CurrentWeatherWindow = () => {
  const [time, setTime] = useState<Time | null>();

  const fetchTime = () => {
    apiClient
      .get<Weather>("current.json", {
        params: {
          q: "New_York",
        },
      })
      .then((res) => {
        setTime(res.data);
      })
      .catch((err) => console.error(err));
  };

  useEffect(() => {
    fetchTime();

    const interval = setInterval(() => {
      fetchTime();
    }, 10000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="weather-window">
      <div className="location-info-container">
        <div className="location-info">
          <div className="location-name">New York</div>
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
        <LocationWeatherData />
      </div>
    </div>
  );
};

export default CurrentWeatherWindow;
