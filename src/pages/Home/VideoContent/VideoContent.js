import React, { useEffect, useState } from 'react';
import classNames from 'classnames/bind';
import styles from '../Home.module.scss';
import PropTypes from 'prop-types';
import VideoItem from '~/components/VideoItem';
import * as videoService from '~/services/videoService';
import { useHook } from '~/hooks/useHook';

const cx = classNames.bind(styles);

const VideoContent = ({ className, type }) => {
    const [videoList, setVideoList] = useState([]);
    const [page, setPage] = useState(1);
    const { currentUser, showLogin } = useHook();

    useEffect(() => {
        if (type === 'for-you') {
            const fetch = async () => {
                try {
                    if (currentUser !== null) {
                        const result = await videoService.videoService(page, 'for-you', currentUser.meta.token);
                        setVideoList(result);
                        // const result = await videoService.videoService(6);
                        // setVideoList((prev = []) => [...prev, ...result]);
                    } else {
                        const result = await videoService.videoService(page, 'for-you');
                        setVideoList(result);
                    }
                } catch (error) {
                    setVideoList([]);
                }
            };
            fetch();
        } else if (type === 'following') {
            if (!!currentUser !== false) {
                const fetch = async () => {
                    try {
                        const result = await videoService.videoService(page, 'following', currentUser.meta.token);
                        setVideoList(result);
                        // const result = await videoService.videoService(6);
                        // setVideoList((prev = []) => [...prev, ...result]);
                    } catch (error) {
                        setVideoList([]);
                    }
                };
                fetch();
            }
        }
    }, [currentUser, showLogin]);

    // useEffect(() => {
    //     setTimeout(() => {
    //         setPage(page + 1);
    //     }, 5000);
    // }, [document.documentElement.scrollHeight]);

    // console.log(document.documentElement.scrollHeight);
    // console.log(page);
    // document.documentElement.scrollHeight

    // const scrollToBot = () => {
    //     const element = document;
    //     element.scrollTop = element.scrollHeight;
    // }

    return (
        <div className={cx('wrapper', className)}>
            {videoList?.map((item, index) => (
                <VideoItem key={index} item={item} curentPage={page} />
            ))}
            {/* <VideoItem srcVideo="https://files.fullstack.edu.vn/f8-tiktok/videos/178-63200ee3995e4.mp4" />
            <VideoItem />
            <VideoItem srcVideo="https://files.fullstack.edu.vn/f8-tiktok/videos/178-63200ee3995e4.mp4" />
            <VideoItem /> */}
        </div>
    );
};

VideoContent.propTypes = {
    className: PropTypes.string,
};

export default VideoContent;
