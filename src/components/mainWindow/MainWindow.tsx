import CurrentWeatherWindow from "../currentWeatherWindow/CurrentWeatherWindow";
import "./MainWindow.css";
import SearchBar from "../searchBar/SearchBar.tsx";
import { useState } from "react";

const MainWindow = () => {
  const [city, setCity] = useState("new_york");

  return (
    <div className="upper-layer-container">
      <SearchBar onSearch={setCity} />
      <div className="upper-layer">
        <CurrentWeatherWindow city={city} />
      </div>
    </div>
  );
};

export default MainWindow;
