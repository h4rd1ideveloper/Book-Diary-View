import React, {useRef} from 'react';
import {useAppDispatch, useAppSelector} from '../store';
import {clearError, login, selectAuth} from '../store/auth/auth.slice';
import {Navigate} from 'react-router-dom';

export default function LoginPage() {
    const dispatch = useAppDispatch();
    const {loading, error, token} = useAppSelector(selectAuth);
    const usernameRef = useRef<HTMLInputElement>(null);
    const passwordRef = useRef<HTMLInputElement>(null);

    if (token) {
        return <Navigate to="/" replace/>;
    }

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        dispatch(clearError());
        dispatch(login({username: String(usernameRef.current?.value), password: String(passwordRef.current?.value)}));
    };

    return (<div className="max-w-md mx-auto p-4">
        <h1 className="text-2xl font-bold mb-4">Login</h1>
        <form onSubmit={handleSubmit} className="space-y-4">
            <input
                ref={usernameRef}
                className="w-full px-3 py-2 border rounded"
                placeholder="Usuário"
                required
            />
            <input
                ref={passwordRef}
                type="password"
                className="w-full px-3 py-2 border rounded"
                placeholder="Senha"
                required
            />
            {error && <p className="text-red-500">{error}</p>}
            <button
                type="submit"
                disabled={loading}
                className="w-full bg-blue-600 text-white py-2 rounded"
            >
                {loading ? 'Entrando...' : 'Entrar'}
            </button>
        </form>
    </div>);
}
