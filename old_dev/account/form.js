// Your web app's Firebase configuration
var firebaseConfig = {
  apiKey: "AIzaSyBq_IQRwkjh2o-jUkS8tI8wcEek5yMIwmo",
  authDomain: "ahoy-indie-media-da86d.firebaseapp.com",
  projectId: "ahoy-indie-media-da86d",
  storageBucket: "ahoy-indie-media-da86d.appspot.com",
  messagingSenderId: "179901301547",
  appId: "1:179901301547:web:599159f9efb826f464bb6e",
  measurementId: "G-K3QN161BVX",
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

const auth = firebase.auth();

// Signup function
function signUp() {
  var email = document.getElementById("email");
  var password = document.getElementById("password");

  const promise = auth.createUserWithEmailAndPassword(
      email.value,
      password.value
  );
  promise.catch((e) => alert(e.message));
  alert("SignUp Successfully");
}

// SignIN function
function signIn() {
  var email = document.getElementById("email");
  var password = document.getElementById("password");
  const promise = auth.signInWithEmailAndPassword(
      email.value, password.value);
  promise.catch((e) => alert(e.message));
}

// SignOut
function signOut() {
  auth.signOut();
  alert("SignOut Successfully from System");
}

// Active user to homepage
firebase.auth().onAuthStateChanged((user) => {
  var formDiv = document.getElementById("formDiv");
  var signOutButton = document.getElementById("signOut");
  var goToAccountButton = document.getElementById("goToAccount");
  var usernameDisplay = document.getElementById("usernameDisplay");

  if (user) {
      var email = user.email;

      formDiv.style.display = "none";
      signOutButton.style.display = "block";
      goToAccountButton.style.display = "block";

      usernameDisplay.textContent = "Hiiiii " + email;
      usernameDisplay.classList.remove('hidden');
  } else {
      formDiv.style.display = "block";
      signOutButton.style.display = "none";
      goToAccountButton.style.display = "none";

      usernameDisplay.classList.add('hidden');
  }
});
