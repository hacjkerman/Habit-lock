/* eslint-disable no-undef */
chrome.action.onClicked.addListener((tab) => {
  chrome.scripting.executeScript({
    target: { tabID: tab.id },
    func: () => {
      alert("Hello from my extension");
    },
  });
});
