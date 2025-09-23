import "./CurrentWeatherWindow.css";
import { useEffect, useState } from "react";
import timeApiClient from "../../services/time-api-client.ts";

interface Time {
	hour: number;
	minute: number;
}

const CurrentWeatherWindow = () => {
	const [time, setTime] = useState<Time | null>();

	const fetchTime = () => {
		timeApiClient
			.get<Time>("zone?timeZone=America/New_York")
			.then((res) => setTime(res.data))
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
			<div className="weather-data-container">
				<div className="location-data">
					<div className="location-name">New York</div>
					{time ? (
						<div className="location-time">
							{time.hour.toString().padStart(2, "0")}:
							{time.minute.toString().padStart(2, "0")}
						</div>
					) : (
						<div className="location-time">
							<div className="skeleton"></div>
						</div>
					)}
				</div>
				<div className="location-weather-data"></div>
			</div>
		</div>
	);
};

export default CurrentWeatherWindow;
