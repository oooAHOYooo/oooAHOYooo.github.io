  document.addEventListener('DOMContentLoaded', function() {
    fetch('./data_static/cdBurn-instructions.json')
      .then(response => response.json())
      .then(data => {
        const instructionsList = document.getElementById('burn-instructions');
        data.instructions.forEach((instruction, index) => {
          const li = document.createElement('li');
          li.innerHTML = `<span style="font-weight: bold;">${index + 1}.</span> ${instruction}`;
          instructionsList.appendChild(li);
        });

        const descriptionDiv = document.getElementById('burn-description');
        data.description.forEach(paragraph => {
          const p = document.createElement('p');
          p.textContent = paragraph;
          descriptionDiv.appendChild(p);
        });
      })
      .catch(error => console.error('Error loading burn instructions:', error));
  });