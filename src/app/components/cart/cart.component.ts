import { Component, OnInit } from '@angular/core';
import { CartModelServer } from 'src/app/business-logic/models/cart.model';
import { CartService } from 'src/app/business-logic/services';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit {
  cartData: CartModelServer;
  cartTotal: number;
  cartSubTotal: number;

  constructor(public cartService: CartService) { }

  ngOnInit(): void {
    this.cartService.cartTotal$.subscribe(total => this.cartTotal = total);
    this.cartService.cartData$.subscribe(data => this.cartData = data);
  }

  deleteProductFromCart(index: number) {
    return this.cartService.deleteProductFromCart(index);
  }

  changeAmount(index: number, increase: boolean) {
    this.cartService.updateCartItems(index, increase);
  }

}
