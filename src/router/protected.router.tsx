import {Navigate, Outlet} from 'react-router-dom';
import {useSelector} from 'react-redux';
import {selectAuth} from '../store/auth/auth.slice';

export function ProtectedRoute() {
    const {token} = useSelector(selectAuth);
    return token ? <Outlet/> : <Navigate to="/register" replace/>;
}
