var ahoyUpdates = new Vue({
  el: '#updates-ahoy-app',
  data: {
    months: [
      {
        displayText: "May 2023",
        updates: [
          { text: "Subtle Improvments", bold: true },
          { text: "Mobile Responsiveness + Radio Redesign + Marketplace Improvements + Secret New Features about to be launched" },
          { text: "NEW ROB SHOW EPISODE OUT NOW!", superBold: true },
          { text: "Rob Show Season 2 - Episode 1 is out Wednesday May 17th - with Guest Tyler and Dave Gunn of the Tallboyz" },
          { image: './images/Ahoy-Indie-Media---The-Rob-Show---Season-2---Episode-1---2023.jpg' },
          { text: "Working on", bold: true },
          { text: "Getting The Marketplace functioning Right" },
          { text: "Getting the App to work on all screen sizes and all devices - but it's a pain in the booty - we at ahoy appreciate the patience." },
          {
            text:
              '2. Live Shows - up and running - but debating if we should really even have "live shows" instead would people be down for "Yesterday shows?"',
          },
          { text: "Pumped about", bold: true },
          {
            text:
              "Met some great artists at Gather - going to put their music on the radio - Riddle M + Justin Arena",
          },
          { text: "Special News", bold: true },
          { text: 'Ellen Martin joins the party as the radio "Station Manager"' },
        ]
      },
      {
        displayText: "April 2023",
        updates: [
          { text: "Began Development on New Web Application (the site you're looking at now)" },
          { text: "New Rob Show Episodes Planned for May 2023" },
          { text: "Got the basics of the radio working" }
        ]
      }
    ]
  }
});
