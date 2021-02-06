import { CategoryModel } from "./category.model";

export class ProductModel {
    id: string;
    name: string;
    description: string;
    image: string;
    images: string[];
    amount: number;
    priceSale: number;
    cost: number;
    isOnSale: boolean;
    status: string;
    serialNumber: string;
    createdAt: Date;
    updateAt: Date;
    categories: CategoryModel[];
}