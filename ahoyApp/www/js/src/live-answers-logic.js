// Function to load the question of the day
function loadQuestionOfTheDay() {
    // Correct the path to point to where your monthlyQuestions.json file is hosted
    fetch('js/src/monthlyQuestions.json') // Adjust the path based on your server setup
        .then(response => response.json())
        .then(data => {
            const today = new Date().toISOString().slice(0, 10);
            const dailyQuestion = data[today]; // Assuming your JSON is an object with dates as keys
            if (dailyQuestion) { // Check if there's a question for today
                document.getElementById('daily-question').textContent = dailyQuestion;
                document.getElementById('daily-question').className = 'glass-effect'; // Apply glass effect
            } else {
                // Handle the case where there's no question for today
                document.getElementById('daily-question').textContent = "No question for today.";
                document.getElementById('daily-question').className = 'glass-effect'; // Apply glass effect
            }
        }).catch(error => {
            console.error('Error loading the question of the day: ', error);
            // Handle errors, for example, show a default message
            document.getElementById('daily-question').textContent = "Could not load the question for today.";
            document.getElementById('daily-question').className = 'glass-effect'; // Apply glass effect
        });
}

// Function to handle form submission
document.getElementById('answer-submission-form').addEventListener('submit', function(event) {
    event.preventDefault();
    const answer = document.getElementById('answer-input').value;
    const userId = firebase.auth().currentUser.uid; // Make sure you handle user state correctly

    firebase.firestore().collection('publicBulletinBoard').add({
        question: document.getElementById('daily-question').textContent,
        answer: answer,
        timestamp: firebase.firestore.FieldValue.serverTimestamp(),
        userId: userId
    }).then(() => {
        console.log('Answer submitted!');
        document.getElementById('answer-input').value = ''; // Clear the input
        document.getElementById('answer-input').className = 'responsive-input glass-effect'; // Apply glass effect
    }).catch(error => {
        console.error('Error submitting answer: ', error);
    });
});

// Function to load all answers for the day
function loadAnswersForTheDay() {
    firebase.firestore().collection('publicBulletinBoard')
        .where('timestamp', '>=', new Date().setHours(0, 0, 0, 0))
        .where('timestamp', '<', new Date().setHours(24, 0, 0, 0))
        .orderBy('timestamp', 'desc')
        .onSnapshot(snapshot => {
            const answersDisplay = document.getElementById('answers-display');
            answersDisplay.innerHTML = ''; // Clear previous answers
            snapshot.forEach(doc => {
                const post = doc.data();
                const postElement = document.createElement('div');
                postElement.className = 'answer glass-effect'; // Apply glass effect
                postElement.textContent = post.answer; // Assuming you want to show the answer
                answersDisplay.appendChild(postElement);
            });
        });
}

// Call these functions to set up your page
loadQuestionOfTheDay();
loadAnswersForTheDay();
