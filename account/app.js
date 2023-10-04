// Using the Firebase configuration you provided
const firebaseConfig = {
  apiKey: "AIzaSyBq_IQRwkjh2o-jUkS8tI8wcEek5yMIwmo",
  authDomain: "ahoy-indie-media-da86d.firebaseapp.com",
  projectId: "ahoy-indie-media-da86d",
  storageBucket: "ahoy-indie-media-da86d.appspot.com",
  messagingSenderId: "179901301547",
  appId: "1:179901301547:web:599159f9efb826f464bb6e",
  measurementId: "G-K3QN161BVX"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

// Sign-up function
function signUp() {
  const email = document.getElementById('signupEmail').value;
  const password = document.getElementById('signupPassword').value;
  
  firebase.auth().createUserWithEmailAndPassword(email, password)
    .then((userCredential) => {
      alert('Successfully signed up!');
      // After signup, clear the form
      document.getElementById('signupEmail').value = '';
      document.getElementById('signupPassword').value = '';
    })
    .catch((error) => {
      alert(`Error signing up: ${error.message}`);
    });
}

// Login function
function login() {
  const email = document.getElementById('loginEmail').value;
  const password = document.getElementById('loginPassword').value;

  firebase.auth().signInWithEmailAndPassword(email, password)
    .then((userCredential) => {
      // Display the user's name
      document.getElementById('displayName').textContent = userCredential.user.email;
      // Toggle visibility
      document.getElementById('signupForm').style.display = 'none';
      document.getElementById('loginForm').style.display = 'none';
      document.getElementById('userContent').style.display = 'block';
      // After login, clear the form
      document.getElementById('loginEmail').value = '';
      document.getElementById('loginPassword').value = '';
    })
    .catch((error) => {
      alert(`Error logging in: ${error.message}`);
    });
}

// Logout function
function logout() {
  firebase.auth().signOut().then(() => {
    // Toggle visibility
    document.getElementById('signupForm').style.display = 'block';
    document.getElementById('loginForm').style.display = 'block';
    document.getElementById('userContent').style.display = 'none';
  }).catch((error) => {
    alert(`Error logging out: ${error.message}`);
  });
}