export interface User {
    id?: number,
    name: string,
    class: string,
}

export interface CreateUserBody {
    name: string,
    class: string,
}