
import { useSelector } from 'react-redux'
import { Navigate } from 'react-router-dom';

export const PrivatePage = ({ children }) => {
    const { user } = useSelector((state) => state.user);

    return user?.uid ? children : <Navigate to='/signIn' replace />
}
