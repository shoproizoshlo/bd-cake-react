import Candle from "./Candle";
import "./Cake.scss";

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

      <Candle elementPositions={elementPositions} blowDetected={blowDetected} />
    </div>
  );
};

export default Cake;
