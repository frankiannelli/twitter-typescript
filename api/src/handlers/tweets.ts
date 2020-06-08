import { APIGatewayProxyHandler } from 'aws-lambda';
import { ResponseData } from 'twitter';
import { twitterClient } from '../clients/twitter';

interface TweetData extends ResponseData {
  text: string;
}

export const handler: APIGatewayProxyHandler = async (event) => {
  console.log('event:', event);
  try {
    const getTweets = async (userId: number): Promise<TweetData[]> => new Promise((resolve, reject) => {
      twitterClient.get(
        'statuses/user_timeline.json',
        { user_id: userId, count: 5 },
        (error, data: TweetData[]) => {
          if (error) {
            reject(error);
          }
          resolve(data);
        },
      );
    });

    const userId = parseInt(event.pathParameters.userId, 10);

    if (Number.isNaN(userId)) {
      return {
        statusCode: 400,
        headers: {
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Credentials': true,
        },
        body: JSON.stringify('bad request'),
      };
    }

    const tweetData = await getTweets(userId);

    if (!tweetData.length) {
      return {
        statusCode: 404,
        headers: {
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Credentials': true,
        },
        body: JSON.stringify('not found'),
      };
    }

    const mappedTweetData = tweetData.map((tweet) => ({ text: tweet.text }));

    return {
      statusCode: 200,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Credentials': true,
      },
      body: JSON.stringify(mappedTweetData),
    };
  } catch (err) {
    console.log(err);
    return {
      statusCode: 500,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Credentials': true,
      },
      body: JSON.stringify({
        message: 'Internal server error',
      }),
    };
  }
};
