import React, { useState, useEffect } from 'react';
import "./index.scss"

function App() {
  const [ timeLeft, setTimeLeft ] = useState(25 * 60);
  const [ isCounting, setIsCounting ] = useState(false);

  const getPadTime = time => time.toString().padStart(2, "0"); 

  const minutes = getPadTime(Math.floor(timeLeft / 60));
  const seconds = getPadTime(timeLeft - minutes * 60);


  useEffect(() => {
    const interval = setInterval(() => {
      isCounting &&
      setTimeLeft((timeLeft) => (timeLeft >= 1 ? timeLeft - 1 : 0));
    }, 1000);
    return () => {
      clearInterval(interval);
    }
  }, [isCounting])
 

  const handleStart = () => {
    setIsCounting(!isCounting);
  };
  const handleReset = () => {
    setTimeLeft(25 * 60);
    setIsCounting(false);
  };

  return (
    <div className="App">
      <div className='timer'>
         
      </div>
      <div className="container">
        <h1>{minutes} : {seconds}</h1>
      </div>
      <section>
        <button className="startBtn" onClick={() => handleStart()}>{ isCounting ? "Pause" :  "Start"}</button>
        <button className="stopBtn" onClick={() => handleReset()}>Stop</button>
      </section>
    </div>
  );
}

export default App;
