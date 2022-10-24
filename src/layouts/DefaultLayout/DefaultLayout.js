import classNames from 'classnames/bind';
import Header from '../components/Header/Header';
import Sidebar from '../components/Sidebar/Sidebar';
import styles from './DefaultLayout.module.scss';
import PropTypes from 'prop-types';
import React, { useState, useEffect } from 'react';
import { useHook } from '~/hooks/useHook';

const cx = classNames.bind(styles);

const DefaultLayout = ({ children }) => {
    const { marginContentDefault, setmarginContentDefault } = useHook();
    const [style, setStyle] = useState({});

    useEffect(() => {
        if (marginContentDefault == true) {
            setStyle({
                marginLeft: '338px',
            });
        } else {
            setStyle({
                marginLeft: '90px',
            });
        }
    }, [marginContentDefault]);

    return (
        <div className={cx('wrapper')}>
            <Header />
            <div className={cx('container')}>
                <Sidebar />
                <div className={cx('content')} style={style}>
                    {children}
                </div>
            </div>
        </div>
    );
};

DefaultLayout.propTypes = {
    children: PropTypes.node.isRequired,
};

export default DefaultLayout;
