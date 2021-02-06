import { OrderItemModel } from "./order-item.model";

export class OrderModel {
    id: string;
    shippingAddress: string;
    city: string;
    status: string;
    phoneNumber: string;
    dateOrdered: Date;
    orderItems: OrderItemModel[]
}
