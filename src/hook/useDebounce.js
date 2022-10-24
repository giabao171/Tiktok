import { useEffect, useState } from 'react';

const useDebounce = (value, delay) => {
    const [debounceValue, setDebounceValue] = useState(value);

    useEffect(() => {
        const handle = setTimeout(() => setDebounceValue(value), delay);

        return () => clearTimeout(handle);
        // eslint-disable-next-line
    }, [value]);

    return debounceValue;
};

export default useDebounce;
