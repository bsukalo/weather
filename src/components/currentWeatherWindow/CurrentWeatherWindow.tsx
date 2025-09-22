import "./CurrentWeatherWindow.css";

const CurrentWeatherWindow = () => {
	return (
		<div className="weather-window">
			<div className="weather-data-container">
        <div className="location-name">New York</div>
        <div className="location-weather-data"></div>
      </div>
		</div>
	);
};

export default CurrentWeatherWindow;
