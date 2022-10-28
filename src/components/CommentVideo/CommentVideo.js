import React, { useCallback, useEffect, useRef, useState, memo } from 'react';
import classNames from 'classnames/bind';
import styles from './CommentVideo.module.scss';
import Video from '../video';
import {
    CloseIcon,
    CommentIcon,
    EmojiIcon,
    FlagIcon,
    HeartIcon,
    HeartSolidIcon,
    NextIcon,
    PrevIcon,
    ShareIcon,
    TagIcon,
    VolumeIcon,
    VolumeMuteIcon,
} from '../icons/Icons';
import * as accountUserInfo from '~/services/accountUserService';
import * as videoService from '~/services/videoService';
import Button from '~/Button/Button';
import { useHook } from '~/hooks/useHook';
import { Navigate, useNavigate, useParams } from 'react-router-dom';
import config from '~/configs';
import Hastag from '../Hastag';
import Image from '../images/Image';
import AcountPreview from '~/layouts/components/Sidebar/SuggetsAcounts/AcountPreview';
import { Wrapper as PopperWrapper } from '~/components/Popper';
import { DateConvert } from '~/DateConvert/DateConvert';
import * as Comment from '~/services/Comment/Comment';

import Tippy from '@tippyjs/react';
import HeadlessTippy from '@tippyjs/react/headless';
import CommentItem from './CommnentItem/CommentItem';

const cx = classNames.bind(styles);

const CommentVideo = () => {
    const {
        currentUser,
        // handleChangeVideo,
        SHARE_LIST,
    } = useHook();

    const { nicknamevideo } = useParams();
    const { idvideo, type, numpage } = useParams();
    let navigate = useNavigate();

    const [video, setVideo] = useState(null);
    const [listVideo, setListVideo] = useState(null);
    const [volumeValue, setVolumeValue] = useState(1);
    const [mutedVolume, setMutedVolume] = useState(false);
    const [currentVideoTime, setCurrentVideoTime] = useState(0);
    const [postCmt, setPostCmt] = useState(false);
    const [nextVideo, setNextVideo] = useState({});
    const [prevVideo, setPrevVideo] = useState({});

    const [ipCmt, setIpCmt] = useState('');

    const videoRef = useRef();
    const durationRef = useRef();

    useEffect(() => {
        const fetch = async () => {
            if (type === 'comment') {
                try {
                    const result = await accountUserInfo.accountUserService(nicknamevideo);
                    setListVideo(result.videos);
                } catch (error) {
                    console.log('loi ko lay ddc list');
                }
            }
            if (type === 'suggest') {
                try {
                    const result = await videoService.videoService(numpage);
                    setListVideo(result);
                } catch (error) {
                    console.log('loi ko lay ddc list');
                }
            }
        };

        fetch();
    }, []);

    useEffect(() => {
        const getVideo = async () => {
            let n = listVideo?.length;
            for (let i = 0; i < n; ++i) {
                if (listVideo[i]?.id == idvideo) setVideo(listVideo[i]);
            }
        };

        getVideo();
    }, [listVideo]);

    useEffect(() => {
        const getNextPrevVideo = async () => {
            let n = listVideo?.length;
            for (let i = 0; i < n; ++i) {
                if (listVideo[i]?.id == idvideo) {
                    if (i == 0) {
                        setPrevVideo(listVideo[0]);
                        setNextVideo(listVideo[i + 1]);
                    } else if (i == n - 1) {
                        setNextVideo(listVideo[i]);
                        setPrevVideo(listVideo[i - 1]);
                    } else {
                        setPrevVideo(listVideo[i - 1]);
                        setNextVideo(listVideo[i + 1]);
                    }
                }
            }
        };

        getNextPrevVideo();
    }, [listVideo]);

    const handleChangeVideo = (typeBtn) => {
        if (typeBtn === 'next') {
            navigate(`${config.routes.home}@${nicknamevideo}/${nextVideo.id}/${type}/${numpage}`);
            navigate(0);
        }
        if (typeBtn === 'prev') {
            navigate(`${config.routes.home}@${nicknamevideo}/${prevVideo.id}/${type}/${numpage}`);
            navigate(0);
        }
    };

    const backPage = (npage) => {
        if (npage === 'none') {
            navigate(`${config.routes.home}@${nicknamevideo}`);
        }
        if (npage !== 'none' && typeof Number(npage) === 'number') {
            navigate(`${config.routes.home}`);
        }
        // console.log(typeof npage);
    };

    // const handleChangeVideo = (list, type) => {
    //     let leng = list?.length;
    //     for (let i = 0; i < leng; i++) {
    //         if (video?.id == list[i]?.id) {
    //             if (type == 'next') {
    //                 if (i == leng - 1) {
    //                     setVideo(list[leng - 1]);
    //                 } else setVideo(list[i + 1]);
    //             }
    //             if (type == 'prev') {
    //                 if (i == 0) {
    //                     setVideo(list[0]);
    //                 } else setVideo(list[i - 1]);
    //             }
    //         }
    //     }
    // };

    useEffect(() => {
        videoRef.current.play();
        console.log('re-play');
        // console.log(currentVideo);
    }, [video]);

    useEffect(() => {
        videoRef.current.volume = volumeValue;
        if (volumeValue > 0) {
            setMutedVolume(false);
        } else {
            setMutedVolume(true);
        }
    }, [volumeValue]);

    useEffect(() => {
        if (mutedVolume == true) {
            videoRef.current.volume = 0;
            setVolumeValue(0);
            // setMutedVolume(true);
        } else {
            setVolumeValue(0.5);
            videoRef.current.volume = volumeValue;
            // setMutedVolume(false);
        }
    }, [mutedVolume]);

    ////////////////////////////////////////////Time change video

    function convertHMS(value) {
        const sec = parseInt(value, 10); // convert value to number if it's string
        let hours = Math.floor(sec / 3600); // get hours
        let minutes = Math.floor((sec - hours * 3600) / 60); // get minutes
        let seconds = sec - hours * 3600 - minutes * 60; //  get seconds
        // add 0 if value < 10; Example: 2 => 02
        if (hours < 10) {
            hours = '0' + hours;
        }
        if (minutes < 10) {
            minutes = '0' + minutes;
        }
        if (seconds < 10) {
            seconds = '0' + seconds;
        }
        return minutes + ':' + seconds; // Return is HH : MM : SS
    }

    const handleVideoTimeChange = (value) => {
        setCurrentVideoTime(value);
        videoRef.current.currentTime = value;
    };

    // console.log('re-render');
    // console.log(listVideo);
    // console.log(video);
    // console.log(item.id);
    // console.log(currentVideo);
    // console.log(currentListVideo);
    // console.log(location);

    const postComment = async () => {
        const data = {
            comment: ipCmt,
        };
        try {
            const res = await Comment.post(idvideo, data, currentUser.meta.token);
            setIpCmt('');
            setPostCmt(!postCmt);
            return res;
        } catch (error) {
            console.log(error);
        }
    };

    const renderPreview = (props) => {
        return (
            <div tabIndex="-1">
                <PopperWrapper>
                    <AcountPreview propVideo={video} />
                </PopperWrapper>
            </div>
        );
    };

    return (
        <div className={cx('modal-overlay')} onMouseMove={(e) => e.stopPropagation()}>
            <div className={cx('wrapper')}>
                <div className={cx('video-part')}>
                    <div
                        className={cx('back-ground')}
                        style={{
                            backgroundImage: `url(${video?.thumb_url})`,
                        }}
                    ></div>
                    <div className={cx('video-box')}>
                        <Video
                            ref={videoRef}
                            className={cx('video')}
                            src={video?.file_url}
                            onTimeUpdate={() => setCurrentVideoTime(videoRef.current.currentTime)}
                        />
                        {/* <Link to={`/@${video.user.nickname}`}> */}
                        {/* <Link to={`/@${nicknamevideo}`}> */}
                        <Button
                            className={cx('close-btn')}
                            onClick={() => {
                                // navigate(`${config.routes.home}@${nicknamevideo}`);
                                // navigate(0);
                                backPage(numpage);
                            }}
                        >
                            <CloseIcon />
                        </Button>
                        {/* </Link> */}
                        <Button className={cx('report-btn')} leftIcon={<FlagIcon />}>
                            Report
                        </Button>
                        <div className={cx('next-prev-btn')}>
                            <Button
                                className={cx('prev-btn')}
                                onClick={() => {
                                    // handleChangeVideo(listVideo, 'prev');

                                    handleChangeVideo('prev');
                                }}
                            >
                                <PrevIcon />
                            </Button>
                            {/* <Link to={`@${nextVideo?.user.nickname}/${nextVideo?.id}/comment`}> */}
                            <Button
                                className={cx('next-btn')}
                                onClick={() => {
                                    // handleChangeVideo(listVideo, 'next');
                                    // navigate(`@${nextVideo?.user.nickname}/${nextVideo?.id}/comment`);

                                    handleChangeVideo('next');
                                }}
                            >
                                <NextIcon />
                            </Button>
                            {/* </Link> */}
                        </div>
                        <div className={cx('volume-control')}>
                            <div className={cx('space')}>
                                <div className={cx('wrapper-volume-range')}>
                                    <input
                                        className={cx('range-volume')}
                                        type="range"
                                        min="0"
                                        max="1"
                                        step="0.01"
                                        value={volumeValue}
                                        onChange={(e) => {
                                            setVolumeValue(e.target.value);
                                        }}
                                    />
                                </div>
                            </div>
                            <div onClick={() => setMutedVolume(!mutedVolume)}>
                                {mutedVolume ? <VolumeMuteIcon /> : <VolumeIcon />}
                            </div>
                        </div>
                        <div
                            className={cx('duration-control')}
                            // ref={durationRef}
                        >
                            <div className={cx('duration-range-wrapper')}>
                                <input
                                    className={cx('duration-range')}
                                    type="range"
                                    min="0"
                                    max={video?.meta.playtime_seconds}
                                    step="0.1"
                                    value={currentVideoTime}
                                    onChange={(e) => handleVideoTimeChange(e.target.value)}
                                />
                                <p className={cx('duration')}>
                                    {convertHMS(currentVideoTime)}/{video?.meta.playtime_string}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
                <div className={cx('comment-part')}>
                    <div className={cx('comment-container')}>
                        <div className={cx('user-info')}>
                            {/* <HeadlessTippy
                                interactive
                                delay={[800, 0]}
                                render={renderPreview}
                                placement="bottom"
                                // offset={[-120, 30]}
                                animation="false"
                            > */}
                            <div className={cx('info')}>
                                <Image className={cx('avatar-of-vacc')} src={video?.user.avatar} />
                                <div className={cx('name')}>
                                    <span className={cx('nick-name')}>{video?.user.nickname}</span>
                                    <p className={cx('full-name-day-post')}>
                                        {video?.user.first_name + ` ` + video?.user.last_name}
                                        <span className={cx('line')}> - </span>
                                        <span className={cx('day-post')}>
                                            {/* {video?.updated_at && <DateConvert day={video?.updated_at} />} */}
                                            {video?.updated_at && DateConvert(video?.updated_at)}
                                        </span>
                                    </p>
                                </div>
                            </div>
                            {/* </HeadlessTippy> */}
                            <Button outline className={cx('fl-btn')}>
                                Follow
                            </Button>
                        </div>
                        <div className={cx('video-info')}>
                            <div className={cx('description')}>
                                {/* <p>{video?.description}</p> */}
                                {video?.description
                                    .split('#')
                                    .slice(0, 1)
                                    .map((item, index) => (
                                        <span key={index} className={cx('desc')}>
                                            {item}
                                        </span>
                                    ))}
                                {video?.description
                                    .split('#')
                                    .slice(1)
                                    .map((item, index) => (
                                        <Hastag key={index} className={cx('hastag')} hastg>
                                            {item}
                                        </Hastag>
                                    ))}
                            </div>
                            <div className={cx('music')}>
                                {/* {video?.user.music && <Hastag music>{video?.user.music}</Hastag>} */}
                                {video?.music && <Hastag music> {video?.music}</Hastag>}
                            </div>
                            <div className={cx('action')}>
                                <div className={cx('interect-share')}>
                                    <div className={cx('number-interect')}>
                                        <div className={cx('heart')}>
                                            <Button className={cx('btn-in')}>
                                                <HeartIcon />
                                            </Button>
                                            <span>{video?.likes_count}</span>
                                        </div>
                                        <div className={cx('comment')}>
                                            <Button className={cx('btn-in')}>
                                                <CommentIcon />
                                            </Button>
                                            <span>{video?.comments_count}</span>
                                        </div>
                                    </div>
                                    <div className={cx('action-list')}>
                                        {SHARE_LIST.slice(0, 5).map((item, index) => (
                                            <div key={index} className={cx('action-item')}>
                                                <Tippy content={item.title}>
                                                    <Button className={cx('action-item-type')}>{item.icon}</Button>
                                                </Tippy>
                                            </div>
                                        ))}
                                        <div className={cx('share-more')}>
                                            <Tippy>
                                                <Button className={cx('action-item-type')}>
                                                    <ShareIcon />
                                                </Button>
                                            </Tippy>
                                        </div>
                                    </div>
                                </div>
                                <div className={cx('link')}>
                                    <div className={cx('link-box')}>
                                        <p>{video?.user.website_url}</p>
                                    </div>
                                    <Button className={cx('copy-l-btn')}>Copy link</Button>
                                </div>
                            </div>
                        </div>
                        <div className={cx('comment-box')}>
                            <CommentItem idvideo={idvideo} commentPosted={postCmt} />
                        </div>
                        <div className={cx('comment-write')}>
                            <div className={cx('comment-content-write')}>
                                <input
                                    className={cx('input')}
                                    placeholder="Add comments..."
                                    spellCheck={false}
                                    value={ipCmt}
                                    onChange={(e) => setIpCmt(e.target.value)}
                                />
                                <div className={cx('comment-btn-group')}>
                                    <Button className={cx('comment-btn')}>
                                        <TagIcon />
                                    </Button>
                                    <Button className={cx('comment-btn')}>
                                        <EmojiIcon />
                                    </Button>
                                </div>
                                <Button className={cx('post-comment-btn')} onClick={postComment}>
                                    Post
                                </Button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default memo(CommentVideo);
