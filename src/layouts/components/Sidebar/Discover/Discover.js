import React from 'react';
import classNames from 'classnames/bind';
import styles from './Discover.module.scss';
import Hastag from '~/components/Hastag';

const cx = classNames.bind(styles);

const Discover = ({ label }) => {
    return (
        <div className={cx('wrapper')}>
            <p className={cx('label')}>{label}</p>
            <div className={cx('hastag-list')}>
                <Hastag border>dap bay de</Hastag>
                <Hastag border>le la len la len la len</Hastag>
                <Hastag border>Yeu khong</Hastag>
                <Hastag border>Deo yeu</Hastag>
                <Hastag border>an bo may de</Hastag>
            </div>
        </div>
    );
};

export default Discover;
