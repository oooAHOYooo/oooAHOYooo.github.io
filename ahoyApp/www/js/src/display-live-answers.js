// Ensure Firebase is initialized before this script runs

// Function to fetch answers from Firestore and display them
function fetchAndDisplayAnswers() {
  const answersContainer = document.getElementById('answers-display');

  // Hardcoded sample answers for development
  const sampleAnswers = [
    { content: "Sample answer 1", timestamp: new Date(), userId: "user1" },
    { content: "Sample answer 2", timestamp: new Date(), userId: "user2" },
    { content: "Sample answer 3", timestamp: new Date(), userId: "user3" }
  ];

  // Display hardcoded sample answers
  sampleAnswers.forEach(answer => {
    const answerElement = createAnswerElement(answer);
    answersContainer.appendChild(answerElement);
  });

  // Fetch answers from Firestore
  firebase.firestore().collection('publicBulletinBoard')
    .orderBy('timestamp', 'desc')
    .get()
    .then(querySnapshot => {
      querySnapshot.forEach(doc => {
        const answer = doc.data();
        const answerElement = createAnswerElement(answer);
        answersContainer.appendChild(answerElement);
      });
    })
    .catch(error => {
      console.error("Error fetching answers: ", error);
    });
}

// Helper function to create an answer element
function createAnswerElement(answer) {
  const answerDiv = document.createElement('div');
  answerDiv.className = 'answer';
  answerDiv.innerHTML = `
    <p class="answer-content">${answer.content}</p>
    <p class="answer-timestamp">${new Date(answer.timestamp.seconds * 1000).toLocaleDateString()}</p>
    <p class="answer-userId">${answer.userId}</p>
  `;
  return answerDiv;
}

// Function to display questions with timestamps
function displayQuestionsWithTimestamps() {
  const questionsDisplay = document.getElementById('questions-display');
  questionsDisplay.innerHTML = ''; // Clear any existing content

  // Load the questions from the JSON file
  fetch('js/src/monthlyQuestions.json')
    .then(response => response.json())
    .then(questions => {
      for (const [date, question] of Object.entries(questions)) {
        const questionDiv = document.createElement('div');
        questionDiv.className = 'daily-question';
        const readableDate = new Date(date).toLocaleDateString(undefined, {
          year: 'numeric', month: 'long', day: 'numeric'
        });
        questionDiv.innerHTML = `<strong>${readableDate}:</strong> ${question}`;
        questionsDisplay.appendChild(questionDiv);
      }
    })
    .catch(error => {
      console.error('Error loading questions:', error);
    });
}

// Call the functions to fetch and display answers and questions when the window loads
window.addEventListener('load', () => {
  fetchAndDisplayAnswers();
  displayQuestionsWithTimestamps();
});
