document.addEventListener("DOMContentLoaded", function () {
  loadGames();
});

function loadGames() {
  // Example JSON structure. Replace this with the fetch from your actual JSON file
  const games = [
    {
      id: "GameA",
      name: "Vanca",
      url: "https://marcoworms.github.io/vanca/",
      description: "Game by Marco Worms",
      infoUrl: "https://marcoworms.github.io/",
    },
    {
      id: "GameB",
      name: "Attach",
      url: "https://marcoworms.github.io/attach/",
      description: "Game by Marco Worms",
      infoUrl: "https://marcoworms.github.io/",
    },
    // Add more games as needed
  ];

  createGameTabs(games);
}

function createGameTabs(games) {
  const tabsContainer = document.querySelector(".game-tabs"); // Updated class name
  const tabContentContainer = document.getElementById("games-tab");

  games.forEach((game) => {
    // Create tab button
    const tabButton = document.createElement("button");
    tabButton.className = "game-tablinks"; // Updated class name
    tabButton.textContent = game.name;
    tabButton.onclick = function (event) {
      openGame(event, game.id);
    };
    tabsContainer.appendChild(tabButton);

    // Create tab content
    const tabContent = document.createElement("div");
    tabContent.id = game.id;
    tabContent.className = "game-tabcontent"; // Updated class name
    tabContent.style.display = "none"; // Start with hidden content
    tabContent.innerHTML = `
            <button class="load-game" data-url="${game.url}">Load "${game.name}"</button>
            <iframe style="width: 100%; height: 500px; border: none"></iframe>
            <h1>${game.name}</h1>
            <h2>${game.description}</h2>
            <p>For more information about this game, visit <a href="${game.infoUrl}" target="_blank">here</a>.</p>
        `;
    tabContentContainer.appendChild(tabContent);

    // Add event listener for load button
    tabContent
      .querySelector(".load-game")
      .addEventListener("click", function () {
        this.nextElementSibling.src = this.getAttribute("data-url");
        this.style.display = "none";
      });
  });
}

function openGame(evt, gameName) {
  var i, tabcontent, tablinks;
  tabcontent = document.getElementsByClassName("game-tabcontent"); // Updated class name
  for (i = 0; i < tabcontent.length; i++) {
    tabcontent[i].style.display = "none";
  }
  tablinks = document.getElementsByClassName("game-tablinks"); // Updated class name
  for (i = 0; i < tablinks.length; i++) {
    tablinks[i].className = tablinks[i].className.replace(" active", "");
  }
  document.getElementById(gameName).style.display = "block";
  evt.currentTarget.className += " active";
}
