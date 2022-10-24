import React, { useEffect } from 'react';
import { useHook } from '~/hooks/useHook';
import classNames from 'classnames/bind';
import styles from './Profile.module.scss';
import ProfileContent from './ProfileContent/ProfileContent';

const cx = classNames.bind(styles);

const Profile = () => {
    const { lessSideBar, setLessSideBar, largeHeader, setLargeHeader, setmarginContentDefault, currentVideo } =
        useHook();
    useEffect(() => {
        setLessSideBar(true);
        setLargeHeader(true);
        setmarginContentDefault(false);
    }, []);

    return (
        <div className={cx('wrapper')}>
            <ProfileContent />
        </div>
    );
};

export default Profile;
