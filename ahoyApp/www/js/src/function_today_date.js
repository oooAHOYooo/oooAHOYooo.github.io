          function formatDate(date) {
            const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
            const months = ["January", "February", "March", "April", "May", "June",
              "July", "August", "September", "October", "November", "December"];
            return `${days[date.getDay()]}, ${months[date.getMonth()]} ${date.getDate()}, ${date.getFullYear()}`;
          }

          // Function to convert year to Roman Numerals
          function romanize(num) {
            if (!+num)
              return false;
            var digits = String(+num).split(""),
                key = ["","C","CC","CCC","CD","D","DC","DCC","DCCC","CM",
                       "","X","XX","XXX","XL","L","LX","LXX","LXXX","XC",
                       "","I","II","III","IV","V","VI","VII","VIII","IX"],
                roman = "",
                i = 3;
            while (i--)
              roman = (key[+digits.pop() + (i * 10)] || "") + roman;
            return Array(+digits.join("") + 1).join("M") + roman;
          }

          // Display the current date and year in Roman Numerals
          document.addEventListener('DOMContentLoaded', (event) => {
            const currentDate = new Date();
            document.getElementById('calendar-date').textContent = formatDate(currentDate);
            document.getElementById('year-roman').textContent = "Year " + romanize(currentDate.getFullYear());
          });