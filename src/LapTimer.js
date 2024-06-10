import React, { useState, useEffect, useRef } from 'react';
import './LapTimer.css'; // Create this CSS file to style the app

const LapTimer = () => {
  const [time, setTime] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const [laps, setLaps] = useState([]);
  const intervalRef = useRef(null);

  useEffect(() => {
    if (isRunning) {
      intervalRef.current = setInterval(() => {
        setTime(prevTime => prevTime + 10);
      }, 10);
    } else {
      clearInterval(intervalRef.current);
    }
    return () => clearInterval(intervalRef.current);
  }, [isRunning]);

  const startTimer = () => setIsRunning(true);

  const stopTimer = () => setIsRunning(false);

  const resetTimer = () => {
    setIsRunning(false);
    setTime(0);
    setLaps([]);
  };

  const recordLap = () => {
    setLaps([...laps, time]);
  };

  const formatTime = (time) => {
    const centiseconds = (`0${(time / 10) % 100}`).slice(-2);
    const seconds = (`0${(time / 1000) % 60}`).slice(-2);
    const minutes = (`0${Math.floor(time / 60000)}`).slice(-2);
    return `${minutes}:${seconds}.${centiseconds}`;
  };

  return (
    <div className="lap-timer">
      <h1>Lap Timer</h1>
      <div className="timer-display">{formatTime(time)}</div>
      <div className="controls">
        {isRunning ? (
          <button onClick={stopTimer}>Stop</button>
        ) : (
          <button onClick={startTimer}>Start</button>
        )}
        <button onClick={recordLap} disabled={!isRunning}>Lap</button>
        <button onClick={resetTimer}>Reset</button>
      </div>
      <div className="laps">
        <h2>Laps</h2>
        {laps.map((lap, index) => (
          <div key={index} className="lap">
            <span>Lap {index + 1}</span>
            <span>{formatTime(lap)}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default LapTimer;
