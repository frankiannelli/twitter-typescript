import React, { SyntheticEvent, FormEvent, ChangeEvent } from 'react';
import { connect } from 'react-redux';
import { User, fetchUsers } from '../actions';
import { StoreState } from '../reducers';
import { Link } from 'react-router-dom';

interface HomeProps {
    users: User[];
    fetchUsers: Function;
}

interface HomeState {
    fetching: boolean;
    searchBy: string;
    searchValue: string;
}

class HomeContainer extends React.Component<HomeProps, HomeState> {
    constructor(props: HomeProps) {
        super(props);

        this.state = {
            fetching: false,
            searchBy: 'name',
            searchValue: '',
        };
    }

    componentDidUpdate(prevProps: HomeProps): void {
        if (prevProps.users[0]?.id !== this.props.users[0]?.id) {
            this.setState({ fetching: false });
        }
    }

    onButtonClick = (event: SyntheticEvent): void => {
        event.preventDefault();
        this.props.fetchUsers(this.state.searchValue, this.state.searchBy);
        this.setState({ fetching: true });
    };

    handleNameChange = (event: FormEvent<HTMLInputElement>): void => {
        this.setState({ searchValue: event.currentTarget.value });
    };

    handleSearchSelect = (event: ChangeEvent<HTMLSelectElement>): void => {
        this.setState({ searchBy: event.currentTarget.value });
    };

    renderList(): JSX.Element[] {
        return this.props.users?.map((user: User) => {
            return (
                <div key={user.id}>
                    <Link to={`user/${user.id}`}>{user.userName}</Link>
                </div>
            );
        });
    }

    public render(): React.ReactNode {
        return (
            <div className="container">
                <h1 className="py-5 mb-5">Twitter User Search</h1>
                <form>
                    <div className="form-group">
                        <label htmlFor="searchInput">Search For User</label>
                        <input
                            id="searchInput"
                            className="form-control"
                            placeholder="Barrack Obama"
                            type="text"
                            value={this.state.searchValue}
                            onChange={this.handleNameChange}
                        />
                    </div>
                    <div className="form-group my-3">
                        <label htmlFor="searchType">Search By</label>
                        <select
                            id="searchType"
                            className="form-control"
                            value={this.state.searchBy}
                            onChange={this.handleSearchSelect}
                        >
                            <option value="name">User</option>
                            <option value="location">Location</option>
                        </select>
                    </div>
                    <div className="form-group">
                        <button
                            type="submit"
                            className="btn btn-primary"
                            disabled={!this.state.searchValue}
                            onClick={this.onButtonClick}
                        >
                            Search for users
                        </button>
                    </div>
                </form>
                {this.state.fetching && (
                    <div className="spinner-border" role="status">
                        <span className="sr-only">Loading...</span>
                    </div>
                )}
                {this.renderList()}
            </div>
        );
    }
}

const mapStateToProps = ({ users }: StoreState): { users: User[] } => {
    return { users };
};

export const Home = connect(mapStateToProps, { fetchUsers })(HomeContainer);
