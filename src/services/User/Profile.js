import * as httpRequest from '~/utils/httpRequest';

export const edit = (data, token) => {
    httpRequest.post('auth/me?_method=PATCH', data, {
        headers: {
            'Content-Type': 'multipart/form-data',
            Authorization: `Bearer ${token}`,
        },
    });
};
