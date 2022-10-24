import React, { forwardRef, memo } from 'react';
import classNames from 'classnames/bind';
import styles from './Video.module.scss';

const cx = classNames.bind(styles);

const Video = (
    { className, src, type = 'video/mp4', onTimeUpdate, onMouseEnter, onMouseLeave, square, autoPlay },
    ref,
) => {
    const classes = cx('video-rne', {
        [className]: className,
        square,
    });

    return (
        <div className={classes}>
            <video
                src={src}
                type={type}
                ref={ref}
                width="100%"
                loop
                onTimeUpdate={onTimeUpdate}
                onMouseEnter={onMouseEnter}
                onMouseLeave={onMouseLeave}
                autoPlay
            />
        </div>
    );
};

export default memo(forwardRef(Video));
