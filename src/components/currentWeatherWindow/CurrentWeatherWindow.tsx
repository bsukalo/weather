import "./CurrentWeatherWindow.css";
import { useCallback, useEffect, useState } from "react";
import apiClient from "../../services/api-client.ts";
import LocationWeatherData from "../locationWeatherData/LocationWeatherData.tsx";
import Skeleton from "../skeleton/Skeleton.tsx";

interface Props {
	city: string | null;
}

interface Time {
	location: {
		name: string;
		localtime: string;
		country: string;
	};
}

const CurrentWeatherWindow = ({ city }: Props) => {
	const [time, setTime] = useState<Time | null>();

	const fetchTime = useCallback(() => {
		apiClient
			.get<Time>("current.json", {
				params: {
					q: city,
				},
			})
			.then((res) => {
				setTime(res.data);
			})
			.catch((err) => console.error(err));
	}, [city]);

	useEffect(() => {
		fetchTime();

		const interval = setInterval(() => {
			fetchTime();
		}, 10000);

		return () => clearInterval(interval);
	}, [fetchTime]);

	return (
		<div className="weather-window">
			<div className="location-info-container">
				<div className="location-info">
					<div className="city-name">{time?.location.name},
						<div className="country-name">{time?.location.country}</div>
					</div>
					{time ? (
						<div className="location-time">
							{time.location.localtime.slice(11, 16)}
						</div>
					) : (
						<div className="location-time">
							<Skeleton
								skeletonWidth="100px"
								skeletonHeight="1em"
							/>
						</div>
					)}
				</div>
				<LocationWeatherData city={city} />
			</div>
		</div>
	);
};

export default CurrentWeatherWindow;
