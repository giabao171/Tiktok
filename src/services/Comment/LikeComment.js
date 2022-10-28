import * as httpRequest from '~/utils/httpRequest';

export const likeComment = async (idComment, token) => {
    try {
        const res = await httpRequest.post(`comments/${idComment}/like`, idComment, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        return res;
    } catch (error) {
        console.log(error);
    }
};

export const unLikeComment = async (idComment, token) => {
    try {
        const res = await httpRequest.post(`comments/${idComment}/unlike`, idComment, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        return res;
    } catch (error) {
        console.log(error);
    }
};
