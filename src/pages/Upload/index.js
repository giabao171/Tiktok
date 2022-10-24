import React, { useEffect, useState } from 'react';
import classNames from 'classnames/bind';
import styles from './Upload.module.scss';
import Image from '~/components/images/Image';
import Button from '~/Button/Button';
import Option from './Option';
import { CheckBoxIcon, CopyRightOnIcon } from '~/components/icons/Icons';
import Video from '~/components/video';
import { useHook } from '~/hooks/useHook';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faItunesNote } from '@fortawesome/free-brands-svg-icons';
import * as VideoPost from '~/services/Video/PostVideo';
import ComfirmPost from './ComfirmPost';

import { useNavigate } from 'react-router-dom';
import config from '~/configs';

const cx = classNames.bind(styles);

const Upload = () => {
    const { currentUser } = useHook();

    const [copyRight, setCopyRight] = useState(false);
    const [caption, setCaption] = useState('');
    const [music, setMusic] = useState('');
    const [thumbnail, setThumbnail] = useState(1);
    const [option, setOption] = useState('Public');
    const [listAllows, setListAllow] = useState([]);
    const [file, setFile] = useState('');
    const [urlVideo, setURLVideo] = useState('');
    const [confrimModal, setConfrimModal] = useState(false);
    const [posted, setPosted] = useState(false);

    const [result, setResult] = useState([]);

    const navigate = useNavigate();

    const CONFIRM_CHANGE_VIDEO = {
        confrim_title: 'Replace this video?',
        confrim_desc: 'Caption and video settings will still be saved.',
        option1: 'Replace',
        option2: 'Continue editing',
    };

    const CONFIRM_CONTINUE_POST = {
        confrim_title: 'Your video is being uploaded to TikTok!',
        option1: 'Upload another video',
        option2: 'View profile',
    };

    const handleChoseeFile = (e) => {
        setFile(e.target.files[0]);
    };

    const replaceFile = () => {
        setFile('');
        setConfrimModal(false);
    };

    const handleCheckBox = (e) => {
        if (e.target.checked === true) setListAllow([...listAllows, e.target.value]);
        else setListAllow(listAllows.filter((alw) => alw !== e.target.value));
    };

    useEffect(() => {
        console.log(file);
        if (file !== '') {
            // console.log(URL.createObjectURL(file));
            setURLVideo(URL.createObjectURL(file));
        }
    }, [file]);

    const handlePostVideo = async () => {
        setPosted(true);
        try {
            const list = await VideoPost.postVideo(
                {
                    description: caption,
                    upload_file: file,
                    thumbnail_time: thumbnail,
                    music: music,
                    viewable: option.toLocaleLowerCase(),
                    allows: listAllows,
                },
                currentUser.meta.token,
            );
            setResult(list);
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <div className={cx('wrapper')}>
            <span className={cx('upload-title')}>Upload video</span>
            <span className={cx('upload-desc')}>Post a video to your account</span>
            <div className={cx('upload-video-part')}>
                <div className={cx('select-video')}>
                    {file === '' ? (
                        <div className={cx('upload-video')}>
                            <input
                                type="file"
                                accept="video"
                                className={cx('select-ip-btn')}
                                onChange={handleChoseeFile}
                            />
                            <div className={cx('tutor-file')}>
                                <Image src="https://lf16-tiktok-common.ttwstatic.com/obj/tiktok-web-common-sg/ies/creator_center/svgs/cloud-icon1.ecf0bf2b.svg" />
                                <div className={cx('bold-desc')}>
                                    <span>Select video to upload</span>
                                </div>
                                <div className={cx('ligher-desc')}>
                                    <span>Or drag and drop a file</span>
                                </div>
                                <div className={cx('lighest-desc')}>
                                    <div>
                                        <span>MP4 or Webm</span>
                                    </div>
                                    <div>
                                        <span>720x1080 resolution or higher</span>
                                    </div>
                                    <div>
                                        <span>Up to 10 minutes</span>
                                    </div>
                                    <div>
                                        <span>Less than 2 GB</span>
                                    </div>
                                </div>
                                <div className={cx('select-file-btn')}>
                                    <Button primary className={cx('select-btn')}>
                                        Select file
                                    </Button>
                                </div>
                            </div>
                        </div>
                    ) : (
                        <div className={cx('video-preview-phone')}>
                            <div className={cx('phone-preview')}>
                                <Video
                                    square
                                    autoPlay
                                    className={cx('video-preview')}
                                    // src="https://v16-webapp.tiktok.com/979562180b742fabb407e52d160f86bd/635416d3/video/tos/maliva/tos-maliva-ve-0068c800-us/fdf141886cb5474ea95e8ccd57355829/?a=1988&ch=0&cr=0&dr=0&lr=tiktok&cd=0%7C0%7C1%7C0&cv=1&br=4266&bt=2133&cs=0&ds=3&ft=kLO5qy-gZmo0PgCa8BkVQJZWkiHKJdmC0&mime_type=video_mp4&qs=0&rc=NjdpZjs0Nzg0OWU1NjdkNEBpajx0cjo6Zmx3PDMzZjgzM0BjXjFgNGIuNjQxNl5eYjBhYSNoYm1pcjQwcm9gLS1kL2Nzcw%3D%3D&l=20221022101359010251065102229C8444&btag=80000"
                                    src={urlVideo}
                                />
                                <div className={cx('modal-top')}>
                                    <div>Following</div>
                                    <div>Foryou</div>
                                </div>
                                <div className={cx('modal-bottom')}>
                                    <div className={cx('test')}>@{currentUser?.data.nickname}</div>
                                    <div className={cx('test')}>{caption}</div>
                                    <div className={cx('music-ex')}>
                                        <span>
                                            <FontAwesomeIcon icon={faItunesNote} />
                                        </span>
                                        <div className={cx('marquee')}>
                                            <div>
                                                <span>- {currentUser.data.nickname} Original Sound</span>
                                                <span>- {currentUser.data.nickname} Original Sound</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className={cx('modal-right')}>
                                    <img className={cx('avatar')} src={currentUser.data.avatar} />
                                    <img
                                        className={cx('action')}
                                        src="https://lf16-tiktok-common.ttwstatic.com/obj/tiktok-web-common-sg/ies/creator_center/svgs/iconbar_right.8fa90e26.svg"
                                    />
                                    <div className={cx('music-disk')}>
                                        <img src={currentUser.data.avatar} />
                                    </div>
                                </div>
                            </div>
                            <div className={cx('change-file')}>
                                <div className={cx('file-name')}>
                                    <img src="https://lf16-tiktok-common.ttwstatic.com/obj/tiktok-web-common-sg/ies/creator_center/svgs/check_icon.8e166106.svg" />
                                    <span>{file.name}</span>
                                </div>
                                <Button text className={cx('change-video-btn')} onClick={() => setConfrimModal(true)}>
                                    Change video
                                </Button>
                            </div>
                        </div>
                    )}
                </div>
                <div className={cx('edit-video')}>
                    <div className={cx('caption-part', 'group')}>
                        <p className={cx('title-desc')}>Caption</p>
                        <div className={cx('ip')}>
                            <input
                                type="text"
                                className={cx('caption')}
                                value={caption}
                                onChange={(e) => setCaption(e.target.value)}
                            />
                        </div>
                    </div>
                    <div className={cx('music-part', 'group')}>
                        <p className={cx('title-desc')}>Music</p>
                        <div className={cx('ip')}>
                            <input
                                type="text"
                                className={cx('music')}
                                value={music}
                                onChange={(e) => setMusic(e.target.value)}
                            />
                        </div>
                    </div>
                    <div className={cx('thumbnail-part', 'group')}>
                        <p className={cx('title-desc')}>Cover</p>
                        <div className={cx('ip-thumbnail')}>
                            <input
                                type="number"
                                min="1"
                                className={cx('thumbnail')}
                                value={thumbnail}
                                onChange={(e) => setThumbnail(e.target.value)}
                            />
                        </div>
                    </div>
                    <div className={cx('type-view-part', 'group')}>
                        <p className={cx('title-desc')}>Who can view this video</p>
                        <Option option={option} setOption={setOption} />
                    </div>
                    <div className={cx('allows-list')}>
                        <p className={cx('title-desc')}>Allow users to:</p>
                        <div className={cx('all-allows-check')}>
                            <div className={cx('check-box-op')}>
                                <input
                                    type="checkbox"
                                    value="comment"
                                    name="comment"
                                    onClick={(e) => handleCheckBox(e)}
                                />
                                <div className={cx('check-icon')}>
                                    <CheckBoxIcon />
                                </div>
                                <label htmlFor="comment" className={cx('check-title')}>
                                    Comment
                                </label>
                            </div>
                            <div className={cx('check-box-op')}>
                                <input type="checkbox" value="duet" name="duet" onClick={(e) => handleCheckBox(e)} />
                                <div className={cx('check-icon')}>
                                    <CheckBoxIcon />
                                </div>
                                <label htmlFor="duet" className={cx('check-title')}>
                                    Duet
                                </label>
                            </div>
                            <div className={cx('check-box-op')}>
                                <input
                                    type="checkbox"
                                    value="stitch"
                                    name="stitch"
                                    onClick={(e) => handleCheckBox(e)}
                                />
                                <div className={cx('check-icon')}>
                                    <CheckBoxIcon />
                                </div>
                                <label htmlFor="stitch" className={cx('check-title')}>
                                    Stitch
                                </label>
                            </div>
                        </div>
                    </div>
                    <div className={cx('copyright-part')}>
                        <p className={cx('title-desc')}>Run a copyright check</p>
                        <div
                            className={!copyRight ? cx('tongle-btn') : cx('tongle-btn', 'tongle-btn-active')}
                            onClick={() => setCopyRight(!copyRight)}
                        >
                            <div
                                className={
                                    !copyRight ? cx('circle-tongle') : cx('circle-tongle', 'circle-tongle-active')
                                }
                            ></div>
                        </div>
                    </div>
                    {!copyRight ? (
                        <p className={cx('copy-right-desc')}>
                            We'll check your video for potential copyright infringements on used sounds. If
                            infringements are found, you can edit the video before posting.<strong> Learn more</strong>
                        </p>
                    ) : (
                        <div className={cx('copy-right-on')}>
                            <span>
                                <CopyRightOnIcon />
                            </span>
                            <p>Copyright check will not begin until your video is uploaded.</p>
                        </div>
                    )}
                    {file === '' ? (
                        <div className={cx('discard-bost-part')}>
                            <Button rounded large square disabled className={cx('btn-post')}>
                                Discard
                            </Button>
                            <Button primary large disabled className={cx('btn-discard')}>
                                Post
                            </Button>
                        </div>
                    ) : (
                        <div className={cx('discard-bost-part')}>
                            <Button rounded large square className={cx('btn-post')}>
                                Discard
                            </Button>
                            <Button
                                primary
                                large
                                className={cx('btn-discard')}
                                onClick={() => {
                                    handlePostVideo();
                                    setConfrimModal(true);
                                }}
                            >
                                Post
                            </Button>
                        </div>
                    )}
                </div>
            </div>
            {confrimModal && (
                <ComfirmPost
                    confrimList={posted ? CONFIRM_CONTINUE_POST : CONFIRM_CHANGE_VIDEO}
                    posted={posted}
                    setPosted={setPosted}
                    replaceFile={replaceFile}
                    setConfrimModal={setConfrimModal}
                />
            )}
        </div>
    );
};

export default Upload;
