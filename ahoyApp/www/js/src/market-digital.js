document.addEventListener("DOMContentLoaded", function () {
  fetch("data/market-digital.json")
    .then((response) => response.json())
    .then((data) => populateTable(data.digitalProducts));
});

function populateTable(products) {
  const tableBody = document
    .getElementById("digitalMarketTable")
    .querySelector("tbody");
  products.forEach((product) => {
    const row = tableBody.insertRow();
    row.innerHTML = `
                <td>${product.artist}</td>
                <td>${product.songTitle}</td>
                <td>${product.genre}</td>
                <td>$${product.price}</td>
                <td>
                    <button onclick="playAudio('${product.previewUrl}')">Play Preview</button>
                    <audio id="audio-${product.id}" style="display: none;">
                        <source src="${product.previewUrl}" type="audio/mpeg">
                        Your browser does not support the audio element.
                    </audio>
                </td>
                <td><button onclick="addToCart('${product.id}')">Add to Cart</button></td>
            `;
  });
}

function playAudio(id) {
  const audio = document.getElementById(`audio-${id}`);
  audio.play();
}
