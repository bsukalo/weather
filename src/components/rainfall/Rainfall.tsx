import { useState, useEffect } from "react";
import "./Rainfall.css"

interface Raindrop {
  id: number,
  left: number,
  delay: number,
  duration: number,
  size: number,
}

interface Props {
  intensity: number,
}

const Rainfall = ({ intensity }: Props) => {
  const [raindrops, setRaindrops] = useState<Raindrop[]>([]);
  useEffect(() => {
    const drops: Raindrop[] = [];
    const maxDrops = intensity * 25;
    for (let i = 0; i < maxDrops; i++) {
      drops.push({
        id: i,
        left: Math.random() * 100,
        delay: Math.random() * 2,
        duration: 0.5 + Math.random() * 2,
        size: 2 + Math.random(),
      });
    }
    setRaindrops(drops);
  }, [intensity]);

  return (
    <div className="rain-container">
      {raindrops.map((drop) => (
        <div
          key={drop.id}
          className="raindrops"
          style={{
            left: `${drop.left}%`,
            width: `${drop.size}px`,
            height: `${drop.size * 15}px`,
            animation: `fall ${drop.duration}s linear ${drop.delay}s infinite`,
            background: 'linear-gradient(to bottom, transparent, rgba(59, 130, 246, 0.8))',
          }}
        />
      ))}
    </div>
  )
}

export default Rainfall
