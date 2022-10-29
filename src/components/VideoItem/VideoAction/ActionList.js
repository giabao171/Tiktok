import React, { useState } from 'react';
import classNames from 'classnames/bind';
import styles from './VideoAction.module.scss';
import Button from '~/Button/Button';
import { HeartIcon, PrimaryHeartIcon, CommentIcon, ShareIcon } from '~/components/icons/Icons';
import ShareMenu from '~/components/Popper/ShareActionMenu/ShareMenu';
import * as VideoLike from '~/services/Video/LikeVideo';

import { useHook } from '~/hooks/useHook';
import { Link } from 'react-router-dom';

const cx = classNames.bind(styles);

const ActionList = ({ item, currentPage }) => {
    const { SHARE_LIST, currentUser, setShowLogin } = useHook();

    const [videoLiked, setVideoLiked] = useState(item.is_liked);
    const [numOfLiked, setNumOfLiked] = useState(item.likes_count);

    const handleLikeVideo = () => {
        try {
            setVideoLiked(!videoLiked);
            setNumOfLiked((prev) => prev + 1);
            VideoLike.like(item.id, item.uuid, currentUser.meta.token);
        } catch (error) {
            console.log(error);
        }
    };

    const handleUnLikeVideo = () => {
        try {
            setVideoLiked(!videoLiked);
            setNumOfLiked((prev) => prev - 1);
            VideoLike.unlike(item.id, item.uuid, currentUser.meta.token);
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <div className={cx('action-list-wrapper')}>
            {videoLiked === true && !!currentUser === true ? (
                <Button
                    circle
                    topIcon={<PrimaryHeartIcon />}
                    onClick={() => {
                        // setLike(!like);
                        // console.log(item.is_liked);
                        handleUnLikeVideo();
                    }}
                >
                    {numOfLiked}
                </Button>
            ) : videoLiked === false && !!currentUser === true ? (
                <Button
                    circle
                    topIcon={<HeartIcon />}
                    onClick={() => {
                        // setLike(!like);
                        // console.log(item.is_liked);
                        handleLikeVideo();
                    }}
                >
                    {numOfLiked}
                </Button>
            ) : (
                <Button
                    circle
                    topIcon={<HeartIcon />}
                    onClick={() => {
                        // setLike(!like);
                        // console.log(item.is_liked);
                        // handleLikeVideo();
                        setShowLogin(true);
                    }}
                >
                    {numOfLiked}
                </Button>
            )}
            {!!currentUser ? (
                <Link to={`@${item.user.nickname}/${item.id}/suggest/${currentPage}`}>
                    <Button circle topIcon={<CommentIcon />}>
                        {item.comments_count}
                    </Button>
                </Link>
            ) : (
                <Button circle topIcon={<CommentIcon />} onClick={() => setShowLogin(true)}>
                    {item.comments_count}
                </Button>
            )}
            <ShareMenu items={SHARE_LIST} footer>
                <Button circle topIcon={<ShareIcon />}>
                    {item.shares_count}
                </Button>
            </ShareMenu>
            {/* <Button circle topIcon={<ShareIcon />}>
                12
            </Button> */}
        </div>
    );
};

export default ActionList;
