		// TODO: Replace with your Firebase project's configuration
		var firebaseConfig = { 
    apiKey: "AIzaSyBq_IQRwkjh2o-jUkS8tI8wcEek5yMIwmo", 
    authDomain: "ahoy-indie-media-da86d.firebaseapp.com", 
    projectId: "ahoy-indie-media-da86d", 
    storageBucket: "ahoy-indie-media-da86d.appspot.com", 
    messagingSenderId: "179901301547", 
    appId: "1:179901301547:web:599159f9efb826f464bb6e", 
    measurementId: "G-K3QN161BVX", 
  }; 
  firebase.initializeApp(firebaseConfig);

firebase.auth().onAuthStateChanged((user) => {
	const userAccountDiv = document.getElementById("user-account");
	const supportArtistDiv = document.getElementById("supportArtist");
	if (user) {
		userAccountDiv.innerHTML = `
        <div class="userBox">
			<h2>Your User Account</h2>
			<p>User: ${user.email}</p>
			<p>Balance: $100</p></div>
		`;
		
	} else {
		userAccountDiv.innerHTML = `
			Please log in to view your account information.
			<button onclick="location.href='../../../account/loginModule.html';">Login</button>
		`;
		supportArtistDiv.innerHTML = '';
	}
});