document.addEventListener("DOMContentLoaded", function () {
  const shareButtons = document.querySelectorAll(".share-button");

  shareButtons.forEach((button) => {
    button.addEventListener("click", function () {
      const url = this.dataset.url;
      if (navigator.share) {
        navigator
          .share({
            title: "Check out this artist on Ahoy Indie Media",
            url: url,
          })
          .then(() => {
            console.log("Thanks for sharing!");
          })
          .catch(console.error);
      } else {
        // Fallback for browsers that do not support the Web Share API
        prompt("Copy this link:", url);
      }
    });
  });
});
