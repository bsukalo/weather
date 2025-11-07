import "./LoadingScreen.css";
import { useEffect } from "react";
import { preloadImages, imageUrls } from "../../utils/imagePreloader.ts";
import { DotLoader } from "react-spinners";

interface Props {
  onFinishLoading: () => void;
}

const LoadingScreen = ({ onFinishLoading }: Props) => {
  useEffect(() => {
    const loadImages = async () => {
      try {
        await preloadImages(imageUrls);
        onFinishLoading();
      } catch (error) {
        console.log(error);
        onFinishLoading();
      }
    };

    loadImages();
  }, [onFinishLoading]);

  return (
    <div className="loading-screen">
      <DotLoader color={"#ffffff"} />
      loading, please wait...
    </div>
  );
};

export default LoadingScreen;
