  function makeDonation(amount) {
    if (amount === 'custom') {
      const customAmount = prompt('Enter your custom donation amount:');
      window.location.href = `https://donate.example.com/?amount=${customAmount}`;
    } else {
      window.location.href = `https://donate.example.com/?amount=${amount}`;
    }
  }

  function subscribeMonthly(amount) {
    window.location.href = `https://subscribe.example.com/?plan=${amount}monthly`;
  }