import React, { forwardRef, useEffect, useRef, useState } from 'react';
import classNames from 'classnames/bind';
import styles from '../Video.module.scss';
import { PauseIcon, PlayIcon, VolumeIcon, VolumeMuteIcon, FlagIcon } from '~/components/icons/Icons';
import { useHook } from '~/hooks/useHook';
const cx = classNames.bind(styles);

const VideoControl = ({ className }, ref) => {
    const { mutedGlobal, setMutedGlobal, volumeValueGlobal, setVolumeValueGlobal } = useHook();

    const [play, setPlay] = useState(true);
    const [muted, setMuted] = useState(true);
    // const [volumeValue, setVolumeValue] = useState(1);

    const volumeValueRef = useRef();

    const classes = cx({
        [className]: className,
    });

    const handlePlay1 = () => {
        // ref.current.play();
        if (play) {
            ref.current.pause();
            // setPlay(false);
        } else {
            ref.current.play();
            // setPlay(true);
        }
    };

    const handleMuted = () => {
        if (muted) {
            ref.current.muted = true;
            setMuted(false);
            setMutedGlobal(false);
        } else {
            ref.current.muted = false;
            setMuted(true);
            setMutedGlobal(true);
        }
    };

    const handleChangeVolumeValue = (e) => {
        let value = e.target.value;
        if (value < 0.15) value = 0.0;
        setVolumeValueGlobal(value);
        ref.current.volume = volumeValueGlobal;
    };

    useEffect(() => {
        let options = {
            rootMargin: '0px 0px -200px 0px',
            threshold: [0.45, 0.75],
        };

        let handlePlay = (entries, observer) => {
            entries.forEach((entry, index) => {
                if (entry.isIntersecting) {
                    // console.log(play);
                    // console.log('chạy lại video');
                    ref.current && ref.current.play();
                    setPlay(true);
                } else {
                    ref.current && ref.current.pause();
                }
            });
        };

        let observer = new IntersectionObserver(handlePlay, options);

        observer.observe(ref.current);
        // console.log('render lai useEffect');
    }, []);

    //cho nút volume khi nhấn
    useEffect(() => {
        if (mutedGlobal === false) {
            ref.current.muted = true;
            setMuted(false);
            setVolumeValueGlobal(0.0);
            // console.log('re-render global');
        } else {
            ref.current.muted = false;
            //chưa xử lý đc 0.5
            setVolumeValueGlobal(0.5);
            setMuted(true);
        }
    }, [mutedGlobal]);

    //khi thay đổi volume bằng input
    useEffect(() => {
        if (volumeValueGlobal != 0.0) {
            ref.current.volume = volumeValueGlobal;
            ref.current.muted = false;
            setMuted(true);
        } else {
            ref.current.volume = volumeValueGlobal;
            ref.current.muted = true;
            setMuted(false);
            setVolumeValueGlobal(0.0);
        }

        // console.log(volumeValueGlobal);
    }, [volumeValueGlobal]);

    //custom thump cua volume
    return (
        <div className={classes}>
            <div className={cx('report-content')}>
                <p className={cx('report-title')}>
                    <span className={cx('flag-icon')}>
                        <FlagIcon />
                    </span>
                    Report
                </p>
            </div>
            <div className={cx('vieo-control')}>
                <div
                    className={cx('play-pause-btn')}
                    onClick={() => {
                        setPlay(!play);
                        handlePlay1();
                    }}
                >
                    {play ? <PauseIcon /> : <PlayIcon />}
                </div>
                {/* <div className={cx('range-video')}></div> */}
                <div className={cx('volume-control')} onClick={handleMuted}>
                    <div className={cx('wrapper-volume-range')}>
                        <input
                            className={cx('range-volume')}
                            type="range"
                            min="0"
                            max="1"
                            step="0.01"
                            value={volumeValueGlobal}
                            onChange={(e) => {
                                handleChangeVolumeValue(e);
                                e.stopPropagation();
                            }}
                            onClick={(e) => {
                                e.stopPropagation();
                            }}
                        />
                    </div>
                    <div onClick={handleMuted}>{muted ? <VolumeIcon /> : <VolumeMuteIcon />}</div>
                </div>
            </div>
        </div>
    );
};

export default forwardRef(VideoControl);
