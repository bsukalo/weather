import "../forecastCard/ForecastCard.css";
import Skeleton from "../skeleton/Skeleton";

const ForecastCardSkeleton = () => {
  return (
    <div className="forecast-card-container">
      <div className="forecast-card">
        <div className="forecast-left-container">
          <div className="forecast-day"><Skeleton skeletonWidth="150px" skeletonHeight="1.3em" /></div>
          <div className="forecast-left">
            <div className="forecast-description">
              <Skeleton skeletonWidth="100px" skeletonHeight="1.5em" />
            </div>
          </div>
        </div>
        <div className="forecast-right-container">
          <div className="forecast-right">
            <div className="min-temperature">
              Min
              <br />
              <div className="forecast-temperature"><Skeleton skeletonWidth="50px" skeletonHeight="1.5em" /></div>
            </div>
            <div className="avg-temperature">
              Avg
              <br />
              <div className="forecast-temperature"><Skeleton skeletonWidth="50px" skeletonHeight="1.5em" /></div>
            </div>
            <div className="max-temperature">
              Max
              <br />
              <div className="forecast-temperature"><Skeleton skeletonWidth="50px" skeletonHeight="1.5em" /></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ForecastCardSkeleton
