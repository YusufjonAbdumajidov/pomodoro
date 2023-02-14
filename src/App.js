import React, { useState, useEffect } from 'react';
import "./index.scss"

function App() {
  const [ times, setTimes ] = useState(25);
  const [ timeLeft, setTimeLeft ] = useState(times * 60);
  const [ isCounting, setIsCounting ] = useState(false);

  const getPadTime = time => time.toString().padStart(2, "0"); 

  let minutes = getPadTime(Math.floor(timeLeft / 60));
  let seconds = getPadTime(timeLeft - minutes * 60);

  useEffect(() => {
    const interval = setInterval(() => {
      isCounting &&
      setTimeLeft((timeLeft) => (timeLeft >= 1 ? timeLeft - 1 : 0));
    }, 1000);
    return () => {
      clearInterval(interval);
    }
  }, [isCounting]);

  useEffect(() => {
    setTimeLeft(() => times * 60);
  }, [times])
 
  const handleStart = () => {
    setIsCounting(!isCounting);
  };
  const handleReset = () => {
    setTimeLeft(times * 60);
    setIsCounting(false);
  };

  const changeTime = (e) => {
    e.preventDefault();
    setTimes(() => e.target.value);
    // setTimeLeft(() => times * 60);
  }
  
  
  return (
    <div className="App">
        <form action="#" className='timer'>
          <select  onChange={(e) => changeTime(e)}>
            <option value={25}>25 min</option>
            <option value={35}>35 min</option>
            <option value={45}>45 min</option>
            <option value={60}>60 min</option>
          </select>
        </form>
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
