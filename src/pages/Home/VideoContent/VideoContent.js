import React, { useEffect, useState } from 'react';
import classNames from 'classnames/bind';
import styles from '../Home.module.scss';
import PropTypes from 'prop-types';
import VideoItem from '~/components/VideoItem';
import * as videoService from '~/services/videoService';
import { useHook } from '~/hooks/useHook';

const cx = classNames.bind(styles);

const VideoContent = ({ className }) => {
    const [videoList, setVideoList] = useState([]);
    const [page, setPage] = useState(1);

    useEffect(() => {
        const fetch = async () => {
            try {
                const result = await videoService.videoService(page);
                setVideoList(result);
                // const result = await videoService.videoService(6);
                // setVideoList((prev = []) => [...prev, ...result]);
            } catch (error) {
                setVideoList([]);
            }
        };
        fetch();
    }, []);

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
            {videoList.map((item, index) => (
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
