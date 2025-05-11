export interface User {
    id: number;
    name: string;
    address: string;
}

export interface Car {
    id: number;
    brand: string;
    year: number;
    mileage: number;
    engine_type: 'Бензин' | 'Дизел' | 'Електрически' | 'Хибрид';
    horsepower: number;
    price: number;
    owner_id: number | null;
    image_url?: string;
    description?: string;
}

