import React, { useEffect, useState } from "react";
import "./App.css";
import {
  appendHabitToLocal,
  toggleRules,
  updateRules,
} from "./scripts/habit_setter";

function App() {
  const [habit, setHabit] = useState("");
  const [isEnabled, setIsEnabled] = useState(false);
  const submitInput = (e: any) => {
    e.preventDefault();
    if (habit === "") {
      return;
    }
    appendHabitToLocal(habit);
    updateRules(habit);
    setHabit("");
  };

  const storeHabit = (e: any) => {
    setHabit(e.target.value);
  };

  const toggleExtension = (e: any) => {
    e.preventDefault();
    setIsEnabled(!isEnabled);
  };

  useEffect(() => {
    toggleRules(isEnabled);
  }, [isEnabled]);
  return (
    <div className="App">
      <input onChange={storeHabit} value={habit} />
      <button type="submit" onClick={submitInput}>
        Submit
      </button>
      <button onClick={toggleExtension}>{isEnabled ? "Unlock" : "Lock"}</button>
    </div>
  );
}

export default App;
