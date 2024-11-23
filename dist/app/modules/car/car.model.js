"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Car = void 0;
const mongoose_1 = __importStar(require("mongoose"));
const carSchema = new mongoose_1.Schema({
    brand: {
        type: String,
        required: [
            true,
            'The brand name is required. Please provide a valid car brand.',
        ],
    },
    model: {
        type: String,
        required: [
            true,
            'The model name is required. Please specify the car model.',
        ],
    },
    year: {
        type: Number,
        required: [
            true,
            'The manufacturing year is required. Please provide a valid year.',
        ],
        min: [
            1886,
            'The year must be 1886 or later, the year of the first car invention.',
        ],
        max: [
            new Date().getFullYear(),
            'The year cannot exceed the current year.',
        ],
    },
    category: {
        type: String,
        enum: {
            values: ['Sedan', 'SUV', 'Truck', 'Coupe', 'Convertible'],
            message: '{VALUE} is not a valid category. Category must be one of the following: Sedan, SUV, Truck, Coupe, or Convertible.',
        },
        required: [
            true,
            'The car category is required. Please select a valid category.',
        ],
    },
    description: {
        type: String,
        required: [true, 'A brief description of the car is required.'],
        maxlength: [300, 'The description should not exceed 300 characters.'],
    },
    quantity: {
        type: Number,
        required: [
            true,
            'The quantity is required. Please specify how many cars are available.',
        ],
        min: [1, 'The quantity must be at least 1.'],
        max: [100, 'The quantity cannot exceed 100.'],
    },
    inStock: {
        type: Boolean,
        default: true,
        required: [
            true,
            'The stock status is required. Please specify if the car is in stock.',
        ],
    },
    price: {
        type: Number,
        required: [true, 'The price is required. Please specify the car price.'],
        min: [1, 'The price must be at least $1.'],
        validate: {
            validator: (value) => value > 0,
            message: 'The price must be a positive number.',
        },
    },
}, {
    timestamps: true, // Adds createdAt and updatedAt fields automatically
});
exports.Car = mongoose_1.default.model('Car', carSchema);
