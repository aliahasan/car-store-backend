import { Model } from 'mongoose';

export interface TCar {
  name: string;
  brand: string;
  model: string;
  year: number;
  price: number;
  category: 'Sedan' | 'SUV' | 'Truck' | 'Coupe' | 'Convertible' | 'Van';
  description: string;
  quantity: number;
  color: string[];
  mileage: number; // Mileage (in km per liter or miles per gallon)
  fuelType: 'Petrol' | 'Diesel' | 'Electric' | 'Hybrid';
  transmission: 'Manual' | 'Automatic';
  engineCapacity: number;
  seatingCapacity: number;
  features: string[];
  rating: number;
  images: string | string[];
  warranty: string; // Warranty information (e.g., "5 years/100,000 km")
  isStock: boolean;

  discount?: number; // Optional field for discounts
}

export interface CarMOdel extends Model<TCar> {
  isCarExist(carId: string): Promise<TCar>;
}
