import React from 'react';
import { connect } from 'react-redux';
import { StoreState } from '../reducers';
import { fetchTweets, Tweet, User } from '../actions';
import { Link, match } from 'react-router-dom';

interface UserParams {
    id: string;
}

interface UserProps {
    tweets: Tweet[];
    fetchTweets: Function;
    users: User[];
    required: string;
    match?: match<UserParams>;
}

interface UserState {
    fetching: boolean;
}

export class DetailsContainer extends React.Component<UserProps, UserState> {
    constructor(props: UserProps) {
        super(props);

        this.state = {
            fetching: true,
        };
    }
    componentDidMount() {
        const user = this.props.users.find((user) => user.id.toString(10) === this.props.match?.params.id);
        if (user) {
            this.props.fetchTweets(user?.id);
        }
    }

    componentDidUpdate(prevProps: UserProps): void {
        if (prevProps.tweets[0]?.text !== this.props.tweets[0]?.text) {
            this.setState({ fetching: false });
        }
    }

    public render(): React.ReactNode {
        const user = this.props.users.find((user) => user.id.toString(10) === this.props.match?.params.id);

        return (
            <div className="container">
                <h1 className="py-2 mb-2">User Details</h1>
                <h6 className="mt-4">
                    <Link to="/">Back to Search</Link>
                </h6>
                <div className="card" style={{ width: '18rem' }}>
                    {user?.profileImage && (
                        <img src={user?.profileImage} style={{ width: '4rem' }} className="card-img-top" alt="user" />
                    )}
                    <div className="card-body">
                        <h5 className="card-title">{user?.userName}</h5>
                        {user?.handle && <p className="card-text">Twitter Handle: {user?.handle}</p>}
                        {user?.followerCount && <p className="card-text">Follower Count: {user?.followerCount}</p>}
                    </div>
                </div>
                <h5 className="mt-4">Last 5 Tweets</h5>
                {this.state.fetching ? (
                    <div className="spinner-border" role="status">
                        <span className="sr-only">Loading...</span>
                    </div>
                ) : (
                    this.props.tweets.map((tweet) => (
                        <div key={tweet.text} className="card my-2">
                            <div className="card-body">
                                <p className="card-text">Twitter Handle: {tweet?.text}</p>
                            </div>
                        </div>
                    ))
                )}
            </div>
        );
    }
}

const mapStateToProps = ({ tweets, users }: StoreState): { tweets: Tweet[]; users: User[] } => {
    return { tweets, users };
};

export const Details = connect(mapStateToProps, { fetchTweets })(DetailsContainer);
