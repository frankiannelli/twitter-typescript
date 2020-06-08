import React from 'react';
import { Provider } from 'react-redux';
import renderer from 'react-test-renderer';
import configureMockStore from 'redux-mock-store';
import { Home } from './Home';

const mockStore = configureMockStore();
const store = mockStore({
    fetching: false,
    searchBy: 'name',
    searchValue: '',
});

describe('Home Component', () => {
    it('should render without throwing an error', () => {
        const component = renderer.create(
            <Provider store={store}>
                <Home />
            </Provider>,
        );
        expect(component.toJSON()).toMatchSnapshot();
    });
});
