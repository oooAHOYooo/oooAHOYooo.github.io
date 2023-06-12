Vue.component('merit-badge-table', {
    template: `
      <div class="merit-badge-table">
        <table>
          <thead>
            <tr>
            <th>Description</th>
             
              <th>Merit Badge Name</th>
              <th>Has Merit Badge?</th>
              <th>Merit Number</th>
              
            </tr>
          </thead>
          <tbody>
            <tr v-for="(badge, index) in badges" :key="index">
            <td>{{ badge.description }}</td>  
           
              <td>{{ badge.name }}</td>
             
              <td>
                <div :class="{'badge-status': badge.hasBadge, 'no-badge-status': !badge.hasBadge}">
                  {{ badge.hasBadge ? 'Yes' : 'No' }}
                </div>
              </td>
               <td>{{ badge.numberIssued }}</td>
            </tr>
          </tbody>
        </table>
      </div>
    `,
    data() {
      return {
        badges: [
          {
            numberIssued: 1,
            name: 'Became a Member',
            description: 'Became a Member of Ahoy Indie Media',
            hasBadge: true
          },
          {
            numberIssued: 2,
            name: 'Guest on The Rob Show',
            description: 'You were a guest on the Rob Show and have bragging rights for life',
            hasBadge: false
          },
          {
            numberIssued: 3,
            name: 'Badge 3',
            description: 'Description of Badge 3',
            hasBadge: true
          },

          {
            numberIssued: 4,
            name: 'Found a sticker',
            description: 'In the wild of the world - you have found a sticker and have successfully e-mailed it to sticker@ahoy.ooo',
            hasBadge: false
          },
          {
            numberIssued: 5,
            name: 'Met Rob Meglio',
            description: 'You have officially met Rob Meglio in real life',
            hasBadge: true
          },
          // Add more badges as needed
        ]
      };
    }
  });
  