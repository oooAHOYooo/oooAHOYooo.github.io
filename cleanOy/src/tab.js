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
  if (currentTabIndex > 13) {
    // Reset to the first tab if we've gone past the last one
    currentTabIndex = 0;
  }
  switchTabByIndex(currentTabIndex);
}

function prevTab() {
  currentTabIndex--;
  if (currentTabIndex < 0) {
    // Loop back to the last tab if we've gone past the first one
    currentTabIndex = 13;
  }
  switchTabByIndex(currentTabIndex);
}

// Extend the existing switchTab function to accept an index
function switchTabByIndex(tabIndex) {
  const tabs = [
    "home",
    "nowplaying",
    "radio",
    "songs",
    "liked",
    "podcasts",
    "artists",
    "cable",
    "updates",
    "games",
    "media",
    "account",
    "nowplaying",
  ];
  const tabIndicator = document.getElementById("tab-indicator");
  if (tabIndex >= 0 && tabIndex < tabs.length) {
    switchTab(tabs[tabIndex]);
    // Update the tab indicator text
    tabIndicator.textContent =
      tabs[tabIndex].charAt(0).toUpperCase() + tabs[tabIndex].slice(1); // Capitalize the first letter
  }
}

function getStarted() {
  // alert("There are many available tabs. You are now being redirected to the Podcasts tab.");
  // document.getElementById('podcasts-tab').scrollIntoView();
  switchTab("podcasts");
}

window.switchTab = switchTab;

document.addEventListener("DOMContentLoaded", function () {
  // Attach an event listener to the account button
  const accountButton = document.getElementById("account");
  if (accountButton) {
    accountButton.addEventListener("click", function () {
      // Switch to the account tab
      switchTab("account");
    });
  }
});
