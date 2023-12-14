import { useState, useEffect } from "react";
import "./App.css";

function App() {
  const [age, setAge] = useState([]);
  const [elementPositions, setElementPositions] = useState([]);

  useEffect(() => {
    const positions = Array.from({ length: age }, () => ({
      x: Math.random() * 270 + 10,
      y: Math.random() * 40,
    }));

    setElementPositions(positions);
  }, [age]);

  return (
    <>
      <div className="age">
        <input
          type="number"
          placeholder="Enter your age"
          min="1"
          value={age}
          onChange={(e) => {
            console.log(e.target.value);
            setAge(e.target.value);
          }}
        />
      </div>
      <div className="bd-cake">
        <div className="bd-candles">
          {elementPositions.map((position, i) => (
            <div
              className="bd-candle"
              style={{
                position: "absolute",
                left: `${position.x}px`,
                top: `${position.y}px`,
              }}
              key={i}
            >
              <div className="candle"></div>
              <div className="fire"></div>
            </div>
          ))}
        </div>
        <div className="cake circle-1"></div>
        <div className="cake circle-2"></div>
        <div className="cake circle-3"></div>
      </div>
    </>
  );
}

export default App;
