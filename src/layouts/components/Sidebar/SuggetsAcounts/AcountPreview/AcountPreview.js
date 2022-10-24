import React from 'react';
import classNames from 'classnames/bind';
import styles from './AcountPreview.module.scss';

import Button from '~/Button/Button';
import Image from '~/components/images/Image';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheckCircle } from '@fortawesome/free-solid-svg-icons';
const cx = classNames.bind(styles);

const AcountPreview = ({ propSuggest, propVideo }) => {
    return (
        <div className={cx('wrapper')}>
            {propSuggest && (
                <>
                    <div className={cx('header')}>
                        <Image className={cx('avatar')} src={propSuggest.avatar} alt={propSuggest.nickname} />
                        <Button className={cx('fl-btn')} primary>
                            Follow
                        </Button>
                    </div>
                    <div className={cx('body')}>
                        <p className={cx('nick-name')}>
                            <strong>{propSuggest.nickname}</strong>
                            {propSuggest.tick && <FontAwesomeIcon className={cx('check-icon')} icon={faCheckCircle} />}
                        </p>
                        <p className={cx('name')}>{propSuggest.first_name + ` ` + propSuggest.last_name}</p>
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
                        <Image className={cx('avatar')} src={propVideo.user.avatar} alt={propVideo.user.nickname} />
                        <Button className={cx('fl-btn')} outline>
                            Follow
                        </Button>
                    </div>
                    <div className={cx('body')}>
                        <p className={cx('nick-name')}>
                            <strong>{propVideo.user.nickname}</strong>
                            {propVideo.user.tick && (
                                <FontAwesomeIcon className={cx('check-icon')} icon={faCheckCircle} />
                            )}
                        </p>
                        <p className={cx('name')}>{propVideo.user.first_name + ` ` + propVideo.user.last_name}</p>
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
