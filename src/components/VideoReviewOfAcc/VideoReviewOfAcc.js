import React, { useEffect, useRef, useState, memo } from 'react';
import classNames from 'classnames/bind';
import styles from './VideoReviewOfAcc.module.scss';
import Button from '~/Button/Button';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLock } from '@fortawesome/free-solid-svg-icons';
import VideoPreviewItem from './VideoPreviewItem/VideoPreviewItem';
import { useHook } from '~/hooks/useHook';

const cx = classNames.bind(styles);

const VideoReviewOfAcc = ({ userInfo }) => {
    const { currentListVideo, setcurrentListVideo } = useHook();

    const [videoType, setVideoType] = useState(true);
    const [likeType, setLikeType] = useState(false);
    const [lineChange, setLineChange] = useState(false);
    const lineRef = useRef();
    const videoRef = useRef();
    const likeRef = useRef();

    const onLineUnderChange = (x) => {
        lineRef.current.setAttribute('style', `transform: translateX(${x}%);`);
    };

    useEffect(() => {
        if (videoType === false && likeType === true) {
            onLineUnderChange(100);
        } else {
            onLineUnderChange(0);
        }
    }, [lineChange]);

    return (
        <div className={cx('wrapper')}>
            <div className={cx('video-type')}>
                <div
                    ref={videoRef}
                    className={cx('videos', 'type')}
                    onMouseEnter={() => {
                        onLineUnderChange(0);
                    }}
                    onMouseLeave={() => {
                        setLineChange(!lineChange);
                    }}
                    onClick={() => {
                        setVideoType(true);
                        setLikeType(false);
                    }}
                >
                    <Button className={cx('btn')}>Videos</Button>
                </div>
                <div
                    ref={likeRef}
                    className={cx('likes', 'type')}
                    onMouseEnter={() => {
                        onLineUnderChange(100);
                    }}
                    onMouseLeave={() => {
                        setLineChange(!lineChange);
                    }}
                    onClick={() => {
                        setVideoType(false);
                        setLikeType(true);
                    }}
                >
                    <Button className={cx('btn')} leftIcon={<FontAwesomeIcon icon={faLock} />}>
                        Likes
                    </Button>
                </div>
                <div className={cx('line-under')} ref={lineRef}></div>
            </div>
            <div className={cx('video-preview-box')}>
                {userInfo.videos?.map((item, index) => (
                    <VideoPreviewItem key={index} item={item} listPlaying={userInfo.videos} />
                ))}
            </div>
        </div>
    );
};

export default memo(VideoReviewOfAcc);
