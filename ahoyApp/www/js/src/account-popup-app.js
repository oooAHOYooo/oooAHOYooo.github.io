function userMood() {
  return {
    mood: 3, // Default mood value
    init() {
      // Initialize mood from local storage or set to default
      this.mood = localStorage.getItem('userMood') || 3;
      this.updateBackgroundColor(this.mood);
    },
    updateMood(value) {
      this.mood = value;
      localStorage.setItem('userMood', this.mood);
      this.updateBackgroundColor(this.mood);
    },
    updateBackgroundColor(moodValue) {
      const colors = [
        '#ff4d4d', // 0 - Not so great
        '#ff944d', // 1
        '#ffd24d', // 2
        '#ffff4d', // 3
        '#b3ff4d', // 4
        '#4dff4d'  // 5 - Great
      ];
      document.querySelector('.account-popup').style.backgroundColor = colors[moodValue];
    }
  };
}