import "./ForecastCard.css";

interface Props {
  forecast_day: string;
  weather_description: string;
  forecast_icon: string;
  min_temperature: number;
  avg_temperature: number;
  max_temperature: number;
  delay: number;
}

const ForecastCard = ({
  forecast_day,
  weather_description,
  forecast_icon,
  min_temperature,
  avg_temperature,
  max_temperature,
  delay,
}: Props) => {
  return (
    <div
      className="forecast-card-container"
      style={{ animationDelay: `${delay}s` }}
    >
      <div className="forecast-card">
        <div className="forecast-left-container">
          <div className="forecast-day">{forecast_day}</div>
          <div className="forecast-left">
            <div className="forecast-description">{weather_description}</div>
            <img className="forecast-icon" src={forecast_icon}></img>
          </div>
        </div>
        <div className="forecast-right-container">
          <div className="forecast-right">
            <div className="min-temperature">
              Min
              <br />
              <div className="forecast-temperature">
                {min_temperature.toFixed(1)}°
              </div>
            </div>
            <div className="avg-temperature">
              Avg
              <br />
              <div className="forecast-temperature">
                {avg_temperature.toFixed(1)}°
              </div>
            </div>
            <div className="max-temperature">
              Max
              <br />
              <div className="forecast-temperature">
                {max_temperature.toFixed(1)}°
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ForecastCard;
