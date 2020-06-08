import { Tweet, Action, ActionTypes } from '../actions';

export const tweetsReducer = (state: Tweet[] = [], action: Action) => {
    switch (action.type) {
        case ActionTypes.fetchTweets:
            return action.payload;
        default:
            return state;
    }
};
