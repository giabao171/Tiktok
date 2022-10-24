import * as httpRequest from '~/utils/httpRequest';

export const suggestAcount = async (page) => {
    try {
        const res = await httpRequest.get(`users/suggested`, {
            params: {
                page,
            },
        });
        return res.data;
    } catch (error) {
        console.log(error);
    }
};
