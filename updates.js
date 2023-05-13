var ahoyUpdates = new Vue({
    el: '#updates-ahoy-app',
    data: {
      months: [
        {
          displayText: "May 2023",
          updates: [
            { text: "Working on", bold: true },
            { text: "1. The Marketplace functioning (custom baby)", },
            {
              text:
                '2. Live Shows - up and running - but debating if we should really even have "live shows" instead would people be down for "Yesterday shows?"',
              image: 'https://via.placeholder.com/300'
            },
            { text: "Pumped about", bold: true },
            {
              text:
                "Met some great artists at Gather - going to put their music on the radio - Riddle M + Justin Arena",
              image: 'https://via.placeholder.com/300'
            },
            { text: "Special News", bold: true },
            { text: 'Ellen Martin joins the party as the radio "Station Manager"', image: 'https://via.placeholder.com/300' }
          ]
        },
        {
          displayText: "April 2023",
          updates: [
            { text: "Began Development on New Web Application", image: 'https://via.placeholder.com/300' },
            { text: "New Rob Show Episodes Planned", image: 'https://via.placeholder.com/300' },
            { text: "got the radio working", image: 'https://via.placeholder.com/300' }
          ]
        }
      ]
    }
  });