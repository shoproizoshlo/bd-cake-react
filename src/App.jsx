import { useState, useEffect } from "react";

import "./App.css";
import "./App.scss";

function App() {
  const [age, setAge] = useState([]);
  const [elementPositions, setElementPositions] = useState([]);
  const [blowDetected, setBlowDetected] = useState(false);
  let audioContext;
  let analyser;
  let microphone;

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

  useEffect(() => {
    const handleBlow = () => {
      setBlowDetected(true);

      // Проверяем, подключен ли микрофон к аудиоанализатору
      if (microphone && analyser && audioContext.state === "running") {
        // Останавливаем работу аудиоанализатора при обнаружении дуновения
        audioContext.suspend();
      }
    };

    const initializeMicrophone = async () => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({
          audio: true,
        });
        audioContext = new (window.AudioContext || window.webkitAudioContext)();
        analyser = audioContext.createAnalyser();
        microphone = audioContext.createMediaStreamSource(stream);

        microphone.connect(analyser);

        analyser.fftSize = 256;
        const bufferLength = analyser.frequencyBinCount;
        const dataArray = new Uint8Array(bufferLength);

        const detectBlow = () => {
          analyser.getByteFrequencyData(dataArray);

          // Выполните здесь логику для определения дуновения на основе dataArray

          // Пример: проверка среднего значения частоты
          const average =
            dataArray.reduce((acc, val) => acc + val, 0) / bufferLength;

          if (average > 100 && !blowDetected) {
            handleBlow();
          }

          requestAnimationFrame(detectBlow);
        };

        detectBlow();
      } catch (error) {
        console.error("Error accessing microphone:", error);
      }
    };

    initializeMicrophone();

    // Очищаем ресурсы при размонтировании компонента
    return () => {
      if (audioContext) {
        audioContext.close();
      }
    };
  }, [blowDetected]);

  return (
    <>
      <div>
        <p>Enter your age</p>
        <input
          type="number"
          value={age}
          onChange={(e) => {
            console.log(e.target.value);
            setAge(e.target.value);
          }}
        />
      </div>

      <div>
        {blowDetected ? (
          <p>Candles are blown out!</p>
        ) : (
          <p>Blow on the microphone to blow out the candles!</p>
        )}
        {/* Дополнительные элементы свечей */}
      </div>

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

              <div className="drop"></div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

export default App;
