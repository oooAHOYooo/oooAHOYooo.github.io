var ahoyUpdates = new Vue({
  el: '#updates-ahoy-app',
  data: {
    months: [
      {
        displayText: "June 2023",
        updates: [
          { text: "Tallboyz Premiere of New Film : Pantalones ", bold: true },
          { text: "Coming to Ahoy this summer"},
          { text: "Major website refactor", bold: true },
          { text: "Refactored the backend of the frontend - not from the ground up - which was nice - but attempted to make it more traditional HTML regarding the structure of the webapp - visually it will look the same - but now things have their own pages and homes and is much more reliable - not doing this via react or another framework - rather good old fashioned html - back to basics I suppose - but it does mean a tiny bit of a load time between pages - so I am considering doing a cheeky loading screen - in time, with more help on the team - we'll make everything super dymanic - appreciate the patience as we code this baby out"},
          { text: "the Team meets at Playwright", bold: true },
          { text: "We went to our favorite watering hole in Hamden, CT - the Playwright - and outlined some summer goals - got some cheeky bevs and a microsoft paid teams account"},
          { text: "Hunting down studio space", bold: true },
          { text: "Getting some studio space to record the Rob Show, Hold Video Editing Seshes, Meet with Artists - hoping to have it in New Haven" },
          { text: "Working on", bold: true },
          { text: "Creating an onDemand section for the Rob Show episodes" }
  

        ]
      },
      {
        displayText: "May 2023",
        updates: [
          { text: "Little Design Tweaks", bold: true },
          { text: "Updated Marketplace on Mobile + You can actually buy an item now on the marketplace (Ahoy Classic Sticker ((as it's the only one we presently have)))" },
          { text: "ROB SHOW EPISODE 2 Featuring Dave Gunn - Out Next Week on Cable!", superBold: true},
          { image: './images/Ahoy-Indie-Media---The-Rob-Show---Season-2---Episode-2---2023.png' },
          { text: "Subtle Improvments", bold: true },
          { text: "Mobile Responsiveness + Radio Redesign + Marketplace Improvements + Secret New Features about to be launched" },
          { text: "ROB SHOW EPISODE 1 OUT NOW on Cable!", superBold: true },
          { text: "Rob Show Season 2 - Episode 1 is out Wednesday May 17th - with Guest Tyler and Dave Gunn of the Tallboyz" },
          { image: './images/Ahoy-Indie-Media---The-Rob-Show---Season-2---Episode-1---2023.png' },
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
