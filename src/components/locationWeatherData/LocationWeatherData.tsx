import { useEffect, useState } from "react";
import weatherApiClient from "../../services/weather-api-client";

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
		weatherApiClient
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
		<>
			{weather ? (
				<div>
					<p>{weather.current.temp_c.toString()}</p>
					<p>{weather.current.condition.text.toString()}</p>
				</div>
			) : (
				<div>Loading...</div>
			)}
		</>
	);
};

export default LocationWeatherData;
