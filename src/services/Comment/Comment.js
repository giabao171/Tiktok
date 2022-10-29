import * as httpRequest from '~/utils/httpRequest';

export const get = async (id, page, token) => {
    try {
        const res = await httpRequest.get(`videos/${id}/comments`, {
            params: {
                page: `${page}`,
            },
            headers: { Authorization: `Bearer ${token}` },
        });
        return res;
    } catch (error) {
        console.log(error);
    }
};

export const post = async (idVideo, data = {}, token) => {
    try {
        const res = await httpRequest.post(`videos/${idVideo}/comments`, data, {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`,
            },
        });
        return res;
    } catch (error) {
        console.log(error);
    }
};

export const del = async (idCmt, token) => {
    try {
        const res = await httpRequest.del(`comments/${idCmt}`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        return res;
    } catch (error) {
        console.log(error);
    }
};
