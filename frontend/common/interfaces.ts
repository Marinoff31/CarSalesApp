export interface IUser {
  id: number;
  name: string;
  address: string;
  phone: string;
}


export interface ICar {
    id?: number;
    brand: string;
    production_year: number;
    mileage: number;
    engine_type: "Бензин" | "Дизел" | "Електрически" | "Хибрид";
    horsepower: number;
    price: number;
    owner_id: number;
    image_url?: string;
    description?: string;
  }
  