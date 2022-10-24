import React, { useEffect } from 'react';
import classNames from 'classnames/bind';
import styles from './Home.module.scss';
import VideoContent from './VideoContent/VideoContent';
import { useHook } from '~/hooks/useHook';

const cx = classNames.bind(styles);
const Home = () => {
    const { lessSideBar, setLessSideBar, largeHeader, setLargeHeader, marginContentDefault, setmarginContentDefault } =
        useHook();
    useEffect(() => {
        setLessSideBar(false);
        setLargeHeader(false);
        setmarginContentDefault(true);
    }, []);

    return (
        <div className={cx('home-wrapper')}>
            <VideoContent />
        </div>
    );
};

export default Home;
