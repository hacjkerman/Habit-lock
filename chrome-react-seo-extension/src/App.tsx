import React, { useEffect, useState } from "react";
import "./App.css";
import { appendHabitToLocal, toggleRules } from "./scripts/habit_setter";
import { getItemFromLocal, setItemInLocal } from "./localInterface";

function App() {
  const [habit, setHabit] = useState("");
  const [currHabits, setCurrHabits] = useState([]);
  const [isEnabled, setIsEnabled] = useState(false);
  const submitInput = (e: any) => {
    e.preventDefault();
    if (habit === "") {
      return;
    }
    const habits = appendHabitToLocal(habit);
    setCurrHabits(habits);
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
    const habits = getItemFromLocal("habits");
    if (habits !== undefined) {
      setCurrHabits(habits);
    }
  }, []);
  return (
    <div className="App">
      <input onChange={storeHabit} value={habit} />
      <button type="submit" onClick={submitInput}>
        Submit
      </button>
      <div className="">
        <h2 className="">Habits</h2>
        {currHabits &&
          currHabits.map((habit) => {
            return <div key={habit}>{habit}</div>;
          })}
      </div>
      <button onClick={toggleExtension}>{isEnabled ? "Unlock" : "Lock"}</button>
    </div>
  );
}

export default App;
