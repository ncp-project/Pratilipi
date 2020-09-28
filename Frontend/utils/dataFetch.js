import fetch from 'isomorphic-fetch';
import Cookies from 'universal-cookie';

const cookies = new Cookies();

// const API_URL = 'http://localhost:8000';
const API_URL = 'http://127.0.0.1:8000/';

export default ({ query, variables, token }) => {
    const body = {
        query,
        variables,
    };

    if(!token)
    {
        token = cookies.get('token');
    }

    const apiConfig = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            Authorization: token ? `JWT ${token}` : null,
        },
        body: JSON.stringify(body),
    };

    return fetch(API_URL, apiConfig).then(function(response) {
        const contentType = response.headers.get('content-type');
        if (response.ok) {
            if (contentType && contentType.indexOf('application/json') !== -1) {
                return response.json().then(json => json);
            }
            if (contentType && contentType.indexOf('text') !== -1) {
                return response.text().then(text => text);
            }
            return response;
        }
        console.error(`Response status ${response.status} during dataFetch for url ${response.url}.`);
        throw response;
    });
};
