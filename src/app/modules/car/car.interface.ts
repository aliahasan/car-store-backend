import { Model } from 'mongoose';

export interface TCar {
  name: string; // Car name
  brand: string; // Manufacturer
  model: string; // Specific model
  year: number; // Manufacturing year
  price: number; // Price of the car
  category:
    | 'Sedan'
    | 'SUV'
    | 'Truck'
    | 'Coupe'
    | 'Convertible'
    | 'Van'
    | 'Other';
  description: string; // Detailed description of the car
  quantity: number; // Available quantity
  isStock: boolean; // Whether the car is in stock
  color: string[]; // Available colors for the car
  mileage: number; // Mileage (in km per liter or miles per gallon)
  fuelType: 'Petrol' | 'Diesel' | 'Electric' | 'Hybrid'; // Fuel type
  transmission: 'Manual' | 'Automatic'; // Transmission type
  engineCapacity: number; // Engine size in liters
  seatingCapacity: number; // Number of seats
  features: string[]; // List of additional features (e.g., sunroof, navigation system)
  rating: number; // Customer rating (1-5 scale)
  images: string | string[]; // Single image URL or an array of URLs
  warranty: string; // Warranty information (e.g., "5 years/100,000 km")
  discount?: number; // Optional field for discounts
}

export interface CarMOdel extends Model<TCar> {
  isCarExist(carId: string): Promise<TCar>;
}
