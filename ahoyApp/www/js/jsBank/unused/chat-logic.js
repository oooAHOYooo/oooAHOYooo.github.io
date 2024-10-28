let friends = [
  { name: 'Alice Johnson', online: true },
  { name: 'Bob Smith', online: false },
  { name: 'Charlie Davis', online: true },
  { name: 'Dana Lee', online: true },
  { name: 'Evan Green', online: false },
  { name: 'Fiona Black', online: true },
  // Add more friends here
  { name: 'Grace Hall', online: true },
  { name: 'Henry Ford', online: false },
  { name: 'Ivy White', online: true },
  { name: 'Jack Brown', online: true }
];

function sendMessage() {
  const input = document.getElementById('chat-input');
  const message = input.value.trim();
  const messagesContainer = document.getElementById('messages');

  if (message) {
    console.log(`Sending message: ${message}`);
    // Create a div for the new message and append it to the messages container
    const messageDiv = document.createElement('div');
    messageDiv.className = 'message';
    messageDiv.textContent = message; // Assuming plain text messages for simplicity
    messagesContainer.appendChild(messageDiv);

    // Scroll to the bottom of the messages container
    messagesContainer.scrollTop = messagesContainer.scrollHeight;

    input.value = ''; // Clear the input after sending
  }
}

function populateFriendList(filter = '') {
  const friendListElement = document.getElementById('friend-list');
  friendListElement.innerHTML = ''; // Clear the list before repopulating
  
  friends
    .filter(friend => friend.name.toLowerCase().includes(filter.toLowerCase()))
    .forEach((friend, index) => {
      const friendElement = document.createElement('div');
      friendElement.className = 'friend';
      friendElement.innerHTML = `
        <div class="friend-profile">
          <img src="https://placekitten.com/${50 + index}/${50 + index}" alt="Profile Picture" class="friend-picture">
        </div>
        <div class="friend-info">
          <div class="friend-name">${friend.name}</div>
          <div class="friend-status">${friend.online ? 'Online' : 'Offline'}</div>
        </div>
      `;
      friendListElement.appendChild(friendElement);
    });
}

function addFriend(name, online = true) {
  const friendExists = friends.some(friend => friend.name === name);
  if (!friendExists) {
    friends.push({ name, online });
    populateFriendList(); // Repopulate the friend list with the new entry
  } else {
    alert('Friend already exists!');
  }
}

document.addEventListener('DOMContentLoaded', function () {
  populateFriendList();
  
  const searchInput = document.getElementById('search-input');
  searchInput.addEventListener('keyup', function() {
    populateFriendList(this.value);
  });

  const sendMessageButton = document.getElementById('send-message');
  sendMessageButton.addEventListener('click', sendMessage);

  const chatInput = document.getElementById('chat-input');
  chatInput.addEventListener('keypress', function(e) {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault(); // Prevent the default action to avoid line break in textarea
      sendMessage();
    }
  });
});
