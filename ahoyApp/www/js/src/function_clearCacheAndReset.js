function clearCacheAndReset() {
    // Clear local storage
    localStorage.clear();
    
    // Clear session storage
    sessionStorage.clear();
    
    // Show success modal
    var modal = document.getElementById("cacheModal");
    var ctaButton = document.querySelector(".cache-cta-button");
    var cancelButton = document.querySelector(".cache-cancel-button");
    
    modal.style.display = "block";
    
    // Close the modal when the user clicks the CTA button
    ctaButton.onclick = function() {
        modal.style.display = "none";
    }
    
    // Close the modal when the user clicks the cancel button
    cancelButton.onclick = function(event) {
        event.stopPropagation();
        modal.style.display = "none";
    }
    
    // Close the modal when the user clicks anywhere outside of the modal
    window.onclick = function(event) {
        if (event.target == modal) {
            modal.style.display = "none";
        }
    }
}

function reloadPage() {
    // Clear cache logic (if applicable)
    if ('caches' in window) {
        caches.keys().then(function(names) {
            for (let name of names) caches.delete(name);
        });
    }

    // Reload the page
    location.reload(true);
}