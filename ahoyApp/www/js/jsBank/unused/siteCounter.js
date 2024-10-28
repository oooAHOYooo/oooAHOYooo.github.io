document.addEventListener("DOMContentLoaded", function () {
  const namespace = "ahoy-indie-media"; // Replace with a unique name for your site
  const key = "visitor-counter";

  fetch(`https://api.countapi.xyz/hit/${namespace}/${key}`)
    .then((response) => response.json())
    .then((data) => {
      document.getElementById("visitor-count").textContent = data.value;
    })
    .catch(console.error);
});
