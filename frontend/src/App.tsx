import React from 'react';
import { Details } from './containers/Details';
import { Home } from './containers/Home';
import { Route, BrowserRouter as Router } from 'react-router-dom';

export class App extends React.Component {
    public render(): React.ReactNode {
        return (
            <Router>
                <div>
                    <Route exact path="/" component={Home} />
                    <Route exact path="/user/:id" component={Details} />
                </div>
            </Router>
        );
    }
}
