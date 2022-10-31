import React, { useState } from 'react';
import classNames from 'classnames/bind';
import styles from './AcountPreview.module.scss';
import Button from '~/Button/Button';
import Image from '~/components/images/Image';
import * as FollowUser from '~/services/Follow/FolowUnFollow';
import { useHook } from '~/hooks/useHook';
import config from '~/configs';

import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheckCircle } from '@fortawesome/free-solid-svg-icons';

const cx = classNames.bind(styles);

const AcountPreview = ({ propSuggest, propVideo }) => {
    const { currentUser, setShowLogin } = useHook();
    const [suggetFollowed, setSuggetFollowed] = useState(propSuggest?.is_followed);
    const [videoFollowed, setVideoFollowed] = useState(propVideo?.user.is_followed);

    const handleUnFollow = (propId) => {
        try {
            setSuggetFollowed(!suggetFollowed);
            setVideoFollowed(!videoFollowed);
            FollowUser.unFollow(propId, currentUser.meta.token);
        } catch (error) {
            console.log(error);
        }
    };

    const handleFollow = (propId) => {
        try {
            setSuggetFollowed(!suggetFollowed);
            setVideoFollowed(!videoFollowed);
            FollowUser.follow(propId, currentUser.meta.token);
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <div className={cx('wrapper')}>
            {propSuggest && (
                <>
                    <div className={cx('header')}>
                        <Link to={`${config.routes.home}@${propSuggest.nickname}`} target="_blank">
                            <Image className={cx('avatar')} src={propSuggest.avatar} alt={propSuggest.nickname} />
                        </Link>
                        {/* <Button className={cx('fl-btn')} primary>
                            Follow
                        </Button> */}
                        {!!currentUser !== false && suggetFollowed === true ? (
                            <Button className={cx('fl-btn')} outline onClick={() => handleUnFollow(propSuggest.id)}>
                                Following
                            </Button>
                        ) : !!currentUser !== false && suggetFollowed === false ? (
                            <Button className={cx('fl-btn')} primary onClick={() => handleFollow(propSuggest.id)}>
                                Follow
                            </Button>
                        ) : (
                            <Button className={cx('fl-btn')} primary onClick={() => setShowLogin(true)}>
                                Follow
                            </Button>
                        )}
                    </div>
                    <div className={cx('body')}>
                        <Link to={`${config.routes.home}@${propSuggest.nickname}`} target="_blank">
                            <p className={cx('nick-name')}>
                                <strong>{propSuggest.nickname}</strong>
                                {propSuggest.tick && (
                                    <FontAwesomeIcon className={cx('check-icon')} icon={faCheckCircle} />
                                )}
                            </p>
                            <p className={cx('name')}>{propSuggest.first_name + ` ` + propSuggest.last_name}</p>
                        </Link>
                        <p className={cx('analytic')}>
                            <strong>{propSuggest.followers_count}</strong>
                            <span>Follower</span>
                            <strong>{propSuggest.likes_count}</strong>
                            <span>Likes</span>
                        </p>
                    </div>
                </>
            )}
            {propVideo && (
                <>
                    <div className={cx('header')}>
                        <Link to={`${config.routes.home}@${propVideo.user.nickname}`} target="_blank">
                            <Image className={cx('avatar')} src={propVideo.user.avatar} alt={propVideo.user.nickname} />
                        </Link>
                        {/* <Button className={cx('fl-btn')} outline>
                            Follow
                        </Button> */}
                        {!!currentUser !== false && videoFollowed === true ? (
                            <Button
                                className={cx('fl-btn', 'following')}
                                outline
                                onClick={() => handleUnFollow(propVideo?.user?.id)}
                            >
                                Following
                            </Button>
                        ) : !!currentUser !== false && videoFollowed === false ? (
                            <Button className={cx('fl-btn')} outline onClick={() => handleFollow(propVideo?.user?.id)}>
                                Follow
                            </Button>
                        ) : (
                            <Button className={cx('fl-btn')} outline onClick={() => setShowLogin(true)}>
                                Follow
                            </Button>
                        )}
                    </div>
                    <div className={cx('body')}>
                        <Link to={`${config.routes.home}@${propVideo.user.nickname}`} target="_blank">
                            <p className={cx('nick-name')}>
                                <strong>{propVideo.user.nickname}</strong>
                                {propVideo.user.tick && (
                                    <FontAwesomeIcon className={cx('check-icon')} icon={faCheckCircle} />
                                )}
                            </p>
                            <p className={cx('name')}>{propVideo.user.first_name + ` ` + propVideo.user.last_name}</p>
                        </Link>
                        <p className={cx('analytic')}>
                            <strong>{propVideo.user.followers_count}</strong>
                            <span>Follower</span>
                            <strong>{propVideo.user.likes_count}</strong>
                            <span>Likes</span>
                        </p>
                    </div>
                    <div className={cx('footer')}>
                        <div className={cx('line')}></div>
                        <p className={cx('footer-bio')}>{propVideo.user.bio}</p>
                    </div>
                </>
            )}
        </div>
    );
};

export default AcountPreview;
