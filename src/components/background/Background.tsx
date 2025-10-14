import "./Background.css";

interface Props {
  weather: string | undefined;
  time: string | undefined;
}

function dayOrNight(time: string | undefined) {
  if (time === undefined) return "day";
  else {
    const formattedTime = parseInt((time?.slice(10, 13)));
    if (formattedTime > 5 && formattedTime < 19) return "day";
    else return "night";
  }
}

const Background = ({ weather, time }: Props) => {
  const locationTime = time;
  let condition = (weather?.toLowerCase().replace(/ /g, "") || "clear") + dayOrNight(locationTime) + ".png";
  const imageURL = new URL(`../../assets/${condition}`, import.meta.url).href;

  return <div
    className="dynamic-background"
    style={{ backgroundImage: `url(${imageURL})` }}
  >
  </div >;
};

export default Background;
