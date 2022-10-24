import React from 'react';
import classNames from 'classnames/bind';
import styles from './VideoItem.module.scss';
import Image from '../images/Image';
import VideoRender from './VideoRender/index';
import Button from '~/Button/Button';
import { Link } from 'react-router-dom';
import Tippy from '@tippyjs/react/headless';
import config from '~/configs';
import Hastag from '../Hastag';
import ActionList from './VideoAction/ActionList';
import { Wrapper as PopperWrapper } from '~/components/Popper';
import AcountPreview from '~/layouts/components/Sidebar/SuggetsAcounts/AcountPreview';
import { useHook } from '~/hooks/useHook';

const cx = classNames.bind(styles);

const VideoItem = ({ item, curentPage }) => {
    const { currentUser, setShowLogin } = useHook();

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
                        <Link className={cx('acount-info')} to={`/@${item.user.nickname}`}>
                            <div>
                                <Tippy
                                    // visible
                                    interactive
                                    delay={[800, 0]}
                                    render={renderPreview}
                                    placement="bottom"
                                    offset={[-120, 30]}
                                >
                                    <div>
                                        <h3 className={cx('user-name')}>{item.user.nickname}</h3>
                                        <h4>{item.user.nickname}</h4>
                                    </div>
                                </Tippy>
                            </div>
                        </Link>
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
                            {/* <span className={cx('desc')}>{item.description}</span>
                            <Hastag className={cx('hastag')}>xuhuongtiktok</Hastag>
                            <Hastag className={cx('hastag')}>xuhuong</Hastag>
                            <Hastag className={cx('hastag')}>trending</Hastag>
                            <Hastag className={cx('hastag')}>fyp</Hastag>
                            <Hastag className={cx('hastag')}>foryou</Hastag> */}
                        </div>
                        <div className={cx('music-tag')}>
                            {item.music && (
                                <Hastag className={cx('music-tag-item')} music>
                                    {item.music}
                                </Hastag>
                            )}
                        </div>
                    </div>
                    {!!currentUser ? (
                        <Button className={cx('follow-btn')} outline>
                            Following
                        </Button>
                    ) : (
                        <Button className={cx('follow-btn')} outline onClick={() => setShowLogin(true)}>
                            Following
                        </Button>
                    )}
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
