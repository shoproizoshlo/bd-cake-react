import { useState } from "react";
import "./App.css";

function App() {
  const [age, setAge] = useState([]);

  const generateElements = () => {
    const candles = [];
    for (let i = 0; i < age; i++) {
      candles.push(
        <div className="bd-candle" key={i}>
          <div className="candle"></div>
          <div className="fire"></div>
        </div>
      );
    }
    return candles;
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
          max="100"
          value={age}
          onChange={(e) => {
            console.log(e.target.value);
            setAge(e.target.value);
          }}
        />
      </div>
      <div className="bd-cake">
        <div className="cake circle-1"></div>
        <div className="cake circle-2"></div>
        <div className="cake circle-3"></div>
      </div>
      {generateElements()}
    </>
  );
}

export default App;
