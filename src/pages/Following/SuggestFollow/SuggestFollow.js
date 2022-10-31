import React, { useEffect, useState } from 'react';
import classNames from 'classnames/bind';
import styles from './SuggestFollow.module.scss';
import * as videoService from '~/services/videoService';
import SuggestFLItem from '../SuggestFLItem/SuggestFLItem';

const cx = classNames.bind(styles);

const SuggestFollow = () => {
    const [suggestFollowList, setSuggestFollowList] = useState([]);

    useEffect(() => {
        const fetch = async () => {
            try {
                const res = await videoService.videoService(10, 'for-you');
                setSuggestFollowList(res);
            } catch (error) {
                console.log(error);
            }
        };
        fetch();
    }, []);

    return (
        <div className={cx('suggest-fl-wrapper')}>
            {suggestFollowList.map((item, index) => (
                <SuggestFLItem key={index} item={item} />
            ))}
        </div>
    );
};

export default SuggestFollow;
