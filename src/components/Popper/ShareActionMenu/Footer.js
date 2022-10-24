import React from 'react';
import classNames from 'classnames/bind';
import styles from './ShareActionMenu.module.scss';
import { MoreActionIcon } from '~/components/icons/Icons';

const cx = classNames.bind(styles);

const Footer = ({ onClick }) => {
    return (
        <footer className={cx('footer')}>
            <button onClick={onClick}>
                <MoreActionIcon />
            </button>
        </footer>
    );
};

export default Footer;
