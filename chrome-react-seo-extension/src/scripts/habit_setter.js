/*global chrome*/
export async function appendHabitToLocal(habit) {
  console.log(habit);
}

export async function updateRules(allowedUrls) {
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

export async function toggleRules(currState) {
  const options = {};
  console.log(currState);
  if (currState) {
    options.enableRulesetIds = ["ruleset_1"];
  } else {
    options.disableRulesetIds = ["ruleset_1"];
  }
  chrome.declarativeNetRequest.updateEnabledRulesets(options);
}
