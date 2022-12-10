import React, { useEffect, useState } from 'react';
import classNames from 'classnames/bind';
import styles from './CommentItem.module.scss';
import Image from '~/components/images/Image';
import Button from '~/Button/Button';
import {
    FlagBlackIcon,
    HeartPrimaryIcon,
    HeartSolidIcon,
    NextIcon,
    RecyclebinIcon,
    ThreePointIcon,
} from '~/components/icons/Icons';
import { DateConvert } from '~/DateConvert/DateConvert';
import { useHook } from '~/hooks/useHook';
import * as Comment from '~/services/Comment/LikeComment';
import * as GetComment from '~/services/Comment/Comment';

import Tippy from '@tippyjs/react/headless';
// import Tippy from '@tippyjs/react';
// import 'tippy.js/dist/svg-arrow.css';
import { roundArrow } from 'tippy.js';
const cx = classNames.bind(styles);

const CommentItem = ({ idvideo, commentPosted, setNumOfComment, userPostId }) => {
    const { currentUser, showLogin } = useHook();
    const [commentPage, setCommentPgae] = useState(1);
    const [liked, setLiked] = useState(false);
    const [deleted, setDeleted] = useState(false);
    const [listComment, setListComment] = useState([]);

    const DELETE = {
        icon: <RecyclebinIcon />,
        title: 'Delete',
    };

    const REPORT = {
        icon: <FlagBlackIcon />,
        title: 'Report',
    };

    // console.log(userPostId);

    useEffect(() => {
        const getCommentList = async () => {
            try {
                if (!!currentUser != false) {
                    const res = await GetComment.get(idvideo, commentPage, currentUser.meta.token);
                    // setListComment([...listComment, ...res.data]);
                    setListComment(res.data);
                }
            } catch (error) {
                console.log(error);
            }
        };

        getCommentList();
        // console.log(listComment);
    }, [idvideo, liked, commentPosted, deleted, showLogin]);

    const likeUnLike = (idvideo, isLiked) => {
        if (isLiked) {
            try {
                Comment.unLikeComment(idvideo, currentUser?.meta.token);
            } catch (error) {
                console.log(error);
            }
            setLiked(!liked);
        } else {
            try {
                Comment.likeComment(idvideo, currentUser?.meta.token);
            } catch (error) {
                console.log(error);
            }
            setLiked(!liked);
        }
    };

    const renderBtn = (reatItem, commentId) => {
        return (
            <div className={cx('reAt-btn-wrapper')} onClick={() => handleReatComment(reatItem, commentId)}>
                <span className={cx('icon')}>{reatItem.icon}</span>
                <span className={cx('title')}>{reatItem.title}</span>
            </div>
        );
    };

    const deleteComment = async (idCmt) => {
        try {
            const res = await GetComment.del(idCmt, currentUser.meta.token);
            setNumOfComment((prev) => prev - 1);
            return res;
        } catch (error) {
            console.log(error);
        }
    };

    const handleReatComment = (reAt, commentId) => {
        if (reAt.title === 'Delete') {
            deleteComment(commentId);
            setDeleted(!deleted);
        }
        // console.log(reAt.title);
    };

    return (
        <div className={cx('comment-item-model')}>
            {listComment.map((item, index) => (
                <div className={cx('comment-item')} key={index}>
                    <Image className={cx('comment-user-avatar')} src={item?.user.avatar} />
                    <div className={cx('name-comment')}>
                        {userPostId === item.user.id ? (
                            <h3>
                                {item?.user.nickname} . <span className={cx('creator-title')}>Creator</span>
                            </h3>
                        ) : (
                            <h3>{item?.user.nickname}</h3>
                        )}
                        <div className={cx('comment-content')}>
                            <p>{item?.comment}</p>
                        </div>
                        <div className={cx('day-post-reply')}>
                            <span className={cx('day-post')}>{DateConvert(item?.updated_at)}</span>
                            <span className={cx('rep-btn')}>reply</span>
                        </div>
                    </div>
                    <div className={cx('heart-of-comment')}>
                        {currentUser.data.id === item.user.id ? (
                            <Tippy
                                render={() => renderBtn(DELETE, item.id)}
                                interactive
                                placement="bottom"
                                arrow="true"
                            >
                                <span className={cx('comment-reAt')}>
                                    <ThreePointIcon />
                                </span>
                            </Tippy>
                        ) : (
                            <Tippy render={() => renderBtn(REPORT, item.id)} interactive placement="bottom">
                                <span className={cx('comment-reAt')}>
                                    <ThreePointIcon />
                                </span>
                            </Tippy>
                        )}
                        <Button className={cx('heart-comm-btn')} onClick={() => likeUnLike(item.id, item.is_liked)}>
                            <span>{item?.is_liked ? <HeartPrimaryIcon /> : <HeartSolidIcon />}</span>
                            <p>{item?.likes_count}</p>
                        </Button>
                        {/* <p>{item?.likes_count}</p> */}
                    </div>
                </div>
            ))}
            <div className={cx('load-more-btn')}>
                {currentUser && listComment.length > 9 && (
                    <Button
                        rightIcon={<NextIcon />}
                        className={cx('load-btn')}
                        onClick={() => setCommentPgae(commentPage + 1)}
                    >
                        Load more
                    </Button>
                )}
            </div>
        </div>
    );
};

export default CommentItem;
