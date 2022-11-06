import React, { useRef, useState, useEffect } from 'react';
import classNames from 'classnames/bind';
import styles from './SuggestFLItem.module.scss';
import Image from '~/components/images/Image';
import Button from '~/Button/Button';
import { CheckIcon } from '~/components/icons/Icons';
import { useHook } from '~/hooks/useHook';
import Video from '~/components/video';
import config from '~/configs';

import { Link } from 'react-router-dom';

const cx = classNames.bind(styles);

const SuggestFLItem = ({ item }) => {
    const { setShowLogin } = useHook();
    const [playBg, setPlayBg] = useState(false);
    const videoRef = useRef();

    useEffect(() => {
        if (playBg === true) {
            if (videoRef.current) {
                // videoRef.current.muted = true;
                videoRef.current.play();
            }
        } else {
            if (videoRef.current) {
                // videoRef.current.muted = true;
                videoRef.current.pause();
            }
        }
    }, [playBg]);

    return (
        <Link to={`${config.routes.home}@${item.user.nickname}`} target="_blank">
            <div
                className={cx('wrapper-card')}
                onMouseEnter={(e) => {
                    setPlayBg(true);
                    e.stopPropagation();
                }}
                onMouseLeave={(e) => {
                    setPlayBg(false);
                    e.stopPropagation();
                }}
            >
                <div className={cx('video-card')} style={{ backgroundImage: `url(${item.thumb_url})` }}>
                    {/* {
                        playBg === true && <Video src={playBg ? item.file_url : `#`} muted={true} ref={videoRef} />
                        // : (
                        //     <Image className={cx('img-thumb')} src={item.thumb_url} />
                        // )
                    } */}
                    <Video src={playBg ? item.file_url : `#`} muted={true} ref={videoRef} />
                </div>
                <div className={cx('card-desc')}>
                    <div className={cx('avatar-box')}>
                        <Image className={cx('avatar')} src={item.user.avatar} />
                    </div>
                    <h5 className={cx('nickname')}>{item.user.nickname}</h5>
                    <div className={cx('fullname-part')}>
                        <span className={cx('fullname')}>{`${item.user.first_name} ${item.user.last_name}`}</span>
                        {item.user.tick && <span className={cx('check-icon')}>{<CheckIcon />}</span>}
                    </div>
                    <Button primary className={cx('fl-btn')} onClick={() => setShowLogin(true)}>
                        Follow
                    </Button>
                </div>
            </div>
        </Link>
    );
};

export default SuggestFLItem;
