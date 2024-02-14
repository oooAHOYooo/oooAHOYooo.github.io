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
      // Function body remains unchanged
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