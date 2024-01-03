const Age = ({ age, setAge, blowDetected }) => {
  return (
    <div className="input">
      <p>Enter your age</p>
      <input
        type="number"
        value={age}
        onChange={(e) => {
          console.log(e.target.value);
          setAge(e.target.value);
        }}
      />
      <div>
        {blowDetected ? (
          <p>Candles are blown out!</p>
        ) : (
          <p>Blow on the microphone to blow out the candles!</p>
        )}
      </div>
    </div>
  );
};

export default Age;
