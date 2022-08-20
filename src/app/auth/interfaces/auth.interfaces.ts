export interface AuthResponse{
    message?: string;
    token?: string;
    store?: Store;     
}

export interface Store{
    id: number;
    email: string;
    nombre: string;
    urlLogo: string;
}
