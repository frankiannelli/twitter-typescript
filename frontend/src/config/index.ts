const dev = {
    BACKEND_URL: 'http://localhost:4000/dev',
    JSON_URL: 'https://jsonplaceholder.typicode.com/todos',
};

const prod = {
    BACKEND_URL: 'http://localhost:4000/dev',
    JSON_URL: 'https://jsonplaceholder.typicode.com/todos',
};

const config = process.env.REACT_APP_STAGE === 'prod' ? prod : dev;

export default {
    ...config,
};
