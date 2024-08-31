// Initialize Appwrite SDK
const endpoint = 'https://cloud.appwrite.io/v1';
const projectId = '66d32fd3003bbcd45433'; // Your actual project ID
const collectionId = '66d335fa00258597402f'; // Your collection ID for users
const apiKey = '042ab6ad8bf931c32d47921f01a83a08a5aa7866c16d102e7083bde55c9812b84f5a79d5b295f8d596d461488ceae9361ff9689284dd4ee5a829719a6c6abe887065d9bfd06f06d104d14f2db7647715106610bd03ce9c334a4c63c3d674642b86d8a549d6ab61f45db39f131c406069dfcffa5b9dd075cff6d025264dd23774'; // Your actual API key
const databaseId = 'ahoyDB'; // Your actual database ID

function registerUser(email, password, name) {
    // Enhanced security checks (2024 feature)
    if (!email || !password || password.length < 8) {
        alert('Please ensure all fields are filled and password is at least 8 characters.');
        return;
    }

    // First, create the user using the Users API
    fetch(`${endpoint}/users`, {
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

        return fetch(`${endpoint}/databases/${databaseId}/collections/${collectionId}/documents`, {
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
        showSuccessMessage();
    })
    .catch(error => console.error('Error:', error));
}

function showSuccessMessage() {
    // Hide the registration form
    document.querySelector('form').style.display = 'none';

    // Display the success message
    const successMessage = document.getElementById('successMessage');
    successMessage.style.display = 'block';

    // Optional: Redirect after a delay
    setTimeout(() => {
        window.location.href = "../index.html"; // Adjust this path as needed
    }, 3000);
}

document.getElementById('registerButton').addEventListener('click', () => {
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const name = document.getElementById('name').value;

    registerUser(email, password, name);
});
