import { APIGatewayProxyHandler } from 'aws-lambda';
import { ResponseData } from 'twitter';
import { twitterClient } from '../clients/twitter';

interface UserData extends ResponseData {
  id: string;
  name: string;
  handle: string;
  profileImage: string;
  followerCount: string;
}

export const handler: APIGatewayProxyHandler = async (event) => {
  console.log('event:', event);
  try {
    const getUsers = async (searchName: string): Promise<UserData[]> => new Promise((resolve, reject) => {
      twitterClient.get('users/search.json', { q: searchName }, (
        error,
        userData: UserData[],
      ) => {
        if (error) {
          reject(error);
        }
        resolve(userData);
      });
    });

    const { searchName } = event.pathParameters;

    const userData = await getUsers(searchName);

    if (!userData.length) {
      return {
        statusCode: 404,
        headers: {
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Credentials': true,
        },
        body: JSON.stringify('not found'),
      };
    }

    const mappedUserData = userData.map((user) => ({
      id: user.id,
      userName: user.name,
      handle: user.screen_name,
      profileImage: user.profile_image_url,
      followerCount: user.followers_count,
    }));

    return {
      statusCode: 200,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Credentials': true,
      },
      body: JSON.stringify(mappedUserData),
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
        message: 'internal server error',
      }),
    };
  }
};
