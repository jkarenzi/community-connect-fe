export interface User {
    id: number,
    email: string,
    createdAt: Date,
    updatedAt: Date,
    role: 'consumer' | 'serviceProvider'
}

export interface authFormData {
    email:string,
    password: string
}