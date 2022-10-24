import * as httpRequest from '~/utils/httpRequest';

export const videoService = async (page, type = 'for-you') => {
    try {
        const res = await httpRequest.get(`videos`, {
            params: {
                page: `${page}`,
                type,
            },
        });
        return res.data;
    } catch (error) {
        console.log(error);
    }
};