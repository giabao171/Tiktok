import * as httpRequest from '~/utils/httpRequest';

export const postVideo = async (data, token) => {
    try {
        const res = await httpRequest.post(`videos`, data, {
            headers: {
                'Content-Type': 'multipart/form-data',
                Authorization: `Bearer ${token}`,
            },
        });
        return res;
    } catch (error) {
        console.log(error);
    }
};
