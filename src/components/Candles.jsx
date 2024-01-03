import React, { useState, useEffect } from "react";

const Candles = () => {
  const [blowDetected, setBlowDetected] = useState(false);
  let audioContext;
  let analyser;
  let microphone;

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
    <div>
      {blowDetected ? (
        <p>Candles are blown out!</p>
      ) : (
        <p>Blow on the microphone to blow out the candles!</p>
      )}
      {/* Дополнительные элементы свечей */}
    </div>
  );
};

export default Candles;
