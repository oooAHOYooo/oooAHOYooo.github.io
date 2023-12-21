const playlists = {}; // Object to hold playlists

function switchTab(tabName) {
  const contents = document.querySelectorAll(".tab-content");
  for (const content of contents) {
    content.classList.remove("active");
  }
  const activeTab = document.getElementById(`${tabName}-tab`);
  activeTab.classList.add("active");
}

let currentTabIndex = 0; // Assuming you have a global variable to keep track of the current tab

function nextTab() {
  currentTabIndex++;
  if (currentTabIndex > 8) {
    // Adjusted to match the new length of the tabs array
    currentTabIndex = 0;
  }
  switchTabByIndex(currentTabIndex);
}

function prevTab() {
  currentTabIndex--;
  if (currentTabIndex < 0) {
    currentTabIndex = 8; // Adjusted to match the new length of the tabs array
  }
  switchTabByIndex(currentTabIndex);
}

// Extend the existing switchTab function to accept an index
function switchTabByIndex(tabIndex) {
  const tabs = [
    "home",
    "market", // Added "market" to the tabs array
    "songs",
    "media",
    "podcasts",

    "games",
    "artists",
    "updates",
    "account",
  ];
  const tabIndicator = document.getElementById("tab-indicator");
  if (tabIndex >= 0 && tabIndex < tabs.length) {
    switchTab(tabs[tabIndex]);
    tabIndicator.textContent =
      tabs[tabIndex].charAt(0).toUpperCase() + tabs[tabIndex].slice(1); // Capitalize the first letter
  }
}

function getStarted() {
  switchTab("podcasts");
}

window.switchTab = switchTab;

document.addEventListener("DOMContentLoaded", function () {
  const accountButton = document.getElementById("account");
  if (accountButton) {
    accountButton.addEventListener("click", function () {
      switchTab("account");
    });
  }
});

// Attach event listeners to the arrow buttons
document.getElementById("super-right-arrow").addEventListener("click", () => {
  currentTabIndex = (currentTabIndex + 1) % tabs.length; // Go to the next tab, loop back to the first tab if at the end
  switchTabByIndex(currentTabIndex);
});

document.getElementById("super-left-arrow").addEventListener("click", () => {
  currentTabIndex = (currentTabIndex - 1 + tabs.length) % tabs.length; // Go to the previous tab, loop back to the last tab if at the beginning
  switchTabByIndex(currentTabIndex);
});
