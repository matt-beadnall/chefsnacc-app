import "./CountdownTimer.css";
import React, { useState, useEffect } from "react";
import Clock from "./Clock";

export default function CountdownTimer({ time }) {
  //timer states:
  var status = { STOP: "STOP", START: "START", PAUSE: "PAUSE" };

  const [timerDays, setTimerDays] = useState(0);
  const [timerHours, setTimerHours] = useState(0);
  const [timerMinutes, setTimerMinutes] = useState(time);
  const [timerSeconds, setTimerSeconds] = useState(0);
  const [state, setButtonText] = useState("START");
  const [distance, setDistance] = useState(time * 60 * 1000)

  // let distance = time * 60 * 1000;

  useEffect(() => {
    
  }, [])

  const startTimer = () => {
    var interval = setInterval(() => {
      setButtonText(status.STOP);
    
      setDistance(distance - 1000);

      const days = Math.floor(distance / (24 * 60 * 60 * 1000));
      const hours = Math.floor(
        (distance % (24 * 60 * 60 * 1000)) / (1000 * 60 * 60)
      );
      const minutes = Math.floor((distance % (60 * 60 * 1000)) / (1000 * 60));
      const seconds = Math.floor((distance % (60 * 1000)) / 1000);
      // console.log(distance);

      if (distance < 0) {
        // Stop Timer
        clearInterval(interval);
        // clearInterval(interval.current);
      } else {
        // Update Timer
        setTimerDays(days);
        setTimerHours(hours);
        setTimerMinutes(minutes);
        setTimerSeconds(seconds);
      }
    }, 1000);
  };

  // const stopTimer = () => {
  //    setDistance(0);
  //   clearInterval(interval);
  //   setButtonText(status.START);
  // }

  const timer = () => {
    if (state === status.START) {
      startTimer();
    } else if ((state === status.STOP)) {
      // stopTimer();
    } else if ((state === status.RESET)) {
      //
    } else {
      // not valid
    }
  };

  return (
    <div className="App">
      <button onClick={() => timer()}>{state}</button>
      <Clock
        timerDays={timerDays}
        timerHours={timerHours}
        timerMinutes={timerMinutes}
        timerSeconds={timerSeconds}
      />
    </div>
  );
}
