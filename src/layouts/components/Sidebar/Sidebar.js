import React, { useEffect, useState } from 'react';
import classNames from 'classnames/bind';
import styles from './Sidebar.module.scss';
import config from '~/configs';
import Menu, { MenuItem } from './Menu';
import {
    FollowingIconSolid,
    FollowingIconBold,
    HomeIconSolid,
    HomeIconBold,
    LiveIconSolid,
    LiveIconBold,
} from '~/components/icons/Icons';
import SuggetsAcounts from './SuggetsAcounts/index';
import Discover from './Discover';
import { useHook } from '~/hooks/useHook';
import LoginSB from './Menu/LoginSB/LoginSB';
import LoginModal from '../LoginModal/LoginModal';

const cx = classNames.bind(styles);

const Sidebar = () => {
    const { lessSideBar, setLessSideBar, login, currentUser } = useHook();
    const [style, setStyle] = useState({});

    useEffect(() => {
        if (lessSideBar == true) {
            setStyle({
                left: '12px',
                width: '240px',
            });
        } else {
            setStyle({});
        }
    }, [lessSideBar]);

    return (
        <aside className={cx('wrapper')} onScroll={(e) => e.stopPropagation()} style={style}>
            <Menu>
                <MenuItem
                    title="For you"
                    to={config.routes.home}
                    iconSolid={<HomeIconSolid />}
                    iconBold={<HomeIconBold />}
                />
                <MenuItem
                    title="Following"
                    to={config.routes.following}
                    iconSolid={<FollowingIconSolid />}
                    iconBold={<FollowingIconBold />}
                />
                <MenuItem
                    title="Live"
                    to={config.routes.live}
                    iconSolid={<LiveIconSolid />}
                    iconBold={<LiveIconBold />}
                />
            </Menu>
            {!currentUser && <LoginSB />}
            <SuggetsAcounts label="Suggested accounts" onTippy />
            {currentUser && <SuggetsAcounts label="Following accounts" />}
            <Discover label="Discover" />
        </aside>
    );
};

export default Sidebar;
