// Assuming Firebase has been initialized in your HTML file

// Reference to the messages in Firebase Realtime Database
const messagesRef = firebase.database().ref('messages');

// Function to post a message to the message board
function postMessage() {
  const messageInput = document.getElementById('message-input');
  const message = messageInput.value.trim();

  if (message) {
    // Post the message to Firebase
    messagesRef.push().set({
      text: message,
      timestamp: firebase.database.ServerValue.TIMESTAMP
    });
    messageInput.value = ''; // Clear the input after posting
  } else {
    alert('Please enter a message.');
  }
}

// Function to load messages and listen for new ones
function loadMessages() {
  messagesRef.orderByChild('timestamp').on('child_added', function(snapshot) {
    const messageBoard = document.getElementById('message-board');
    const messageElement = document.createElement('p');
    messageElement.textContent = snapshot.val().text;
    messageBoard.appendChild(messageElement);
  });
}

// Example function to load a daily question (could be enhanced to fetch from a server or rotate questions)
function loadDailyQuestion() {
    const questions = [
        // Original questions
        "What's one hobby you've always wanted to try but haven't yet?",
        "How does indie media influence your daily life?",
        "What indie artist deserves more recognition?",
        
        // Added icebreaker questions
        "If you could only listen to one indie album for the rest of your life, what would it be?",
        "What's an underrated movie or series that you think more people should know about?",
        "Share a piece of indie media (book, music, movie) that changed your perspective.",
        "What's the last indie film you saw and what did you think of it?",
        "If you could collaborate with any indie artist, who would it be and why?",
        "What indie game are you looking forward to the most and why?",
        "Describe an indie project you're working on or dream of creating.",
        "Who is your indie hero and how have they inspired you?",
        "What's a hidden gem in the indie scene that you've recently discovered?",
        "Tell us about an indie event or festival you attended and what made it memorable."
      ];
  const dailyQuestion = document.getElementById('daily-question');
  // Simple rotation based on the day of the year
  const dayOfYear = new Date().getDay();
  dailyQuestion.textContent = questions[dayOfYear % questions.length];
}

// Function to post a message from the home tab to the message board
function postHomeMessage() {
  const messageInput = document.getElementById('home-message-input');
  const messageBoard = document.getElementById('message-board');
  const message = messageInput.value.trim();

  if (message) {
    // Create a new paragraph element for the message
    const messageElement = document.createElement('p');
    messageElement.textContent = message;
    // Append the new message element to the message board
    messageBoard.appendChild(messageElement);
    // Clear the input field after posting
    messageInput.value = '';
  } else {
    alert('Please enter an answer.');
  }
}

// Call loadDailyQuestion and loadMessages when the page loads
window.addEventListener('DOMContentLoaded', function() {
  loadDailyQuestion();
  loadMessages();
});

