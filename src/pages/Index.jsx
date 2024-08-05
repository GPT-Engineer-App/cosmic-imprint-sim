import React, { useState, useEffect } from 'react';
import { useSpring, animated } from '@react-spring/web';

const planets = [
  { name: 'Mercury', color: '#8C7853', orbitRadius: 10, size: 0.8, speed: 0.48, realSize: '4,879 km', orbitPeriod: '88 days' },
  { name: 'Venus', color: '#FFA500', orbitRadius: 15, size: 1.5, speed: 0.35, realSize: '12,104 km', orbitPeriod: '225 days' },
  { name: 'Earth', color: '#4169E1', orbitRadius: 20, size: 1.6, speed: 0.29, realSize: '12,742 km', orbitPeriod: '365 days' },
  { name: 'Mars', color: '#FF4500', orbitRadius: 25, size: 1.2, speed: 0.24, realSize: '6,779 km', orbitPeriod: '687 days' },
  { name: 'Jupiter', color: '#DEB887', orbitRadius: 35, size: 3.5, speed: 0.13, realSize: '139,820 km', orbitPeriod: '12 years' },
  { name: 'Saturn', color: '#F4A460', orbitRadius: 45, size: 3, speed: 0.09, realSize: '116,460 km', orbitPeriod: '29 years' },
  { name: 'Uranus', color: '#87CEEB', orbitRadius: 55, size: 2.5, speed: 0.06, realSize: '50,724 km', orbitPeriod: '84 years' },
  { name: 'Neptune', color: '#4682B4', orbitRadius: 65, size: 2.4, speed: 0.05, realSize: '49,244 km', orbitPeriod: '165 years' },
];

const Planet = ({ planet, time }) => {
  const { x, y } = useSpring({
    to: {
      x: Math.cos(time * planet.speed) * planet.orbitRadius,
      y: Math.sin(time * planet.speed) * planet.orbitRadius,
    },
    config: { duration: 0 },
  });

  return (
    <animated.div
      className="absolute rounded-full flex items-center justify-center text-xs font-bold"
      style={{
        width: `${planet.size}rem`,
        height: `${planet.size}rem`,
        backgroundColor: planet.color,
        transform: x.to((x) => `translate(${x}rem, ${y.get()}rem)`),
      }}
    >
      <div className="absolute w-40 bg-gray-900 bg-opacity-75 p-2 rounded-lg text-white -mt-24 hidden group-hover:block">
        <p className="font-bold">{planet.name}</p>
        <p>Size: {planet.realSize}</p>
        <p>Orbit: {planet.orbitPeriod}</p>
      </div>
    </animated.div>
  );
};

const Index = () => {
  const [time, setTime] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setTime((prevTime) => prevTime + 0.01);
    }, 16);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="w-screen h-screen bg-black flex items-center justify-center overflow-hidden">
      <div className="relative w-[80rem] h-[80rem]">
        {planets.map((planet) => (
          <React.Fragment key={planet.name}>
            <div
              className="absolute rounded-full border border-gray-800"
              style={{
                width: `${planet.orbitRadius * 2}rem`,
                height: `${planet.orbitRadius * 2}rem`,
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
              }}
            />
            <Planet planet={planet} time={time} />
          </React.Fragment>
        ))}
        <div className="absolute top-1/2 left-1/2 w-8 h-8 bg-yellow-500 rounded-full -translate-x-1/2 -translate-y-1/2" />
      </div>
    </div>
  );
};

export default Index;
