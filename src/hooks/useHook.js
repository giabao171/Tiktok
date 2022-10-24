import { useContext } from 'react';
import { HookContext } from '../store/Provider';

const useHook = () => {
    return useContext(HookContext);
};

export { useHook };
