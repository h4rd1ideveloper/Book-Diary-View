export interface AuthState {
    token: string | null;
    username: string | null;
    loading: boolean;
    error: string | null;
}

export const initialState: AuthState = {
    token: localStorage.getItem('token'),
    username: null,
    loading: false,
    error: null,
};