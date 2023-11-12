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