// appConfig.js
const appConfig = {
  jsonPaths: {
    radioPlay: './data/true-radioPlay.json',
    mediaCollection: './data/mediaCollection.json',
    podcastCollection: './data/podcastCollection.json',
    // Add other JSON paths here
  },
  mediaPaths: {
    mp3UrlBase: 'https://ahoycollection.s3.us-east-2.amazonaws.com/',
    // Add other media paths or base URLs here
  }
};

export default appConfig;