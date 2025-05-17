import React, {useRef, useState} from 'react';
import {useNavigate} from 'react-router-dom';
import api from "../lib/http.client.ts";

const RegisterPage: React.FC = () => {
    const usernameRef = useRef<HTMLInputElement>(null)
    const passwordRef = useRef<HTMLInputElement>(null)
    const confirmPasswordRef = useRef<HTMLInputElement>(null)
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!usernameRef.current?.value || !passwordRef.current?.value) {
            setError('Todos os campos são obrigatórios');
            return;
        }
        if (passwordRef.current?.value !== confirmPasswordRef.current?.value) {
            setError('As senhas não coincidem');
            return;
        }
        setError(null);
        setLoading(true);
        try {
            await api.post('/auth/register', {
                username: usernameRef.current?.value,
                password: passwordRef.current?.value
            });
            navigate('/login');
        } catch (err) {
            console.log(err);
            setError('Erro ao registrar usuário');
        } finally {
            setLoading(false);
        }
    };

    return (<div className="max-w-md mx-auto p-4">
        <h1 className="text-2xl font-bold mb-4">Registrar Usuário</h1>
        <form onSubmit={handleSubmit} className="space-y-4">
            <div>
                <label className="block mb-1">Usuário</label>
                <input
                    ref={usernameRef}
                    type="text"
                    className="w-full px-3 py-2 border rounded"
                    required
                />
            </div>
            <div>
                <label className="block mb-1">Senha</label>
                <input
                    ref={passwordRef}
                    type="password"
                    className="w-full px-3 py-2 border rounded"
                    required
                />
            </div>
            <div>
                <label className="block mb-1">Confirmar Senha</label>
                <input
                    ref={confirmPasswordRef}
                    type="password"
                    className="w-full px-3 py-2 border rounded"
                    required
                />
            </div>
            {error && <p className="text-red-500">{error}</p>}
            <button
                type="submit"
                className="w-full bg-blue-600 text-white py-2 rounded"
                disabled={loading}
            >
                {loading ? 'Registrando...' : 'Registrar'}
            </button>
        </form>
    </div>);
};

export {RegisterPage};
