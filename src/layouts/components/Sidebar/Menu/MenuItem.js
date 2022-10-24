import React, { useState } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames/bind';
import styles from './Menu.module.scss';
import { NavLink } from 'react-router-dom';

const cx = classNames.bind(styles);

const MenuItem = ({ title, to, iconBold, iconSolid }) => {
    // const [iconActive, setIconActive] = useState(false);
    return (
        <NavLink
            to={to}
            className={(nav) =>
                // setIconActive(nav.isActive);
                cx('menu-item', { active: nav.isActive })
            }
        >
            {/* {iconActive ? iconBold : iconSolid} */}
            <span className={cx('icon-solid')}>{iconSolid}</span>
            <span className={cx('icon-bold')}>{iconBold}</span>
            <span className={cx('title')}>{title}</span>
        </NavLink>
    );
};

MenuItem.propTypes = {
    title: PropTypes.string.isRequired,
    to: PropTypes.string.isRequired,
    iconBold: PropTypes.node.isRequired,
    iconSolid: PropTypes.node.isRequired,
};

export default MenuItem;
