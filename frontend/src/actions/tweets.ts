import { Dispatch } from 'redux';
import axios from 'axios';
import { ActionTypes } from './types';
import config from '../config';

export interface Tweet {
    text: string;
}

export interface FetchTweetsAction {
    type: ActionTypes.fetchTweets;
    payload: Tweet[];
}

const baseUrl = config.BACKEND_URL;

export const fetchTweets = (userId: number) => {
    return async (dispatch: Dispatch) => {
        const response = await axios.get<Tweet[]>(`${baseUrl}/tweets/${userId}`);
        dispatch<FetchTweetsAction>({
            type: ActionTypes.fetchTweets,
            payload: response.data,
        });
    };
};
