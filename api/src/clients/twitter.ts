import Twitter from 'twitter';

const consumerKey = process.env.TWITTER_CONSUMER_KEY;
const consumerSecret = process.env.TWITTER_CONSUMER_SECRET;
const accessToken = process.env.TWITTER_ACCESS_TOKEN_KEY;
const accessTokenSecret = process.env.TWITTER_ACCESS_TOKEN_SECRET;

export const twitterClient = new Twitter({
  consumer_key: consumerKey,
  consumer_secret: consumerSecret,
  access_token_key: accessToken,
  access_token_secret: accessTokenSecret,
});
