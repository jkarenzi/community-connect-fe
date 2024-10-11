import { User } from "./Auth";
import { Review } from "./Review";

export interface Service {
    id: number;
    type: string;
    location: string;
    availability: boolean;
    pricing: number;
    name: string;
    description: string;
    image: string;
    serviceProvider: User
    reviews: Review[]
}

export interface CreateServiceFormData {
    type: string;
    location: string;
    availability: boolean;
    pricing: number;
    name: string;
    description: string;
    image: string;
}

export interface UpdateServiceFormData {
    type?: string;
    location?: string;
    availability?: boolean;
    pricing?: number;
    name?: string;
    description?: string;
    image?: string; 
}

export interface IUpdateData {
    id: string,
    formData: UpdateServiceFormData
}
  