        fetch('data/cableSchedule.json')
            .then(response => response.json())
            .then(data => {
                const table = document.querySelector('#cable-schedule-table tbody');
                data.forEach(item => {
                    const row = document.createElement('tr');

                    const timeCell = document.createElement('td');
                    timeCell.textContent = item.time;
                    row.appendChild(timeCell);

                    const blockNameCell = document.createElement('td');
                    blockNameCell.textContent = item.blockName;
                    row.appendChild(blockNameCell);

                    const descriptionCell = document.createElement('td');
                    descriptionCell.textContent = item.description;
                    row.appendChild(descriptionCell);

                    table.appendChild(row);
                });
            })
            .catch(error => console.error('Error:', error));