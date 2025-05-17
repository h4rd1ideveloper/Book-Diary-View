import {Navigate, Outlet} from 'react-router-dom';
import {useSelector} from 'react-redux';
import {selectAuth} from '../store/auth/auth.slice';

export function PublicRoute() {
    const {token} = useSelector(selectAuth);
    return token ? <Navigate to="/" replace/> : <Outlet/>;
}
