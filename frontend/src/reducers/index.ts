import { combineReducers } from 'redux';
import { usersReducer } from './users';
import { tweetsReducer } from './tweets';
import { Tweet, User } from '../actions';

export interface StoreState {
    users: User[];
    tweets: Tweet[];
}

export const reducers = combineReducers<StoreState>({
    users: usersReducer,
    tweets: tweetsReducer,
});
