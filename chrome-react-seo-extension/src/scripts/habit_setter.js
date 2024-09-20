/*global chrome*/
import { getItemFromLocal, setItemInLocal } from "../localInterface";
export function appendHabitToLocal(habit) {
  let habits = getItemFromLocal("habits");
  if (habits !== null) {
    habits.push(habit);
  } else {
    habits = [];
    habits.push(habit);
  }
  setItemInLocal("habits", habits);
  updateRules(habit);
  return habits;
}

export function updateRules(allowedUrls) {
  const newRules = [];
  // blockUrls.forEach((domain, index) => {
  newRules.push({
    id: 1,
    priority: 1,
    action: { type: "allow" },
    condition: {
      urlFilter: allowedUrls,
      resourceTypes: ["main_frame", "sub_frame"],
    },
  });
  // });
  chrome.declarativeNetRequest.getDynamicRules((previousRules) => {
    const previousRuleIds = previousRules.map((rule) => rule.id);
    chrome.declarativeNetRequest.updateDynamicRules({
      removeRuleIds: previousRuleIds,
      addRules: newRules,
    });
  });
}

export function toggleRules(currState) {
  const options = {};
  if (currState) {
    options.enableRulesetIds = ["ruleset_1"];
  } else {
    options.disableRulesetIds = ["ruleset_1"];
  }
  chrome.declarativeNetRequest.updateEnabledRulesets(options);
}
