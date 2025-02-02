import { Model } from 'mongoose';

export interface TCar {
  name: string;
  brand: string;
  model: string;
  year?: string;
  price: number;
  category: 'Sedan' | 'SUV' | 'Truck' | 'Coupe' | 'Convertible' | 'Van';
  description: string;
  quantity: number;
  color: string[];
  mileage: number;
  fuelType: 'Petrol' | 'Diesel' | 'Electric' | 'Hybrid';
  transmission: 'Manual' | 'Automatic';
  engineCapacity: number;
  seatingCapacity: number;
  features: string[];
  rating: number;
  images: string | string[];
  warranty: string;
  isStock: boolean;
}

export interface CarMOdel extends Model<TCar> {
  isCarExist(carId: string): Promise<TCar>;
}
