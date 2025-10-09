import "./LocationWeatherData.css";
import Skeleton from "../skeleton/Skeleton.tsx";

interface Props {
  city: string | null;
  weather: Weather | undefined;
}

interface Weather {
  temp_c: number;
  condition: {
    text: string;
    icon: string;
  };
}

const LocationWeatherData = ({ weather }: Props) => {
  return (
    <div className="weather-data-container">
      {weather ? (
        <div className="weather-data">
          <p className="temperature"> {weather.temp_c.toString()}°</p>
          <img
            className="weather-icon"
            src={weather.condition.icon}
          ></img>
          <p className="weather-description">
            {weather.condition.text.toString()}
          </p>
        </div>
      ) : (
        <div className="weather-data">
          <div className="temperature">
            <Skeleton
              skeletonWidth="150px"
              skeletonHeight="50px"
              skeletonMargin="25px"
            />
          </div>
          <div className="weather-description">
            <Skeleton skeletonWidth="150px" skeletonHeight="1em" />
          </div>
        </div>
      )}
    </div>
  );
};

export default LocationWeatherData;
