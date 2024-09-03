function shareOnTwitter() {
    var url = window.location.href; // Gets the current URL
    var text = "Check out what I'm listening to on Ahoy Indie Media!"; // Custom share message
    var twitterUrl = `https://twitter.com/intent/tweet?url=${encodeURIComponent(url)}&text=${encodeURIComponent(text)}`;
    window.open(twitterUrl, '_blank');
}

function shareOnReddit() {
    var url = window.location.href; // Gets the current URL
    var title = "Check out what I'm listening to on Ahoy Indie Media!"; // Custom share title
    var redditUrl = `https://www.reddit.com/submit?url=${encodeURIComponent(url)}&title=${encodeURIComponent(title)}`;
    window.open(redditUrl, '_blank');
}