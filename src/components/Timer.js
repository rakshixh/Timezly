import React, { useState, useEffect } from 'react';
import TimerCSS from '../css/Timer.module.css'
import StartSVG from '../assets/play.svg'
import StopSVG from '../assets/stop.svg'
import FlagSVG from '../assets/flag.svg'
import ResetSVG from '../assets/close.svg'

const Timer = () => {
  const [hours, setHours] = useState(0);
  const [minutes, setMinutes] = useState(0);
  const [seconds, setSeconds] = useState(0);
  const [milliseconds, setMilliseconds] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const [recordedTimes, setRecordedTimes] = useState([]);

  const startTimer = () => {
    setIsRunning(true);
  };

  const stopTimer = () => {
    setIsRunning(false);
  };

  const recordTime = () => {
    const currentTime = `${hours.toString().padStart(2, '0')}h ${minutes.toString().padStart(2, '0')}m ${seconds.toString().padStart(2, '0')}s ${milliseconds.toString().padStart(2, '0')}ms`;
    setRecordedTimes([...recordedTimes, currentTime]);
  };

  const handleHourChange = (e) => {
    const value = parseInt(e.target.value);
    if (!isNaN(value) && value >= 0) {
      setHours(value);
    }
  };
  
  const handleMinuteChange = (e) => {
    const value = parseInt(e.target.value);
    if (!isNaN(value) && value >= 0 && value < 60) {
      setMinutes(value);
    }
  };

  const resetTimer = () => {
    setHours(0);
    setMinutes(0);
    setSeconds(0);
    setMilliseconds(0);
  };

  const clearFlagData = () => {
    setRecordedTimes([]);
  };
  

  useEffect(() => {
    let interval;
    if (isRunning) {
      interval = setInterval(() => {
        if (hours === 0 && minutes === 0 && seconds === 0 && milliseconds === 0) {
          clearInterval(interval);
          setIsRunning(false);
        } else {
          if (milliseconds > 0) {
            setMilliseconds(milliseconds - 1);
          } else {
            if (seconds > 0) {
              setSeconds(seconds - 1);
              setMilliseconds(99);
            } else {
              if (minutes > 0) {
                setMinutes(minutes - 1);
                setSeconds(59);
                setMilliseconds(99);
              } else {
                if (hours > 0) {
                  setHours(hours - 1);
                  setMinutes(59);
                  setSeconds(59);
                  setMilliseconds(99);
                }
              }
            }
          }
        }
      }, 10); // 10ms for better accuracy
    }
    return () => clearInterval(interval);
  }, [isRunning, hours, minutes, seconds, milliseconds]);

  return (
    <div className={TimerCSS.mainDiv}>
      <div className={TimerCSS.content}>
        <div className={TimerCSS.TimeContainer}>
          <h1 className={TimerCSS.Time}>
            {`${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}:${milliseconds.toString().padStart(2, '0')}`}
          </h1>
        </div>

        <div className={TimerCSS.inputsbuttons}>
          <div className={TimerCSS.inputsDiv}>
            <div className={TimerCSS.inputContainer}>
              <label className={TimerCSS.label} htmlFor='hourInput'>Hours</label>
              <input className={TimerCSS.input} id='hourInput' type="number" value={hours} onChange={handleHourChange}/>
            </div>
            
            <div className={TimerCSS.inputContainer}>
              <label className={TimerCSS.label} htmlFor='minuteInput'>Minutes</label>
              <input className={TimerCSS.input} id='minuteInput' type="number" value={minutes} onChange={handleMinuteChange}/>
            </div>
          </div>
          
          <div className={TimerCSS.buttonsDiv}>
            <button className={TimerCSS.startBtn} onClick={startTimer}>
              <img className={TimerCSS.startBtnImg} src={StartSVG} alt='play'/>
            </button>

            <button className={TimerCSS.stopBtn} onClick={stopTimer}>
              <img className={TimerCSS.stopBtnImg} src={StopSVG} alt='stop' />
            </button>

            <button className={TimerCSS.flagBtn} onClick={recordTime}>
              <img className={TimerCSS.flagBtnImg} src={FlagSVG} alt='flag' />
            </button>

            <button className={TimerCSS.resetBtn} onClick={resetTimer}>
              <img className={TimerCSS.resetBtnImg} src={ResetSVG} alt='reset' />
            </button>
          </div>
        </div>

        <div className={TimerCSS.flagData}>
          <ul>
            {recordedTimes.map((time, index) => (
              <li key={index}>{time}</li>
            ))}
          </ul>
        </div>

        {recordedTimes.length > 0 && (
          <div className={TimerCSS.endContainer}>
          <button className={TimerCSS.clearBtn} onClick={clearFlagData}>Clear</button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Timer;
