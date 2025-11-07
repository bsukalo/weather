import "./LoadingScreen.css";
import { useEffect } from "react";
import { preloadImages, imageUrls } from "../../utils/imagePreloader";
import { DotLoader } from "react-spinners";

interface Props {
  onFinishLoading: () => void;
}

const LoadingScreen = ({ onFinishLoading }: Props) => {
  useEffect(() => {
    let cancelled = false;

    preloadImages(imageUrls);

    return () => {
      cancelled = true;
    };
  }, [onFinishLoading]);

  return (
    <div className="loading-screen">
      <DotLoader color={"#ffffff"} />
      loading, please wait...
    </div>
  );
};

export default LoadingScreen;
