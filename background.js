chrome.action.onClicked.addListener((tab) => {
  // Prevent running on restricted chrome:// pages
  if (!tab.url.includes("chrome://")) {
    chrome.scripting.executeScript({
      target: { tabId: tab.id },
      files: ["content.js"]
    });
  }
});