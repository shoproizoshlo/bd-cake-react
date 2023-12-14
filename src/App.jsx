import { useState, useEffect } from "react";
import "./App.css";

function App() {
  const [age, setAge] = useState([]);
  const [elementPositions, setElementPositions] = useState([]);
  const [stream, setStream] = useState(null);
  const [isBlowing, setIsBlowing] = useState(false);
  const [hasBlownOnce, setHasBlownOnce] = useState(false);

  useEffect(() => {
    const requestMicrophone = async () => {
      try {
        const userMedia = await navigator.mediaDevices.getUserMedia({
          audio: true,
        });
        setStream(userMedia);

        const audioContext = new (window.AudioContext ||
          window.webkitAudioContext)();
        const analyser = audioContext.createAnalyser();
        const microphone = audioContext.createMediaStreamSource(userMedia);

        microphone.connect(analyser);
        analyser.connect(audioContext.destination);
        audioContext.destination.disconnect();

        analyser.fftSize = 256;
        const bufferLength = analyser.frequencyBinCount;
        const dataArray = new Uint8Array(bufferLength);

        const threshold = 1; // Пороговое значение амплитуды

        const detectBlow = () => {
          analyser.getByteFrequencyData(dataArray);
          const averageAmplitude =
            dataArray.reduce((acc, val) => acc + val, 0) / bufferLength;

          if (averageAmplitude > threshold) {
            setIsBlowing(true);
          } else {
            setIsBlowing(false);
          }

          requestAnimationFrame(detectBlow);
        };

        detectBlow();
        return () => {
          // Освобождаем ресурсы при размонтировании компонента
          if (stream) {
            stream.getTracks().forEach((track) => track.stop());
            //analyser.disconnect(); // Отключаем анализатор при размонтировании
          }
        };
      } catch (error) {
        console.error("Error accessing microphone:", error);
      }
    };

    requestMicrophone();

    return () => {
      // Освобождаем ресурсы при размонтировании компонента
      if (stream) {
        stream.getTracks().forEach((track) => track.stop());
      }
    };
  }, [stream]);

  useEffect(() => {
    setHasBlownOnce(false);
    const newPositions = Array.from(
      { length: age - elementPositions.length },
      () => ({
        x: Math.random() * 270 + 10,
        y: Math.random() * 40,
      })
    );
    setElementPositions((prevPositions) => [...prevPositions, ...newPositions]);
  }, [age, elementPositions.length]);

  useEffect(() => {
    if (isBlowing) {
      // Применяем quench только если isBlowing первый раз
      if (!hasBlownOnce) {
        setHasBlownOnce(true);
      }
    }
  }, [isBlowing, hasBlownOnce]);

  return (
    <>
      <div>
        {isBlowing ? (
          <div>
            <p>Microphone is active.</p>
          </div>
        ) : (
          <p>Access to the microphone is not granted.</p>
        )}
      </div>
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
              <div
                className={`fire ${isBlowing || hasBlownOnce ? "quench" : ""}`}
              ></div>
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
