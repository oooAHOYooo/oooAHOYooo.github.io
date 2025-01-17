function userMood() {
  return {
    mood: 3, // Default mood value
    moodHistory: [], // Array to store mood history
    init() {
      // Initialize mood from local storage or set to default
      this.mood = localStorage.getItem('userMood') || 3;
      this.moodHistory = JSON.parse(localStorage.getItem('moodHistory')) || [];
      this.updatePetalColors(this.mood);
    },
    updateMood(value) {
      this.mood = value;
      localStorage.setItem('userMood', this.mood);
      this.updatePetalColors(this.mood);
    },
    saveMood() {
      const timestamp = new Date().toISOString();
      this.moodHistory.push({ mood: this.mood, timestamp });
      localStorage.setItem('moodHistory', JSON.stringify(this.moodHistory));
    },
    updatePetalColors(moodValue) {
      const colors = [
        '#e57373', // 0 - Not so great
        '#f06292', // 1
        '#ba68c8', // 2
        '#64b5f6', // 3
        '#4db6ac', // 4
        '#81c784'  // 5 - Great
      ];
      document.querySelectorAll('.petal').forEach(petal => {
        petal.setAttribute('fill', colors[moodValue]);
      });
    }
  };
}