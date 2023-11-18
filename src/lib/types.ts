export interface User {
    id: number,
    name: string,
    email: string,
    randomKey: string
}

export interface Session {
    user: User;
    expires: string;
}

export interface Params {
    params: { noteId: string };
}

export interface NoteProps {
    id: number;
    title: string;
    content: any;
    created_at: Date;
    updated_at: Date;
    deleted_at: Date;
}