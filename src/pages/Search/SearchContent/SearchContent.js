import React, { useState, useEffect } from 'react';
import classNames from 'classnames/bind';
import styles from './SearchContent.module.scss';
import * as searchServices from '~/services/searchService';
import AcountItemSearch from '~/components/AcountItemSearch';

import { useParams } from 'react-router-dom';
import Button from '~/Button/Button';
import { MoreActionIcon, PrevIcon } from '~/components/icons/Icons';

const cx = classNames.bind(styles);

const SearchContent = () => {
    const [searchResult, setSearchResult] = useState([]);
    const [loadMore, setLoadMore] = useState(false);
    const [pageValue, setPageValue] = useState(2);

    const { searchvalue } = useParams();

    useEffect(() => {
        const fetch = async () => {
            try {
                const result = await searchServices.search(searchvalue, 'more', 1);
                setSearchResult(result);
            } catch (error) {
                console.log('ko lay dc list tim kiem');
            }
        };
        console.log('lay trang 1');
        fetch();
        setPageValue(2);
    }, [searchvalue]);

    // useEffect(() => {
    //     if (loadMore) {
    //         const fetch = async () => {
    //             setPageValue(pageValue + 1);
    //             try {
    //                 const result = await searchServices.search(searchvalue, 'less', pageValue);
    //                 setSearchResult((prev) => [...prev, ...result]);
    //             } catch (error) {
    //                 console.log('ko lay dc list tim kiem');
    //             }
    //         };

    //         fetch();
    //     }
    // }, [loadMore]);

    const handleLoadMore = async () => {
        setPageValue(pageValue + 1);
        console.log(pageValue, 'sau khi setstate');
        const result = await searchServices.search(searchvalue, 'more', pageValue);
        setSearchResult((prev) => [...prev, ...result]);
        console.log('sau khi tang state: ', searchResult);
    };

    console.log(pageValue, 'console');
    console.log(searchvalue);
    console.log(searchResult);

    // const handleLoadmore = () => {
    //     setLoadMore(true);
    // };

    return (
        <div className={cx('wrapper')}>
            {searchResult?.map((item, index) => (
                <AcountItemSearch key={index} data={item} />
            ))}
            <div className={cx('load-more')}>
                <Button className={cx('load-more-btn')} rightIcon={<MoreActionIcon />} onClick={handleLoadMore}>
                    Load more
                </Button>
            </div>
        </div>
    );
};

export default SearchContent;
