// Extended example with dynamic friend management and chat functionality

let currentFriend = ''; // Track the current active chat

const friends = [ // Extended friends list with more details
  { name: 'Alice', online: true },
  { name: 'Bob', online: false },
  { name: 'Charlie', online: true },
  { name: 'Dana', online: true },
];

function sendMessage() {
  const input = document.getElementById('chat-input');
  const message = input.value.trim();
  if (message && currentFriend) {
    console.log(`Sending message to ${currentFriend}: ${message}`);
    input.value = '';
  }
}

function populateFriendList() {
  const friendListElement = document.getElementById('friend-list');
  friendListElement.innerHTML = ''; // Clear existing list to repopulate
  friends.forEach(friend => {
    const friendElement = document.createElement('div');
    friendElement.textContent = `${friend.name} ${friend.online ? '(Online)' : '(Offline)'}`;
    friendElement.className = 'friend';
    friendElement.onclick = function() {
      console.log(`Starting chat with ${friend.name}`);
      currentFriend = friend.name; // Set the current active chat
      highlightActiveChat(friend.name);
    };
    friendListElement.appendChild(friendElement);
  });
}

function highlightActiveChat(friendName) {
  const friends = document.querySelectorAll('.friend');
  friends.forEach(friend => {
    if (friend.textContent.includes(friendName)) {
      friend.style.backgroundColor = '#ADD8E6'; // Highlight active chat
    } else {
      friend.style.backgroundColor = ''; // Reset others
    }
  });
}

function addFriend(name, online = true) {
  friends.push({ name, online });
  populateFriendList(); // Repopulate the friend list with the new entry
}

function removeFriend(name) {
  const index = friends.findIndex(friend => friend.name === name);
  if (index > -1) {
    friends.splice(index, 1);
    populateFriendList(); // Update the list after removal
  }
}

document.addEventListener('DOMContentLoaded', function () {
  populateFriendList();
});

// Example usage of addFriend and removeFriend
// addFriend('Eva', true);
// removeFriend('Bob');
