import { useState, useEffect } from "react";
import "./App.css";

function App() {
  const [age, setAge] = useState([]);
  const [elementPositions, setElementPositions] = useState([]);

  useEffect(() => {
    const positions = Array.from({ length: age }, () => ({
      x: Math.random() * (window.innerWidth - 50), // 50 - ширина элемента
      y: Math.random() * (window.innerHeight - 50), // 50 - высота элемента
    }));

    setElementPositions(positions);
  }, [age]);

  const generateElements = () => {
    return elementPositions.map((position, i) => (
      <div
        className="bd-candle"
        style={{ left: `${position.x}px`, top: `${position.y}px` }}
        key={i}
      >
        <div className="candle"></div>
        <div className="fire"></div>
      </div>
    ));
  };

  // bd-candle:
  // if age >=1
  // display: flex;
  // for each 1 year display 1 bd-candle
  // else
  // display none

  // if blow
  // fire display: none;
  // <p>candles left</p>
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
        <div className="bd-candles">{generateElements()}</div>
        <div className="cake circle-1"></div>
        <div className="cake circle-2"></div>
        <div className="cake circle-3"></div>
      </div>
    </>
  );
}

export default App;
