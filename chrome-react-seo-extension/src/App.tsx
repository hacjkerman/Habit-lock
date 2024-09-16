import React, { useEffect, useState } from "react";
import "./App.css";
import {
  appendHabitToLocal,
  toggleRules,
  updateRules,
} from "./scripts/habit_setter";
import { getItemFromLocal, setItemInLocal } from "./localInterface";

function App() {
  const [habit, setHabit] = useState("");
  const [currHabit, setCurrHabit] = useState("");
  const [isEnabled, setIsEnabled] = useState(false);
  const submitInput = (e: any) => {
    e.preventDefault();
    if (habit === "") {
      return;
    }
    appendHabitToLocal(habit);
    updateRules(habit);
    setItemInLocal("habit", habit);
    setCurrHabit(habit);
    setHabit("");
  };

  const storeHabit = (e: any) => {
    setHabit(e.target.value);
  };

  const toggleExtension = (e: any) => {
    e.preventDefault();
    const curr = !isEnabled;
    setIsEnabled(curr);
    setItemInLocal("state", curr);
  };

  useEffect(() => {
    toggleRules(isEnabled);
  }, [isEnabled]);

  useEffect(() => {
    const state = getItemFromLocal("state");
    if (state !== undefined) {
      setIsEnabled(state);
    }
    const habit = getItemFromLocal("habit");
    if (habit !== undefined) {
      setCurrHabit(habit);
    }
  }, []);
  return (
    <div className="App">
      <input onChange={storeHabit} value={habit} />
      <button type="submit" onClick={submitInput}>
        Submit
      </button>
      <div className="">{currHabit}</div>
      <button onClick={toggleExtension}>{isEnabled ? "Unlock" : "Lock"}</button>
    </div>
  );
}

export default App;
