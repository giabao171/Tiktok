import * as httpRequest from '~/utils/httpRequest';

export const follow = async (idUser, token) => {
    try {
        const res = await httpRequest.post(`users/${idUser}/follow`, idUser, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        return res;
    } catch (error) {
        console.log(error);
    }
};

export const unFollow = async (idUser, token) => {
    try {
        const res = await httpRequest.post(`users/${idUser}/unfollow`, idUser, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        return res;
    } catch (error) {
        console.log(error);
    }
};

export const getFollow = async (page, token) => {
    try {
        const res = await httpRequest.get(`me/followings?page=${page}`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        return res;
    } catch (error) {
        console.log(error);
    }
};
