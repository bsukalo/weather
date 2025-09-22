import CurrentWeatherWindow from "../currentWeatherWindow/CurrentWeatherWindow";
import "./MainWindow.css";

const MainWindow = () => {
	return (
		<div className="upper-layer-container">
			<div className="upper-layer">
				<CurrentWeatherWindow />
			</div>
		</div>
	);
};

export default MainWindow;
