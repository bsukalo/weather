import "./CurrentWeatherWindow.css";
import LocationWeatherData from "../locationWeatherData/LocationWeatherData.tsx";
import Skeleton from "../skeleton/Skeleton.tsx";

interface Props {
  city: string | null;
  time: Time | undefined;
  weather: Weather | undefined;
}

interface Time {
  name: string;
  localtime: string;
  country: string;
}

interface Weather {
  temp_c: number;
  condition: {
    text: string;
    icon: string;
  };
}

const CurrentWeatherWindow = ({ city, time, weather }: Props) => {
  return (
    <>
      <div className="location-info">
        {time ? (
          <div className="city-name">
            {time.name}
            <div className="country-name">{time.country}</div>
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
          <div className="location-time">{time.localtime.slice(11, 16)}</div>
        ) : (
          <div className="location-time">
            <Skeleton skeletonWidth="100px" skeletonHeight="1em" />
          </div>
        )}
      </div>
      <LocationWeatherData city={city} weather={weather} />
    </>
  );
};

export default CurrentWeatherWindow;
