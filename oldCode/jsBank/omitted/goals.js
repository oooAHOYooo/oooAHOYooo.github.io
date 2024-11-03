
  document.addEventListener('DOMContentLoaded', function() {
    fetch('./data/goals.json')
      .then(response => response.json())
      .then(data => {
        const goals = data.goals;
        goals.forEach(goal => {
          const goalType = goal.type.toLowerCase();
          const goalElement = document.getElementById(`current-${goalType}-count`);
          if (goalElement) {
            goalElement.textContent = goal.currentCount;
          }
        });
      })
      .catch(error => console.error('Error fetching goals:', error));
  });
