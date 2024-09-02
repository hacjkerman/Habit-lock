/*global chrome*/
export async function appendHabitToLocal(habit) {
  console.log(habit);
}

export async function updateRules(blockUrls) {
  const newRules = [];
  // blockUrls.forEach((domain, index) => {
  newRules.push({
    id: 1,
    priority: 1,
    action: { type: "block" },
    condition: {
      urlFilter: blockUrls,
      resourceTypes: ["main_frame", "sub_frame"],
    },
  });
  // });
  const newRule = await chrome.declarativeNetRequest.getDynamicRules(
    (previousRules) => {
      const previousRuleIds = previousRules.map((rule) => rule.id);
      chrome.declarativeNetRequest.updateDynamicRules({
        removeRuleIds: previousRuleIds,
        addRules: newRules,
      });
    }
  );
  console.log(newRule);
}
