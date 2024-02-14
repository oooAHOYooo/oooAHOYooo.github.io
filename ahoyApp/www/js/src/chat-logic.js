let friends = [ // Initial friends list
  { name: 'Demo Account 1', online: true },
  { name: 'Demo Account 2', online: false },
  { name: 'Demo Account 3', online: true },
];

function sendMessage() {
  // Function body remains unchanged
}

function populateFriendList(filter = '') {
  const friendListElement = document.getElementById('friend-list');
  friendListElement.innerHTML = ''; // Clear the list before repopulating
  
  friends
    .filter(friend => friend.name.toLowerCase().includes(filter.toLowerCase()))
    .forEach(friend => {
      const friendElement = document.createElement('div');
      friendElement.className = 'friend';
      friendElement.innerHTML = `
        <div class="friend-name">${friend.name}</div>
        <div class="friend-status">${friend.online ? 'Online' : 'Offline'}</div>
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
  
  document.getElementById('search-input').addEventListener('keyup', function() {
    populateFriendList(this.value);
  });
});

// The rest of the script remains unchanged