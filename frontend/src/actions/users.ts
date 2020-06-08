import { Dispatch } from 'redux';
import axios from 'axios';
import { ActionTypes } from './types';
import config from '../config';

export interface User {
    id: number;
    userName: string;
    handle: string;
    profileImage: string;
    followerCount: number;
}

export interface FetchUsersAction {
    type: ActionTypes.fetchUsers;
    payload: User[];
}

const baseUrl = config.BACKEND_URL;

export const fetchUsers = (searchValue: string, searchBy: string) => {
    return async (dispatch: Dispatch) => {
        const response = await axios.get<User[]>(`${baseUrl}/user/${searchBy}/${searchValue}`);
        dispatch<FetchUsersAction>({
            type: ActionTypes.fetchUsers,
            payload: response.data,
        });
    };
};
