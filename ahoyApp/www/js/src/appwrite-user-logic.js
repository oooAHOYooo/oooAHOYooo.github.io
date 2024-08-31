// Initialize Appwrite SDK
const endpoint = 'https://[YOUR-ENDPOINT]/v1';
const projectId = 'YOUR_PROJECT_ID';
const collectionId = 'users';
const apiKey = 'YOUR_API_KEY';

function registerUser(email, password, name) {
    // First, create the user
    fetch(`${endpoint}/account`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'X-Appwrite-Project': projectId,
            'X-Appwrite-Key': apiKey,
        },
        body: JSON.stringify({
            email: email,
            password: password,
            name: name,
        }),
    })
    .then(response => response.json())
    .then(data => {
        console.log('User registered:', data);

        // Now add user details to the `users` collection
        const userId = data.$id;
        const user = {
            userId: userId,
            name: name,
            email: email,
            role: 'member',
            joinDate: new Date().toISOString(),
        };

        return fetch(`${endpoint}/databases/${projectId}/collections/${collectionId}/documents`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'X-Appwrite-Project': projectId,
                'X-Appwrite-Key': apiKey,
            },
            body: JSON.stringify(user),
        });
    })
    .then(response => response.json())
    .then(data => {
        console.log('User details added to collection:', data);
    })
    .catch(error => console.error('Error:', error));
}

document.getElementById('registerButton').addEventListener('click', () => {
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const name = document.getElementById('name').value;

    registerUser(email, password, name);
});
