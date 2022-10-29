import * as httpRequest from '~/utils/httpRequest';

export const videoService = async (page, type, token) => {
    try {
        const res = await httpRequest.get(`videos`, {
            params: {
                page: `${page}`,
                type: `${type}`,
            },
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        return res.data;
    } catch (error) {
        console.log(error);
    }
};
