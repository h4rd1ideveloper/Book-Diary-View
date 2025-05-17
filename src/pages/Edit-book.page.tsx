import React, {useState, useEffect, useRef} from 'react';
import {useNavigate, useParams} from 'react-router-dom';
import {useAppDispatch, useAppSelector} from '../store';
import {selectBooks, updateBook} from '../store/books/books.slice';

const EditBookPage: React.FC = () => {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const params = useParams<{ id: string }>();
    const {items} = useAppSelector(selectBooks);

    const book = items.find((b) => b.id === params.id);
    const [error, setError] = useState<string | null>(null);
    const titleRef = useRef<HTMLInputElement>(null)
    const authorRef = useRef<HTMLInputElement>(null)
    const ratingRef = useRef<HTMLSelectElement>(null)
    const notesRef = useRef<HTMLTextAreaElement>(null)
    useEffect(() => {
        if (!book) navigate('/');
        else {
            console.log("REFAZENDO CAMPOS")
            if(titleRef.current) titleRef.current.value = book.title
            if(authorRef.current) authorRef.current.value = book.author
            if(ratingRef.current) ratingRef.current.value = String(book.rating)
            if(notesRef.current) notesRef.current.value = String(book.notes)
        }
    }, [book, navigate]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const title = titleRef.current?.value, author = authorRef.current?.value,
            rating = Number(ratingRef.current?.value), notes = String(notesRef.current?.value);
        if (!title || !author) {
            setError('Título e autor são obrigatórios');
            return;
        }
        setError(null);
        try {
            await dispatch(updateBook({id: String(params.id), title, author, rating, notes})).unwrap();
            navigate('/');
        } catch (err) {
            setError((err as string) || 'Erro ao atualizar livro');
        }
    };

    return (<div className="max-w-md mx-auto p-4">
        <h1 className="text-2xl font-bold mb-4">Editar Livro</h1>
        <form onSubmit={handleSubmit} className="space-y-4">
            <div>
                <label className="block mb-1">Título</label>
                <input ref={titleRef} className="w-full px-3 py-2 border rounded"/>
            </div>
            <div>
                <label className="block mb-1">Autor</label>
                <input ref={authorRef} className="w-full px-3 py-2 border rounded"/>
            </div>
            <div>
                <label className="block mb-1">Nota</label>
                <select ref={ratingRef} className="w-full px-3 py-2 border rounded">
                    {[1, 2, 3, 4, 5].map((n) => (<option key={n} value={n}>{n}</option>))}
                </select>
            </div>
            <div>
                <label className="block mb-1">Observações</label>
                <textarea ref={notesRef} className="w-full px-3 py-2 border rounded"/>
            </div>
            {error && <p className="text-red-500">{error}</p>}
            <button type="submit" className="w-full bg-blue-600 text-white py-2 rounded">Atualizar</button>
        </form>
    </div>);
};

export default EditBookPage;
