document.addEventListener('DOMContentLoaded', function() {
  const songGoal = 1000;
  const artistGoal = 200;
  let currentSongCount = 29; // This can be dynamically updated based on actual data
  let currentArtistCount = 9; // Update based on actual data

  function updateGoalChart(goalElementId, currentCount, goalCount) {
    const percentage = (currentCount / goalCount) * 100;
    const degrees = percentage * 3.6; // Convert percentage to degrees (360 degrees in a circle)
    document.documentElement.style.setProperty(`--${goalElementId}-rotation`, `${degrees}deg`);
  }

  updateGoalChart('song-goal-chart', currentSongCount, songGoal);
  updateGoalChart('artist-goal-chart', currentArtistCount, artistGoal);
});
