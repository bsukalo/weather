import "./App.css";
import { useState } from "react";
import MainApp from "./components/mainApp/MainApp.tsx";
import LoadingScreen from "./components/loadingScreen/LoadingScreen.tsx";

function App() {
  const [isLoaded, setLoaded] = useState(false);

  if (!isLoaded) {
    return <LoadingScreen onFinishLoading={() => setLoaded(true)} />;
  }

  return (
    <>
      <MainApp />
    </>
  );
}

export default App;
