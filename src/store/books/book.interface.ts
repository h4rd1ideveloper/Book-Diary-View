export interface Book {
    id: string;
    title: string;
    author: string;
    rating: number;
    notes?: string;
}
export interface BooksState {
    items: Book[];
    loading: boolean;
    error: string | null;
}

export const initialState: BooksState = {
    items: [],
    loading: false,
    error: null,
};