export interface User {
    id: number,
    email: string,
    createdAt: Date,
    updatedAt: Date
}

export interface authFormData {
    email:string,
    password: string
}