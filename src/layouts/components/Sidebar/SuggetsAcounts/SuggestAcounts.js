import React, { useState, useEffect } from 'react';
import classNames from 'classnames/bind';
import styles from './SuggestAcounts.module.scss';
import * as suggestAcountsService from '~/services/SuggestAcountService';
import AcountItem from './AcountItem';
import * as ListFollow from '~/services/Follow/FolowUnFollow';
import { useHook } from '~/hooks/useHook';

import PropTypes from 'prop-types';

const cx = classNames.bind(styles);

const SuggestAcounts = ({ label, onTippy = false }) => {
    const [suggestAccountList, setSuggestAccountList] = useState([]);
    const [moreSuggestAcc, setmoreSuggestAcc] = useState(false);
    const [moreFollowingAcc, setmoreFollowingAcc] = useState(false);
    const [lengthList, setLengthList] = useState();
    const { currentUser } = useHook();
    const [reRender, setReRender] = useState(false);

    // useEffect(() => {
    //     const fetch = async () => {
    //         try {
    //             const result = await suggestAcountsService.suggestAcount(1);
    //             setSuggestAccountList(result);
    //         } catch (error) {
    //             setSuggestAccountList([]);
    //         }
    //     };

    //     fetch();
    // }, []);

    // useEffect(() => {
    //     if (moreSuggestAcc) {
    //         let i = 2;
    //         while (i <= 5) {
    //             const fetch = async () => {
    //                 try {
    //                     const result = await suggestAcountsService.suggestAcount(i);
    //                     // const result = await ListFollow.getFollow(1, currentUser.meta.token);
    //                     // setSuggestAccountList(result);
    //                     setSuggestAccountList((prev = []) => [...prev, ...result]);
    //                 } catch (error) {
    //                     // setSuggestAccountList([]);
    //                 }
    //             };

    //             fetch();
    //             i++;
    //             console.log(i);
    //         }
    //     } else {
    //         const fetch = async () => {
    //             try {
    //                 // const result = await suggestAcountsService.suggestAcount(1);
    //                 const result = await ListFollow.getFollow(1, currentUser.meta.token);
    //                 setSuggestAccountList(result);
    //             } catch (error) {
    //                 setSuggestAccountList([]);
    //             }
    //         };

    //         fetch();
    //     }
    // }, [moreSuggestAcc]);

    useEffect(() => {
        if (label === 'Suggested accounts') {
            if (moreSuggestAcc === false) {
                const fetch = async () => {
                    try {
                        const result = await suggestAcountsService.suggestAcount(1);
                        setSuggestAccountList(result.data);
                        // setLengthList(result.meta.total);
                    } catch (error) {
                        setSuggestAccountList([]);
                    }
                };

                fetch();
            } else {
                let i = 2;
                while (i <= 5) {
                    const fetch = async () => {
                        try {
                            const result = await suggestAcountsService.suggestAcount(i);
                            // const result = await ListFollow.getFollow(1, currentUser.meta.token);
                            // setSuggestAccountList(result);
                            setSuggestAccountList((prev) => [...prev, ...result.data]);
                            // setLengthList(result.meta.total);
                        } catch (error) {
                            // setSuggestAccountList([]);
                        }
                    };

                    fetch();
                    i++;
                }
            }
        } else if (label === 'Following accounts') {
            if (moreSuggestAcc === false) {
                const fetch = async () => {
                    try {
                        // const result = await suggestAcountsService.suggestAcount(1);
                        const result = await ListFollow.getFollow(1, currentUser.meta.token);
                        setSuggestAccountList(result.data);
                        setLengthList(result.meta);
                    } catch (error) {
                        setSuggestAccountList([]);
                    }
                };

                fetch();
            } else {
                const fetch = async () => {
                    try {
                        // const result = await suggestAcountsService.suggestAcount(1);
                        const result = await ListFollow.getFollow(
                            lengthList?.pagination?.current_page + 1,
                            currentUser.meta.token,
                        );
                        setSuggestAccountList((prev) => [...prev, ...result.data]);
                        setLengthList(result.meta);
                    } catch (error) {
                        setSuggestAccountList([]);
                    }
                };

                fetch();
            }
        }
    }, [moreSuggestAcc, reRender]);

    const handleSeeMoreLessSuggest = () => {
        setmoreSuggestAcc(!moreSuggestAcc);
        // setPage(page + 1);
    };

    const handleSeeMoreLessFollowing = () => {};

    return (
        <div className={cx('wrapper')}>
            <p className={cx('label')}>{label}</p>

            {suggestAccountList.map((acc, index) => (
                <AcountItem key={acc.id} prop={acc} onTippy={onTippy} />
            ))}
            {label === 'Suggested accounts' &&
                (moreSuggestAcc ? (
                    <p className={cx('more-btn')} onClick={handleSeeMoreLessSuggest}>
                        See less
                    </p>
                ) : (
                    <p className={cx('more-btn')} onClick={handleSeeMoreLessSuggest}>
                        See more
                    </p>
                ))}
            {label === 'Following accounts' &&
                (suggestAccountList.length >= lengthList?.pagination?.total ? (
                    <p className={cx('more-btn')} onClick={() => setmoreSuggestAcc(false)}>
                        See less
                    </p>
                ) : (
                    <p
                        className={cx('more-btn')}
                        onClick={() => {
                            setmoreSuggestAcc(true);
                            setReRender(!reRender);
                        }}
                    >
                        See more
                    </p>
                ))}
        </div>
    );
};

SuggestAcounts.propTypes = {
    label: PropTypes.string.isRequired,
    onTippy: PropTypes.bool,
};

export default SuggestAcounts;
