const dev = {
    BACKEND_URL: 'http://localhost:4000/dev',
};

const prod = {
    BACKEND_URL: 'http://localhost:4000/dev',
};

const config = process.env.REACT_APP_STAGE === 'prod' ? prod : dev;

export default {
    ...config,
};
