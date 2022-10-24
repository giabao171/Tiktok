import React, { useEffect, useRef, useState, memo } from 'react';
import classNames from 'classnames/bind';
import styles from './VideoPreviewItem.module.scss';

import Image from '~/components/images/Image';
import Video from '~/components/video';
import { SmallPlayIcon } from '~/components/icons/Icons';
import CommentVideo from '~/components/CommentVideo/CommentVideo';
import { useHook } from '~/hooks/useHook';
import { Link, useParams } from 'react-router-dom';
import config from '~/configs';

const cx = classNames.bind(styles);

const VideoPreviewItem = ({ item, listPlaying }) => {
    const { showComment, setShowComment } = useHook();

    const [play, setPlay] = useState(false);

    const videoRef = useRef();
    const imgRef = useRef();

    const { nickname } = useParams();

    useEffect(() => {
        if (play == true) {
            if (videoRef.current) {
                videoRef.current.muted = true;
                videoRef.current.play();
            }
        } else {
            if (videoRef.current) {
                videoRef.current.muted = true;
                videoRef.current.pause();
            }
        }
    }, [play]);

    // console.log(item.id);

    return (
        <>
            <Link to={`/@${nickname}/${item.id}/comment/none`}>
                {/* <Link to={config.routes.comment`/@${nickname}`}> */}
                <div
                    className={cx('wrapper')}
                    onMouseEnter={(e) => {
                        setPlay(true);
                        e.stopPropagation();
                    }}
                    onMouseLeave={(e) => {
                        setPlay(false);
                        e.stopPropagation();
                    }}
                    onClick={() => {
                        // setShowComment(true);
                        // setcurrentVideo(item);
                    }}
                >
                    <div className={cx('video-preview-item')}>
                        <Video ref={videoRef} className={cx('video')} src={play ? item.file_url : `#`} />
                        <Image ref={imgRef} className={cx('img-thumb')} src={item.thumb_url} />

                        <div className={cx('sum-of-watch')}>
                            <span>
                                <SmallPlayIcon />
                            </span>
                            <p>{item.views_count}</p>
                        </div>
                    </div>
                    <div className={cx('description')}>{item.description}</div>
                    {showComment == true && <CommentVideo item={item} listPlaying={listPlaying} />}
                </div>
            </Link>
            {/* {showComment == true && <CommentVideo item={currentVideo} />} */}
            {/* {showComment == true && <CommentVideo />} */}
            {/* <CommentVideo /> */}
            {/* {showComment == true && <CommentVideo item={item} listPlaying={listPlaying} />} */}
            {/* <CommentVideo item={item} listPlaying={listPlaying} /> */}
        </>
    );
};

export default memo(VideoPreviewItem);
