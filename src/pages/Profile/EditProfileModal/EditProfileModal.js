import React, { useEffect, useState } from 'react';
import classNames from 'classnames/bind';
import styles from './EditProfileModal.module.scss';
import Button from '~/Button/Button';
import Image from '~/components/images/Image';
import { EditProfileIcon, SmallCloseIcon } from '~/components/icons/Icons';
import { useHook } from '~/hooks/useHook';
import * as userProfile from '~/services/User/Profile';
import config from '~/configs';

import { useNavigate } from 'react-router-dom';

const cx = classNames.bind(styles);

const EditProfileModal = ({ setShowEditProfile }) => {
    const { currentUser } = useHook();

    const [file, setFile] = useState('');
    const [srcAvatar, setSrcAvatar] = useState(currentUser.data.avatar);
    const [name, setName] = useState(`${currentUser.data.first_name} ${currentUser.data.last_name}`);
    // const [bio, setBio] = useState('');

    const navigate = useNavigate();

    const [userInfoEdit, setUserInfoEdit] = useState({
        avatar: currentUser.data.avatar,
        first_name: currentUser.data.first_name,
        last_name: currentUser.data.last_name,
        bio: currentUser.data.bio,
    });

    useEffect(() => {
        const nameSpace = name.split(' ');

        setUserInfoEdit({
            ...userInfoEdit,
            first_name: name.replace(` ${nameSpace[nameSpace.length - 1]}`, ''),
            last_name: nameSpace[nameSpace.length - 1],
        });
    }, [name]);

    const changeInfoEdit = (e) => {
        setUserInfoEdit({
            ...userInfoEdit,
            [e.target.id]: e.target.value,
        });
    };

    const changeFile = (e) => {
        setFile(e.target.files[0]);
        setUserInfoEdit({
            ...userInfoEdit,
            [e.target.id]: e.target.files[0],
        });
    };

    useEffect(() => {
        console.log(userInfoEdit);
        console.log(file.type);
    }, [userInfoEdit]);

    useEffect(() => {
        if (file !== '') {
            setSrcAvatar(URL.createObjectURL(file));
        }
    }, [file]);

    useEffect(() => {
        console.log(file);
        console.log(srcAvatar);
    }, [file]);

    const handleSubmit = async () => {
        try {
            userProfile.edit(userInfoEdit, currentUser.meta.token);
            navigate(`${config.routes.home}@${currentUser.data.nickname}`);
            setShowEditProfile(false);
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <div className={cx('over-lay')}>
            <div className={cx('over-modal')}>
                <div className={cx('edit-modal')}>
                    <div className={cx('header')}>
                        Edit Profile
                        <Button className={cx('close-btn')} onClick={() => setShowEditProfile(false)}>
                            <SmallCloseIcon />
                        </Button>
                    </div>
                    <div className={cx('content')}>
                        <div className={cx('change-avatar')}>
                            <div className={cx('change-title')}>Profile photo</div>
                            <div className={cx('avatar-view')}>
                                <Image src={srcAvatar} className={cx('avatar')} />
                                <Button className={cx('change-ava-btn')}>
                                    <EditProfileIcon />
                                    <input
                                        id="avatar"
                                        className={cx('select-av-btn')}
                                        type="file"
                                        accept="image"
                                        onChange={changeFile}
                                    />
                                </Button>
                            </div>
                        </div>
                        <div className={cx('change-username', 'part')}>
                            <div className={cx('change-title')}>Username</div>
                            <div className={cx('change-box')}>
                                <input value={currentUser.data.nickname} id="userNames" disabled />
                                <p className={cx('url-nickname')}>{`www.tiktok.com/@${currentUser.data.nickname}`}</p>
                                <p className={cx('change-desc')} style={{ width: '360px', fontSize: '12px' }}>
                                    Usernames can only contain letters, numbers, underscores, and periods. Changing your
                                    username will also change your profile link.
                                </p>
                            </div>
                        </div>
                        <div className={cx('change-name', 'part')}>
                            <div className={cx('change-title')}>Name</div>
                            <div className={cx('change-box')}>
                                <input value={name} onChange={(e) => setName(e.target.value)} />
                                <p className={cx('change-desc')}>
                                    Your nickname can only be changed once every 7 days.
                                </p>
                            </div>
                        </div>

                        <div className={cx('change-bio', 'part')}>
                            <div className={cx('change-title')}>Bio</div>
                            <div className={cx('change-box')}>
                                <textarea
                                    id="bio"
                                    value={userInfoEdit.bio}
                                    onChange={changeInfoEdit}
                                    className={cx('bio-ip')}
                                />
                                <p
                                    className={cx('change-desc', 'number-character')}
                                >{`${userInfoEdit.bio.length}/80`}</p>
                            </div>
                        </div>
                    </div>
                    <div className={cx('footer')}>
                        <div className={cx('btn-group')}>
                            <Button rounded square className={cx('btn', 'cancle')}>
                                Cancel
                            </Button>
                            <Button primary className={cx('btn')} onClick={handleSubmit}>
                                Save
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default EditProfileModal;
