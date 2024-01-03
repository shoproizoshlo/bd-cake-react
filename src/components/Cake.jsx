const Cake = ({ elementPositions, blowDetected }) => {
  return (
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
            <div
              className={`flame ${blowDetected ? "fadeOut" : "flicker"}`}
            ></div>

            <div className="wick"></div>
            <div className={blowDetected ? "" : "drop"}></div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Cake;
