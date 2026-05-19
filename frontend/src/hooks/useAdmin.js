import { useContext } from 'react';
import { AdminContext } from '../context/AdminContext';

export const useAdmin = () => useContext(AdminContext);
export default useAdmin;
