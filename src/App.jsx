import { useState, useEffect } from "react";
import Candles from "./components/Candles";
import "./App.css";
import "./App.scss";

function App() {
  const [age, setAge] = useState([]);
  const [elementPositions, setElementPositions] = useState([]);

  useEffect(() => {
    const newPositions = Array.from(
      { length: age - elementPositions.length },
      () => ({
        x: Math.random() * 230 + 10,
        y: Math.random() * 20,
      })
    );

    setElementPositions((prevPositions) => [...prevPositions, ...newPositions]);
  }, [age, elementPositions.length]);

  return (
    <>
      <input
        type="number"
        value={age}
        onChange={(e) => {
          console.log(e.target.value);
          setAge(e.target.value);
        }}
      />

      <div className="cake">
        <div className="plate"></div>
        <div className="layer layer-bottom"></div>
        <div className="layer layer-middle"></div>
        <div className="layer layer-top"></div>
        <div className="icing"></div>
        <div className="drip drip1"></div>
        <div className="drip drip2"></div>
        <div className="drip drip3"></div>
        <div className="bd-candles">
          {elementPositions.map((position, i) => (
            <div
              className="candle"
              style={{
                position: "absolute",
                left: `${position.x}px`,
                top: `${position.y}px`,
              }}
              key={i}
            >
              <div className="flame"></div>
              <div className="drop"></div>
            </div>
          ))}
        </div>
      </div>

      <Candles />
    </>
  );
}

export default App;
