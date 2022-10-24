import axios from 'axios';

const httpRequest = axios.create({
    baseURL: 'https://tiktok.fullstack.edu.vn/api/',
    headers: {
        'Content-Type': 'application/json',
    },
});

export const get = async (path, option = {}) => {
    const response = await httpRequest.get(path, option);

    return response.data;
};

export const post = async (path, data = {}, headers = {}) => {
    const response = await httpRequest.post(path, data, headers);

    return response.data;
};

export default httpRequest;
