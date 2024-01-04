import { useState, useEffect } from "react";
import "./App.scss";
import Age from "./components/Age";
import Cake from "./components/Cake";

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
      <main>
        <Age age={age} setAge={setAge} blowDetected={blowDetected} />

        <Cake elementPositions={elementPositions} blowDetected={blowDetected} />
      </main>

      <footer>
        <p>
          Created by{" "}
          <a
            href="https://github.com/shoproizoshlo"
            rel="noreferer"
            target="_blank"
          >
            Sue Brechko
          </a>
          . Idea @someone
        </p>
      </footer>
    </>
  );
}

export default App;
