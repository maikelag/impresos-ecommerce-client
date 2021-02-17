import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ProductModel } from 'src/app/business-logic/models';
import { CartService, ProductService } from 'src/app/business-logic/services';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  products: ProductModel[] = [];

  constructor(private productService: ProductService, private cartService: CartService, private router: Router) { }

  ngOnInit(): void {
    this.loadAllProduct();
  }

  loadAllProduct() {
    this.productService.getAllProducts().subscribe(products => {
      this.products = products;
    })
  }

  selectProduct(productId: string) {
    this.router.navigate(['/product', productId]).then()
  }

  addToCart (productId: string) {
    this.cartService.addProductToCart(productId);
  }

}
