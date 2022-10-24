import * as httpRequest from '~/utils/httpRequest';

export const accountUserService = async (nick) => {
    try {
        const res = await httpRequest.get(`users/@${nick}`, {});
        return res.data;
    } catch (error) {
        console.log(error);
    }
};
