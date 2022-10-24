import React, { useEffect, useState } from 'react';
import className from 'classnames/bind';
import styles from './LoginModal.module.scss';
import Button from '~/Button/Button';
import { CloseIcon, NextIcon, PrevIcon } from '~/components/icons/Icons';
import * as LoginUser from '~/services/Auth/Login';
import { useHook } from '~/hooks/useHook';
const cx = className.bind(styles);

const LoginModal = () => {
    const { currentUser, setcurrentUser, setShowLogin, setLogin } = useHook();

    const [formValue, setFormValue] = useState({ email: '', password: '' });
    const [formError, setFormError] = useState({});
    const [loginDisabled, setLoginDisabled] = useState(false);

    // useEffect(() => {

    // }, [email, password]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormValue({ ...formValue, [name]: value });
    };

    const validate = (value) => {
        const emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
        const errors = {};
        // if (value.email === '') {
        //     errors.email = 'Email is required!';
        // }
        if (!emailRegex.test(value.email) && value.email != '') {
            errors.email = 'This Email is not valid';
        }
        // if (value.password === '') {
        //     errors.password = 'Password is required!';
        // }

        return errors;
    };

    const handleFormError = () => {
        setFormError(validate(formValue));
    };

    // useEffect(() => {
    //     console.log(formValue);
    // }, [formValue]);

    useEffect(() => {
        formValue.email && formValue.password ? setLoginDisabled(false) : setLoginDisabled(true);
    }, [formValue]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const user = formValue;
            const result = await LoginUser.login(user);
            setcurrentUser(result);
            // console.log(currentUser);
            setShowLogin(false);
        } catch (error) {
            console.log(error);
        }
    };

    // console.log(currentUser.data.id);

    return (
        <div className={cx('overlay')}>
            <div className={cx('login-wrapper')}>
                <Button className={cx('back-btn')}>
                    <PrevIcon />
                </Button>
                <Button className={cx('close-btn')} onClick={() => setShowLogin(false)}>
                    <CloseIcon />
                </Button>
                <form className={cx('form-login')} onSubmit={(e) => handleSubmit(e)}>
                    <div className={cx('login-title')}>Log in</div>
                    <div className={cx('description')}>
                        Email
                        <a href="/" className={cx('another-login')}>
                            Log in with email or username
                        </a>
                    </div>
                    <div className={cx('username-group', 'ip-group')}>
                        <input
                            type="text"
                            placeholder="Enter Email"
                            name="email"
                            required
                            value={formValue.email}
                            onChange={(e) => {
                                handleChange(e);
                            }}
                            onFocus={handleFormError}
                        />
                    </div>
                    <p className={cx('error')}>{formError.email}</p>

                    <div className={cx('password-group', 'ip-group')}>
                        <input
                            type="password"
                            placeholder="Enter Password"
                            name="password"
                            required
                            value={formValue.password}
                            onChange={(e) => {
                                handleChange(e);
                            }}
                            onFocus={handleFormError}
                        />
                    </div>
                    <p className={cx('error')}>{formError.password}</p>
                    <Button type="submit" primary disabled={loginDisabled} className={cx('login-btn')}>
                        Log in
                    </Button>
                </form>
                <div className={cx('footer')}>
                    <div className={cx('signup-part')}>
                        <p>Don’t have an account?</p>
                        <strong>Sign up</strong>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default LoginModal;
