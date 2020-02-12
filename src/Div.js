import React, { createRef, useState } from "react";
import { useSpring, animated } from "react-spring";

export default function Div() {
  const ref = createRef(null);
  const [xy, setXy] = useState({ coordinates: { x: 0, y: 0 } });

  const handleMouseMove = e => {
    function scaleTo(a) {
      if (a > 100) {
        return (a / 10 - 2) / 10;
      } else {
        return 0 - (a / 10 + 8) / 10;
      }
    }

    let rect = ref.current.getBoundingClientRect();
    let X = scaleTo(e.clientX - rect.left); //x position within the element.
    let Y = scaleTo(e.clientY - rect.top);
    console.log(X, Y);
    setXy({ coordinates: { x: X, y: Y } });
  };

  const trans = (x, y) =>
    `perspective(800px) rotateX(${-y}deg) rotateY(${x}deg) scale(1)`;

  const [props, set] = useSpring(() => ({
    xy: [0, 0],
    config: { mass: 10, tension: 210, friction: 20 }
  }));

  return (
    <div
      className="container"
      style={{
        height: 200,
        width: 200
      }}
      onMouseMove={() => set({ xy: [xy.coordinates.x, xy.coordinates.y] })}
      onMouseLeave={() => set({ xy: [0, 0] })}
    >
      <animated.div
        ref={ref}
        style={{
          backgroundColor: "coral",
          height: "100%",
          width: "100%",
          boxShadow: "14px 14px 0 4px darkBlue",
          display: "grid",
          transform: props.xy.interpolate(trans)
        }}
        onMouseMove={handleMouseMove}
      >
        <div style={{ margin: "auto" }}>This be div</div>
      </animated.div>
    </div>
  );
}
