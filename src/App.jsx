import { useState, useEffect } from "react";
import "./App.css";

function App() {
  const [age, setAge] = useState([]);
  const [elementPositions, setElementPositions] = useState([]);
  const [stream, setStream] = useState(null);
  const [averageAmplitude, setAverageAmplitude] = useState(0);
  const [hasBlown, setHasBlown] = useState(false);

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

        analyser.fftSize = 64;
        const bufferLength = analyser.frequencyBinCount;
        const dataArray = new Uint8Array(bufferLength);

        const threshold = 10; // Пороговое значение амплитуды

        const detectBlow = () => {
          analyser.getByteFrequencyData(dataArray);
          const amplitude =
            dataArray.reduce((acc, val) => acc + val, 0) / bufferLength;
          setAverageAmplitude(amplitude);

          requestAnimationFrame(detectBlow);
        };

        detectBlow();
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
    if (averageAmplitude > 1) {
      // Применяем quench только если isBlowing первый раз
      if (!hasBlown) {
        setHasBlown(true);
      }
    }
  }, [averageAmplitude, hasBlown]);

  return (
    <>
      <div>
        {averageAmplitude > 1 ? (
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
                className="fire"
                style={{
                  opacity:
                    averageAmplitude > 1
                      ? Math.max(0.1, (i / elementPositions.length) * 0.9)
                      : 1,
                }}
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
