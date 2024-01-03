import "./Candle.scss";

const Candle = ({ elementPositions, blowDetected }) => {
  return (
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
          <div
            className={`flame ${blowDetected ? "fadeOut" : "flicker"}`}
          ></div>

          <div className="wick"></div>
          <div className={blowDetected ? "" : "drop"}></div>
        </div>
      ))}
    </div>
  );
};

export default Candle;
