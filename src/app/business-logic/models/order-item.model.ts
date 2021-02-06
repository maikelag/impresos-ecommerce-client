import { OrderModel } from "./order.model";
import { ProductModel } from "./product.model";

export class OrderItemModel {
    id: string;
    product: ProductModel;
    quantity: number;
    order: OrderModel;
}