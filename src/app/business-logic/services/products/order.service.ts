import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { environment } from "../../../../environments/environment";
import { Observable } from "rxjs";
import { OrderModel } from '../../models';
import { OrderCreateDto } from '../../dtos';

@Injectable({
  providedIn: 'root'
})
export class OrderService {
  private url = environment.serverURL;

  constructor(private http: HttpClient) {
  }

  getAllOrders(): Observable<OrderModel> {
    return this.http.get<OrderModel>(`${this.url}/orders`);
  }

  removeOrder(orderId: string): Observable<OrderModel> {
    return this.http.delete<OrderModel>(`${this.url}/orders/${orderId}`);
  }

  createOrder(orderData: OrderCreateDto): Observable<OrderModel> {
    return this.http.post<OrderModel>(`${this.url}/orders`, orderData);
  }

  changeStatusOrder(orderId: string, newStatus: string): Observable<OrderModel> {
    return this.http.patch<OrderModel>(`${this.url}/orders/${orderId}/status`, { newStatus });
  }
}
