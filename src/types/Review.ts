import { User } from "./Auth";
import { Service } from "./Service";

export interface ReviewFormData {
    rating: number;
    description: string;
    serviceId: number;
}

export interface Review {
    id: number,
    rating: number,
    description: string,
    user: User,
    service: Service
}
  