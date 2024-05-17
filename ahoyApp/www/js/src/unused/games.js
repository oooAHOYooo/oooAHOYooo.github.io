document.addEventListener("DOMContentLoaded", function () {
  loadGames();
});

function loadGames() {
  const games = [
    {
      id: "GameA",
      name: "Vanca",
      url: "https://marcoworms.github.io/vanca/",
      description: "Game by Marco Worms",
      infoUrl: "https://marcoworms.github.io/",
      cover: "img/assets/game-covers/Vanca.png",
    },
    {
      id: "GameB",
      name: "Attach",
      url: "https://marcoworms.github.io/attach/",
      description: "Game by Marco Worms",
      infoUrl: "https://marcoworms.github.io/",
      cover: "img/assets/game-covers/Attach.png",
    },
  ];

  createGameMenu(games);
  createGameTabs(games);
}

function createGameMenu(games) {
  const menuContainer = document.getElementById("games-tab");

  // Create a container for the game menu
  const gameMenu = document.createElement("div");
  gameMenu.className = "game-menu";
  menuContainer.appendChild(gameMenu);

  games.forEach((game) => {
    // Create each game item
    const gameItem = document.createElement("div");
    gameItem.className = "game-item";
    gameItem.style.width = "45%";
    gameItem.innerHTML = `
            <img src="${game.cover}" alt="${game.name}" class="game-cover" onclick="openGameCover('${game.id}')">
            <div class="game-info">
                <h2>${game.name}</h2>
                <p>${game.description}</p>
                <a href="${game.infoUrl}" target="_blank">More Info</a>
            </div>
        `;
    gameMenu.appendChild(gameItem);
  });
}

function createGameTabs(games) {
  const tabsContainer = document.querySelector(".game-tabs");
  const tabContentContainer = document.getElementById("games-tab");

  games.forEach((game) => {
    // Create tab button
    const tabButton = document.createElement("button");
    tabButton.className = "game-tablinks";
    tabButton.textContent = game.name;
    tabButton.onclick = function (event) {
      openGameTab(event, game.id);
    };
    tabsContainer.appendChild(tabButton);

    // Create tab content
    const tabContent = document.createElement("div");
    tabContent.id = game.id;
    tabContent.className = "game-tabcontent";
    tabContent.style.display = "none";
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

function openGameCover(gameId) {
  console.log("Game selected from cover:", gameId);
  // Implement logic for game selection from cover
}

function openGameTab(evt, gameName) {
  var i, tabcontent, tablinks;
  tabcontent = document.getElementsByClassName("game-tabcontent");
  for (i = 0; i < tabcontent.length; i++) {
    tabcontent[i].style.display = "none";
  }
  tablinks = document.getElementsByClassName("game-tablinks");
  for (i = 0; i < tablinks.length; i++) {
    tablinks[i].className = tablinks[i].className.replace(" active", "");
  }
  document.getElementById(gameName).style.display = "block";
  evt.currentTarget.className += " active";
}
