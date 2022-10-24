import React, { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faEllipsisVertical,
    faEarthAsia,
    faCircleQuestion,
    faKeyboard,
    faUser,
    faCoins,
    faGear,
    faArrowRightFromBracket,
    faPlus,
} from '@fortawesome/free-solid-svg-icons';
import Tippy from '@tippyjs/react';
import 'tippy.js/dist/tippy.css';

import className from 'classnames/bind';
import styles from './Header.module.scss';
import images from '~/assets/images';
import Button from '~/Button/Button';
import Menu from '~/components/Popper/Menu/Menu';
import { MessageIcon, UploadIcon } from '~/components/icons/Icons';
import Image from '~/components/images/Image';
import Search from './Search/Search';
import { Link, useNavigate } from 'react-router-dom';
import config from '~/configs';
import { useHook } from '~/hooks/useHook';
import LoginModal from '../LoginModal/LoginModal';
import * as LogoutUser from '~/services/Auth/Logout';

const cx = className.bind(styles);

const MENU_ITEMS = [
    {
        icon: <FontAwesomeIcon icon={faEarthAsia} />,
        title: 'English',
        children: {
            title: 'Language',
            data: [
                {
                    type: 'language',
                    code: 'en',
                    title: 'English',
                },
                {
                    type: 'language',
                    code: 'vi',
                    title: 'Tiếng Việt',
                },
            ],
        },
    },
    {
        icon: <FontAwesomeIcon icon={faCircleQuestion} />,
        title: 'Feedback and Help',
        to: '/feedback',
    },
    {
        icon: <FontAwesomeIcon icon={faKeyboard} />,
        title: 'Keyboard shortcuts',
    },
];

const Header = () => {
    const userMenu = [
        {
            icon: <FontAwesomeIcon icon={faUser} />,
            title: 'View profile',
            // to: `@${currentUser ? currentUser.data.nickname : '/'}`,
        },
        {
            icon: <FontAwesomeIcon icon={faCoins} />,
            title: 'Get coins',
            to: '/coins',
        },
        {
            icon: <FontAwesomeIcon icon={faGear} />,
            title: 'Settings',
            to: '/settings',
        },
        ...MENU_ITEMS,
        {
            icon: <FontAwesomeIcon icon={faArrowRightFromBracket} />,
            title: 'Log out',
            separate: true,
        },
    ];

    const { largeHeader, setLargeHeader, setcurrentUser, currentUser, showLogin, setShowLogin } = useHook();
    const [style, setStyle] = useState({});
    const navigate = useNavigate();

    const handleMenuChange = (menuItem) => {
        if (menuItem.title === 'Log out') {
            try {
                const logout = async (id, token) => {
                    const result = await LogoutUser.logout(id, token);
                    setcurrentUser(null);
                };
                console.log('logout: ', currentUser.id);
                logout(currentUser.id, currentUser?.meta.token);
            } catch (error) {
                console.log(error);
            }
        }
        if (menuItem.title === 'View profile') {
            navigate(`@${currentUser.data.nickname}`);
        }
    };

    // console.log(currentUser);
    // console.log(currentUser.data.id);
    useEffect(() => {
        if (largeHeader == true) {
            setStyle({
                width: '100%',
            });
        } else {
            setStyle({});
        }
    }, [largeHeader]);

    const toUploadPage = () => {
        navigate(`/upload`);
    };

    return (
        <header className={cx('wrapper')}>
            <div className={cx('inner')} style={style}>
                <div className={cx('logo')}>
                    <Link to={config.routes.home}>
                        <img src={images.logo} alt="tikTok" />
                    </Link>
                </div>
                {/* Search */}
                <Search />

                <div className={cx('actions')}>
                    {currentUser ? (
                        <>
                            <Button rounded square leftIcon={<FontAwesomeIcon icon={faPlus} />} onClick={toUploadPage}>
                                Upload
                            </Button>
                            <Tippy content="Upload video" placement="bottom" delay={[0, 100]}>
                                <button className={cx('action-btn')}>
                                    <UploadIcon />
                                </button>
                            </Tippy>
                            <Tippy content="Messages" placement="bottom" delay={[0, 100]}>
                                <button className={cx('action-btn')}>
                                    <MessageIcon />
                                </button>
                            </Tippy>
                            <Menu items={userMenu} onChange={handleMenuChange}>
                                <Image className={cx('user-avatar')} src={currentUser.data.avatar} alt="ko co" />
                            </Menu>
                        </>
                    ) : (
                        <>
                            <Button
                                rounded
                                square
                                leftIcon={<FontAwesomeIcon icon={faPlus} />}
                                onClick={() => setShowLogin(true)}
                            >
                                Upload
                            </Button>
                            <Button primary className={cx('login-btn')} onClick={() => setShowLogin(true)}>
                                Login
                            </Button>
                            <Menu items={MENU_ITEMS} onChange={handleMenuChange}>
                                <button className={cx('more-btn')}>
                                    <FontAwesomeIcon icon={faEllipsisVertical} />
                                </button>
                            </Menu>
                        </>
                    )}
                </div>
            </div>
            {showLogin && <LoginModal />}
        </header>
    );
};

export default Header;
