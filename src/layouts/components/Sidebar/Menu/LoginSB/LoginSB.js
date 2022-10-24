import React from 'react';
import classNames from 'classnames/bind';
import styles from './LoginSB.module.scss';
import Button from '~/Button/Button';
import { useHook } from '~/hooks/useHook';

const cx = classNames.bind(styles);

const LoginSB = () => {
    const { setShowLogin } = useHook();
    return (
        <div className={cx('login-part')}>
            <p className={cx('login-text')}>Log in to follow creators, like videos, and view comments.</p>
            <Button
                outline
                className={cx('login-btn')}
                onClick={() => {
                    setShowLogin(true);
                }}
            >
                Log in
            </Button>
        </div>
    );
};

export default LoginSB;
