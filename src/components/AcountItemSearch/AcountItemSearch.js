import React from 'react';
import classNames from 'classnames/bind';
import styles from './AcountItemSearch.module.scss';
import Image from '../images/Image';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheckCircle } from '@fortawesome/free-solid-svg-icons';

const cx = classNames.bind(styles);

const AccountItemSearch = ({ data }) => {
    return (
        <Link to={`/@${data.nickname}`} className={cx('wrapper')}>
            <Image className={cx('avatar')} src={data.avatar} alt={data.nickname} />
            <div className={cx('info')}>
                <h4 className={cx('name')}>
                    <span>{data.nickname}</span>
                    {data.tick && <FontAwesomeIcon className={cx('check-icon')} icon={faCheckCircle} />}
                </h4>
                <span className={cx('usename')}>
                    {data.full_name} . <strong>{data.followers_count}</strong>
                    <span> Followers</span>
                </span>
                <strong className={cx('bio')}>{data.bio}</strong>
            </div>
        </Link>
    );
};

AccountItemSearch.propTypes = {
    data: PropTypes.object.isRequired,
};

export default AccountItemSearch;
