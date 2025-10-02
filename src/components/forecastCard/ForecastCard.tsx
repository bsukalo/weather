import Skeleton from "../skeleton/Skeleton";
import "./ForecastCard.css";

interface Props {
  forecast_day: string;
  weather_description: string;
  min_temperature: number;
  avg_temperature: number;
  max_temperature: number;
}

const ForecastCard = ({
  forecast_day,
  weather_description,
  min_temperature,
  avg_temperature,
  max_temperature,
}: Props) => {
  return (
    <div className="forecast-card-container">
      <div className="forecast-card">
        <div className="forecast-left">
          <div className="forecast-day">{forecast_day}</div>
          {weather_description ? (
            <div className="forecast-description">{weather_description}</div>
          ) : (
            <div className="forecast-description">
              <Skeleton skeletonWidth="200px" skeletonHeight="1em" />
            </div>
          )}
        </div>
        <div className="forecast-right">
          <div className="data-grid">
            <div className="min-temperature">
              Min
              <br />
              {min_temperature ? (
                <div className="forecast-temperature">{min_temperature}°</div>
              ) : (
                <Skeleton skeletonWidth="50px" skeletonHeight="50px" />
              )}
            </div>
            <div className="avg-temperature">
              Avg
              <br />
              {avg_temperature ? (
                <div className="forecast-temperature">{avg_temperature}°</div>
              ) : (
                <Skeleton skeletonWidth="50px" skeletonHeight="50px" />
              )}
            </div>
            <div className="max-temperature">
              Max
              <br />
              {max_temperature ? (
                <div className="forecast-temperature">{max_temperature}°</div>
              ) : (
                <Skeleton skeletonWidth="50px" skeletonHeight="50px" />
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ForecastCard;
