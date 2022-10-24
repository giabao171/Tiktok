import React, { useEffect, useState } from 'react';
import classNames from 'classnames/bind';
import styles from './EditProfileModal.module.scss';
import Button from '~/Button/Button';
import Image from '~/components/images/Image';
import { EditProfileIcon, SmallCloseIcon } from '~/components/icons/Icons';
import { useHook } from '~/hooks/useHook';

const cx = classNames.bind(styles);

const EditProfileModal = ({ setShowEditProfile }) => {
    const { currentUser } = useHook();

    const [userInfoEdit, setUserInfoEdit] = useState({
        srcAvatars: currentUser.data.avatar,
        userNames: currentUser.data.nickname,
        names: `${currentUser.data.first_name + currentUser.data.last_name}`,
        bios: currentUser.data.bio,
    });

    const [file, setFile] = useState('');
    const [srcAvatar, setSrcAvatar] = useState(currentUser.data.avatar);
    const [userName, setUserName] = useState('');
    const [name, setName] = useState('');
    const [bio, setBio] = useState('');

    const changeInfoEdit = (e) => {
        setUserInfoEdit({
            ...userInfoEdit,
            [e.target.id]: e.target.value,
        });
    };

    useEffect(() => {
        console.log(userInfoEdit);
    }, [userInfoEdit]);

    const changeFile = (e) => {
        setFile(e.target.files[0]);
    };

    useEffect(() => {
        if (file !== '') {
            setSrcAvatar(URL.createObjectURL(file));
        }
    }, [file]);

    useEffect(() => {
        console.log(file);
        console.log(srcAvatar);
    }, [file]);

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
                                <input value={userInfoEdit.userNames} id="userNames" onChange={changeInfoEdit} />
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
                                <input
                                    value={`${currentUser.data.first_name} ${currentUser.data.last_name}`}
                                    onChange={(e) => setName(e.target.value)}
                                />
                                <p className={cx('change-desc')}>
                                    Your nickname can only be changed once every 7 days.
                                </p>
                            </div>
                        </div>
                        <div className={cx('change-bio', 'part')}>
                            <div className={cx('change-title')}>Bio</div>
                            <div className={cx('change-box')}>
                                <textarea
                                    value={currentUser.data.bio}
                                    onChange={(e) => setBio(e.target.value)}
                                    className={cx('bio-ip')}
                                />
                                <p className={cx('change-desc', 'number-character')}>3/80</p>
                            </div>
                        </div>
                    </div>
                    <div className={cx('footer')}>
                        <div className={cx('btn-group')}>
                            <Button rounded square className={cx('btn', 'cancle')}>
                                Cancel
                            </Button>
                            <Button primary className={cx('btn')}>
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
