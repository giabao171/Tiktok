import * as httpRequest from '~/utils/httpRequest';

export const login = async (user) => {
    try {
        const res = await httpRequest.post(`auth/login`, user);
        return res;
    } catch (error) {
        console.log(error);
    }
};
