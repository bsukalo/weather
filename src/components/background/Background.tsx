import "./Background.css";

interface Props {
  weather: string | undefined;
}

const Background = ({ weather }: Props) => {
  let condition = (weather?.toLowerCase().replace(/ /g, "") || "clear") + "day.png";
  const imageURL = new URL(`../../assets/${condition}`, import.meta.url).href;

  return <div
    className="dynamic-background"
    style={{ backgroundImage: `url(${imageURL})` }}
  >
  </div >;
};

export default Background;
