/* Product analytics for ahoy.ooo. The project token is public by design. */
(function loadPostHog() {
  var script = document.createElement('script');
  script.src = 'https://us.i.posthog.com/static/array.js';
  script.async = true;
  script.onload = function () {
    window.posthog.init('phc_AQpj6Ww2gYqdNNXcmqSRwpu8imDC7soPvS8YrXZpC8eX', {
      api_host: 'https://us.i.posthog.com',
      defaults: '2026-05-30',
      person_profiles: 'identified_only'
    });
  };
  document.head.appendChild(script);
}());
