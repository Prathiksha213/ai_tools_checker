document.addEventListener("DOMContentLoaded", function () {
  const toggleButton = document.getElementById("toggleRestriction");
  const statusText = document.getElementById("status");

  // Load current restriction state
  chrome.storage.sync.get(["aiRestricted"], function (result) {
    const isRestricted = result.aiRestricted || false;
    updateUI(isRestricted);
  });

  // Toggle restriction on button click
  toggleButton.addEventListener("click", function () {
    chrome.storage.sync.get(["aiRestricted"], function (result) {
      const newState = !result.aiRestricted;

      chrome.storage.sync.set({ aiRestricted: newState }, function () {
        updateUI(newState);
      });
    });
  });

  function updateUI(isRestricted) {
    if (isRestricted) {
      statusText.textContent = "AI Tool is Restricted 🚫";
      toggleButton.textContent = "Enable AI Tool";
      toggleButton.style.backgroundColor = "#4CAF50";
    } else {
      statusText.textContent = "AI Tool is Enabled ✅";
      toggleButton.textContent = "Restrict AI Tool";
      toggleButton.style.backgroundColor = "#f44336";
    }
  }
});
