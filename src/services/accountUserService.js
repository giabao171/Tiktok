import * as httpRequest from '~/utils/httpRequest';

export const accountUserService = async (nick, token) => {
    try {
        const res = await httpRequest.get(`users/@${nick}`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        return res.data;
    } catch (error) {
        console.log(error);
    }
};
