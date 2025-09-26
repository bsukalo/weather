import { useEffect, useState } from "react";
import apiClient from "../../services/api-client";
import './LocationWeatherData.css';

interface Weather {
	current: {
		temp_c: number;
		condition: {
			text: string;
		};
	};
}

const LocationWeatherData = () => {
	const [weather, setWeather] = useState<Weather | null>(null);

	const fetchWeather = () => {
		apiClient
			.get<Weather>("current.json", {
				params: {
					q: "New_York",
				},
			})
			.then((res) => {
				setWeather(res.data);
			})
			.catch((err) => console.error(err));
	};

	useEffect(() => {
		fetchWeather();
	}, []);

	return (
		<div className="weather-data-container">
			{weather ? (
				<div className="weather-data">
					<p className="temperature">{weather.current.temp_c.toString()}°</p>
					<p className="weather-description">{weather.current.condition.text.toString()}</p>
				</div>
			) : (
				<div>Loading...</div>
			)}
		</div>
	);
};

export default LocationWeatherData;
