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
    avgRating: number;
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
    image: File;
}

export interface UpdateServiceFormData {
    type?: string;
    location?: string;
    availability?: boolean;
    pricing?: number;
    name?: string;
    description?: string;
}

export interface IUpdateData {
    id: number,
    formData: UpdateServiceFormData
}
  