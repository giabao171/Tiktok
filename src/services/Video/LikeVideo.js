import * as httpRequest from '~/utils/httpRequest';

export const like = async (idVideo, uuid, token) => {
    try {
        const res = await httpRequest.post(`videos/${idVideo}/like`, uuid, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        return res;
    } catch (error) {
        console.log(error);
    }
};

export const unlike = async (idVideo, uuid, token) => {
    try {
        const res = await httpRequest.post(`videos/${idVideo}/unlike`, uuid, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        return res;
    } catch (error) {
        console.log(error);
    }
};
