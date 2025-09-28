import CurrentWeatherWindow from "../currentWeatherWindow/CurrentWeatherWindow";
import "./MainWindow.css";
import SearchBar from "../searchBar/SearchBar.tsx";

const MainWindow = () => {
  return (
    <div className="upper-layer-container">
      <SearchBar />
      <div className="upper-layer">
        <CurrentWeatherWindow />
      </div>
    </div>
  );
};

export default MainWindow;
