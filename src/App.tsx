import "./App.css";
import { useState } from "react";
import MainWindow from "./components/mainWindow/MainWindow.tsx";
import LoadingScreen from "./components/loadingScreen/LoadingScreen.tsx";

function App() {
  const [isLoaded, setLoaded] = useState(false);

  if (!isLoaded) {
    return <LoadingScreen onFinishLoading={() => setLoaded(true)} />;
  }

  return (
    <>
      <MainWindow />
    </>
  );
}

export default App;
