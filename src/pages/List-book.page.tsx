import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../store';
import { fetchBooks, deleteBook, selectBooks } from '../store/books/books.slice';

const BookListPage: React.FC = () => {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const { items, loading, error } = useAppSelector(selectBooks);

    useEffect(() => {
        dispatch(fetchBooks());
    }, [dispatch]);

    const handleEdit = (id: string) => {
        navigate(`/edit/${id}`);
    };

    const handleDelete = (id: string) => {
        if (window.confirm('Tem certeza que deseja excluir este livro?')) {
            dispatch(deleteBook(id));
        }
    };

    return (
        <div className="max-w-3xl mx-auto p-4">
            <h1 className="text-2xl font-bold mb-4">Meus Livros</h1>
            <button
                onClick={() => navigate('/add')}
                className="mb-4 px-4 py-2 bg-green-600 text-white rounded"
            >
                Adicionar Livro
            </button>
            {loading && <p>Carregando...</p>}
            {error && <p className="text-red-500">{error}</p>}
            <ul className="space-y-4">
                {items.map((book) => (
                    <li key={book.id} className="flex justify-between items-start p-4 border rounded">
                        <div>
                            <h2 className="text-lg font-semibold">{book.title}</h2>
                            <p className="text-gray-600">Autor: {book.author}</p>
                            <p>Nota: {'★'.repeat(book.rating) + '☆'.repeat(5 - book.rating)}</p>
                            {book.notes && <p className="mt-2 text-sm text-gray-700">Observações: {book.notes}</p>}
                        </div>
                        <div className="space-x-2">
                            <button
                                onClick={() => handleEdit(book.id)}
                                className="px-3 py-1 bg-blue-500 text-white rounded"
                            >
                                Editar
                            </button>
                            <button
                                onClick={() => handleDelete(book.id)}
                                className="px-3 py-1 bg-red-500 text-white rounded"
                            >
                                Excluir
                            </button>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default BookListPage;