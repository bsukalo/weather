import "./Precipitation.css";
import { useState, useEffect } from "react";

interface Precipitation {
  id: number;
  left: number;
  delay: number;
  duration: number;
  size: number;
}

interface Props {
  intensity: number;
  isSnowing: boolean;
}

const Precipitation = ({ intensity, isSnowing }: Props) => {
  const [precipitation, setPrecipitation] = useState<Precipitation[]>([]);
  useEffect(() => {
    const particles: Precipitation[] = [];
    const maxParticles = intensity * 15;
    for (let i = 0; i < maxParticles; i++) {
      particles.push({
        id: i,
        left: Math.random() * 100,
        delay: Math.random() * 2,
        duration: (isSnowing ? 3 : 0.5) + Math.random() * 2,
        size: 2 + Math.random(),
      });
    }
    setPrecipitation(particles);
  }, [intensity]);

  return (
    <div className="precipitation-container">
      {precipitation.map((drop) => (
        <div
          key={drop.id}
          className="precipitation"
          style={{
            left: `${drop.left}%`,
            width: `${isSnowing ? drop.size * 4 : drop.size}px`,
            height: `${drop.size * (isSnowing ? 2 : 15)}px`,
            animation: `fall ${drop.duration}s linear ${drop.delay}s infinite`,
            background: `${isSnowing ? "radial-gradient(circle at center, white 0, transparent 100%" : "linear-gradient(to bottom, transparent, rgba(59, 130, 246, 0.8))"}`,
          }}
        />
      ))}
    </div>
  );
};

export default Precipitation;
