import React, { useEffect, useState } from 'react';
import classNames from 'classnames/bind';
import styles from './VideoItem.module.scss';
import Image from '../images/Image';
import VideoRender from './VideoRender/index';
import Button from '~/Button/Button';
import { Link, useNavigate } from 'react-router-dom';
import Tippy from '@tippyjs/react/headless';
import Hastag from '../Hastag';
import ActionList from './VideoAction/ActionList';
import { Wrapper as PopperWrapper } from '~/components/Popper';
import AcountPreview from '~/layouts/components/Sidebar/SuggetsAcounts/AcountPreview';
import { useHook } from '~/hooks/useHook';
import * as FollowUser from '~/services/Follow/FolowUnFollow';
import config from '~/configs';

const cx = classNames.bind(styles);

const VideoItem = ({ item, curentPage }) => {
    const { currentUser, setShowLogin } = useHook();
    const [followed, setFollowed] = useState(item.user.is_followed);
    const [listFollow, setListFollow] = useState([]);

    const navigate = useNavigate();

    const handleFollow = () => {
        try {
            setFollowed(!followed);
            FollowUser.follow(item.user.id, currentUser.meta.token);
        } catch (error) {
            console.log(error);
        }
    };

    const handleUnFollow = () => {
        try {
            setFollowed(!followed);
            FollowUser.unFollow(item.user.id, currentUser.meta.token);
        } catch (error) {
            console.log(error);
        }
    };

    const getFl = async () => {
        try {
            const res = await FollowUser.getFollow(1, currentUser.meta.token);
            setListFollow(res);
        } catch (error) {
            console.log(error);
        }
    };

    // useEffect(() => {
    //     console.log(listFollow);
    // }, [listFollow]);

    const toProfile = () => {
        navigate(`${config.routes.home}@${item.user.nickname}`);
    };

    const renderPreview = (props) => {
        return (
            <div tabIndex="-1">
                <PopperWrapper>
                    <AcountPreview propVideo={item} />
                </PopperWrapper>
            </div>
        );
    };

    return (
        <div className={cx('wrapper')}>
            <Link to={`/@${item.user.nickname}`} className={cx('avatar-link')}>
                <Image className={cx('avatar')} src={item.user.avatar} />
            </Link>
            <div className={cx('video-content-info')}>
                <div className={cx('info-video')}>
                    <div className={cx('acount-video-desc')}>
                        <div className={cx('acount-info')}>
                            <div>
                                <Tippy
                                    // visible
                                    interactive
                                    delay={[800, 0]}
                                    render={renderPreview}
                                    placement="bottom"
                                    offset={[-120, 30]}
                                    zIndex="9999999999"
                                >
                                    <div onClick={toProfile} style={{ cursor: 'pointer' }}>
                                        <h3 className={cx('user-name')}>{item.user.nickname}</h3>
                                        <h4>{item.user.nickname}</h4>
                                    </div>
                                </Tippy>
                            </div>
                        </div>
                        <div className={cx('video-desc')}>
                            {item.description
                                .split(' #')
                                .slice(0, 1)
                                .map((item, index) => (
                                    <span key={index} className={cx('desc')}>
                                        {item}
                                    </span>
                                ))}
                            {item.description
                                .split(' #')
                                .slice(1)
                                .map((item, index) => (
                                    <Hastag key={index} className={cx('hastag')} hastg>
                                        {item}
                                    </Hastag>
                                ))}
                        </div>
                        <div className={cx('music-tag')}>
                            {item.music && (
                                <Hastag className={cx('music-tag-item')} music>
                                    {item.music}
                                </Hastag>
                            )}
                        </div>
                    </div>
                    {/* {!!currentUser ? (
                        <Button className={cx('follow-btn')} primary>
                            Following
                        </Button>
                    ) : (
                        <Button className={cx('follow-btn')} outline onClick={() => setShowLogin(true)}>
                            Following
                        </Button>
                    )} */}
                    {!!currentUser === true && followed === true ? (
                        <Button className={cx('follow-btn', 'following')} outline onClick={handleUnFollow}>
                            Following
                        </Button>
                    ) : !!currentUser === true && followed === false ? (
                        <Button className={cx('follow-btn')} outline onClick={handleFollow}>
                            Follow
                        </Button>
                    ) : (
                        <Button className={cx('follow-btn')} outline onClick={() => setShowLogin(true)}>
                            Follow
                        </Button>
                    )}
                    {/* <Button primary onClick={getFl}>
                        get
                    </Button> */}
                </div>
                <div className={cx('video')}>
                    {/* <VideoRender src={item.file_url} /> */}
                    <VideoRender srcImage={item?.thumb_url} src={item?.file_url} />
                    <div className={cx('video-action')}>
                        <ActionList item={item} currentPage={curentPage} />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default VideoItem;
