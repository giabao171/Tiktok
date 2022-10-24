import React, { useEffect } from 'react';
import classNames from 'classnames/bind';
import styles from './Search.module.scss';
import SearchContent from './SearchContent';
import { useHook } from '~/hooks/useHook';

const cx = classNames.bind(styles);

const Search = () => {
    const { lessSideBar, setLessSideBar, largeHeader, setLargeHeader, setmarginContentDefault, currentVideo } =
        useHook();

    useEffect(() => {
        setLessSideBar(false);
        setLargeHeader(false);
        setmarginContentDefault(true);
    }, []);

    return (
        <div className={cx('wrapper')}>
            <SearchContent />
        </div>
    );
};

export default Search;
