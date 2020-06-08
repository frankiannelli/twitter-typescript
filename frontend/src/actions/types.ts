import { FetchTweetsAction } from './tweets';
import { FetchUsersAction } from './users';

export enum ActionTypes {
    fetchTweets,
    fetchUsers,
}

export type Action = FetchUsersAction | FetchTweetsAction;
