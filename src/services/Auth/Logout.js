import * as httpRequest from '~/utils/httpRequest';

export const logout = async (id, token) => {
    try {
        const res = await httpRequest.post(`auth/logout`, id, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        return res.data;
    } catch (error) {
        console.log(error);
    }
};
