import React, { useEffect, useState, memo } from 'react';
import classNames from 'classnames/bind';
import styles from './ProfileContent.module.scss';
import { useLocation, useParams } from 'react-router-dom';
import * as accountUserInfo from '~/services/accountUserService';
import Image from '~/components/images/Image';
import Button from '~/Button/Button';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheckCircle, faLink } from '@fortawesome/free-solid-svg-icons';
import { EditProfileIcon, ShareSolidIcon, ThreePointIcon } from '~/components/icons/Icons';
import ShareMenu from '~/components/Popper/ShareActionMenu/ShareMenu';
import Menu from '~/components/Popper/Menu/Menu';
import VideoReviewOfAcc from '~/components/VideoReviewOfAcc/VideoReviewOfAcc';
import { useHook } from '~/hooks/useHook';
import EditProfileModal from '../EditProfileModal/EditProfileModal';

const cx = classNames.bind(styles);

const ProfileContent = () => {
    const { SHARE_LIST, EVALUTE_LIST, currentUser } = useHook();

    const { nickname } = useParams();

    const [userInfo, setUserinfo] = useState({});
    const [showEditProfile, setShowEditProfile] = useState(false);

    useEffect(() => {
        const fetch = async () => {
            try {
                const result = await accountUserInfo.accountUserService(nickname);
                setUserinfo(result);
            } catch (error) {
                setUserinfo({});
            }
        };
        fetch();
    }, [nickname]);

    // useEffect(() => {
    //     setcurrentListVideo(userInfo.videos);
    // });

    // console.log(currentListVideo);

    return (
        <div className={cx('wrapper')}>
            <div className={cx('acount-desc')}>
                <div className={cx('acount-view')}>
                    <Image className={cx('avatar')} src={userInfo.avatar} />
                    <div className={cx('acount-name')}>
                        <div className={cx('nick-name')}>
                            <h2>
                                {userInfo.nickname}
                                {userInfo.tick && (
                                    <span className={cx('check-icon')}>
                                        <FontAwesomeIcon icon={faCheckCircle} />
                                    </span>
                                )}
                            </h2>
                        </div>
                        <p>{userInfo.first_name + ` ` + userInfo.last_name}</p>
                        {currentUser !== null && currentUser.data.id === userInfo.id ? (
                            <Button
                                rounded
                                small
                                className={cx('edit-btn')}
                                leftIcon={<EditProfileIcon />}
                                onClick={() => setShowEditProfile(true)}
                            >
                                Edit profile
                            </Button>
                        ) : (
                            <Button primary large className={cx('btn')}>
                                Follow
                            </Button>
                        )}
                    </div>
                </div>
                <div className={cx('number-desc')}>
                    <strong>{userInfo.followings_count}</strong>
                    <span>Following</span>
                    <strong>{userInfo.followers_count}</strong>
                    <span>Follower</span>
                    <strong>{userInfo.likes_count}</strong>
                    <span>likes</span>
                </div>
                <div className={cx('bio')}>
                    <p>{userInfo.bio}</p>
                </div>
                <div className={cx('link')}>
                    <FontAwesomeIcon icon={faLink} />
                    <a to={userInfo.website_url}>{userInfo.website_url}</a>
                </div>
                <ShareMenu items={SHARE_LIST} footer>
                    <div className={cx('share-btn')}>
                        <ShareSolidIcon />
                    </div>
                </ShareMenu>
                <Menu items={EVALUTE_LIST} placement="bottom">
                    <div className={cx('more-btn')}>
                        <ThreePointIcon />
                    </div>
                </Menu>
            </div>
            <div className={cx('video-of-acount')}>
                <VideoReviewOfAcc userInfo={userInfo} />
            </div>
            {showEditProfile && <EditProfileModal setShowEditProfile={setShowEditProfile} />}
        </div>
    );
};

export default memo(ProfileContent);
