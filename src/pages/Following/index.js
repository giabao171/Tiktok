import React from 'react';
import classNames from 'classnames/bind';
import styles from './Following.module.scss';
import VideoContent from '../Home/VideoContent/VideoContent';
import { useHook } from '~/hooks/useHook';
import SuggestFollow from './SuggestFollow/SuggestFollow';

const cx = classNames.bind(styles);

const Following = () => {
    const { currentUser } = useHook();

    return (
        <div className={cx('following-wrapper')}>
            {!!currentUser !== false ? <VideoContent type="following" /> : <SuggestFollow />}
        </div>
    );
};

export default Following;
