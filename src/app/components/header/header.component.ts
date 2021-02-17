import { Component, OnInit } from '@angular/core';
import { CartModelServer } from 'src/app/business-logic/models/cart.model';
import { CartService } from 'src/app/business-logic/services';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  cartData: CartModelServer;
  cartTotal: number;

  constructor(private cartService: CartService) { }

  ngOnInit(): void {
    this.cartService.cartTotal$.subscribe(total => this.cartTotal = total);
    this.cartService.cartData$.subscribe(data => this.cartData = data);
  }

  deleteProductFromCart(index: number) {
    return this.cartService.deleteProductFromCart(index);
  }

}
