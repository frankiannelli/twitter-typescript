/* eslint-disable @typescript-eslint/no-explicit-any */
import { APIGatewayProxyHandler } from 'aws-lambda';
import { ResponseData } from 'twitter';
import { twitterClient } from '../clients/twitter';

interface LocationData extends ResponseData {
  id: string;
  userName: string;
  handle: string;
  profileImage: string;
  followerCount: string;
  result: {
    places: Array<any>;
  };
}

export const handler: APIGatewayProxyHandler = async (event) => {
  console.log('event:', event);
  try {
    const getLocation = async (
      searchLocation: string,
    ): Promise<LocationData[]> => new Promise((resolve, reject) => {
      twitterClient.get(
        'geo/search.json',
        { query: searchLocation },
        (error, locationData: LocationData) => {
          if (error) {
            reject(error);
          }
          resolve(locationData.result.places);
        },
      );
    });

    const { searchLocation } = event.pathParameters;

    const locationData = await getLocation(searchLocation);

    if (!locationData.length) {
      return {
        statusCode: 404,
        headers: {
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Credentials': true,
        },
        body: JSON.stringify('not found'),
      };
    }

    const mappedLocationData = locationData.map((user) => ({
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
      body: JSON.stringify(mappedLocationData),
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
