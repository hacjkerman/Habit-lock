const item = await chrome.webRequest.onBeforeRequest.addListener(
  function (details) {
    return { cancel: true };
  },
  // generate all links that could potentially be used relating to the habit
  { urls: ["*://*.youtube.com/*"] },
  ["blocking"]
);
