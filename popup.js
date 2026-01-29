document.addEventListener('DOMContentLoaded', () => {
  // Load saved settings
  chrome.storage.sync.get(['selector', 'key'], (data) => {
    if (data.selector) document.getElementById('targetSelector').value = data.selector;
    if (data.key) document.getElementById('triggerKey').value = data.key;
  });

  // Save settings when clicked
  document.getElementById('saveBtn').addEventListener('click', () => {
    const selector = document.getElementById('targetSelector').value;
    const key = document.getElementById('triggerKey').value.toLowerCase();

    chrome.storage.sync.set({ selector: selector, key: key }, () => {
      // Visual feedback
      const status = document.getElementById('status');
      status.textContent = 'Settings Saved & Active!';
      setTimeout(() => status.textContent = '', 2000);
      
      // Optional: Refresh current tab to apply immediately
      chrome.tabs.query({active: true, currentWindow: true}, (tabs) => {
          chrome.tabs.reload(tabs[0].id);
      });
    });
  });
});