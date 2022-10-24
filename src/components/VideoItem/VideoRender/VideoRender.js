import React, { useEffect, useRef, useState } from 'react';
import classNames from 'classnames/bind';
import styles from './Video.module.scss';
import Video from '../../video';
import VideoControl from './VideoControl/VideoControl';
import video from '../video147/kkk.mp4';
import Image from '~/components/images/Image';

const cx = classNames.bind(styles);

const VideoRender = ({ src = video, srcImage }) => {
    const videoRenderRef = useRef();
    const imgRef = useRef();

    useEffect(() => {
        let options = {
            rootMargin: '0px 0px -200px 0px',
            threshold: [0.45, 0.75],
        };

        let handlePlay = (entries, observer) => {
            entries.forEach((entry, index) => {
                if (entry.isIntersecting) {
                    imgRef.current && (imgRef.current.style.width = '0');
                } else {
                    imgRef.current && (imgRef.current.style.width = '100%');
                }
            });
        };

        let observer = new IntersectionObserver(handlePlay, options);

        observer.observe(imgRef.current);
    }, []);

    return (
        <div className={cx('wrapper')}>
            <Video className={cx('video-box')} src={src} type="video/mp4" ref={videoRenderRef} />
            <Image className={cx('image-box')} src={srcImage} ref={imgRef} />
            <VideoControl className={cx('control-wrapper')} ref={videoRenderRef} />
        </div>
    );
};

export default VideoRender;
