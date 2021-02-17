import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { environment } from "../../../../environments/environment";
import { BehaviorSubject } from 'rxjs';
import { CartModelServer } from '../../models/cart.model';
import { ProductService } from './product.service';
import { OrderService } from './order.service';
import { NavigationExtras, Router } from '@angular/router';
import { ProductModel } from '../../models';
import { ToastrService } from 'ngx-toastr';
import { NgxSpinnerService } from 'ngx-spinner';


@Injectable({
  providedIn: 'root'
})
export class CartService {
  private url = environment.serverURL;

  private cartDataClient = {
    total: 0,
    productData: [{
      incart: 0,
      id: ''
    }]
  }

  private cartDataServer: CartModelServer = {
    total: 0,
    data: [{
      numInCart: 0,
      product: undefined
    }]
  }

  cartTotal$ = new BehaviorSubject<number>(0);
  cartData$ = new BehaviorSubject<CartModelServer>(this.cartDataServer);

  constructor(private http: HttpClient, private productService: ProductService, private orderService: OrderService, 
                  private router: Router, private toast: ToastrService, private spinner: NgxSpinnerService) {
    this.cartTotal$.next(this.cartDataServer.total);
    this.cartData$.next(this.cartDataServer);

    let info = JSON.parse(localStorage.getItem('cart'));
    if (info !== null && info !== undefined && info.productData[0]?.incart !== 0) {
      this.cartDataClient = info;

      this.cartDataClient.productData.forEach(p => {
        this.productService.getProductById(p.id).subscribe((actualProductInfo: ProductModel) => {
          if (this.cartDataServer.data[0].numInCart === 0) {
            this.cartDataServer.data[0].numInCart = p.incart;
            this.cartDataServer.data[0].product = actualProductInfo;

            this.cartDataClient.total = this.cartDataServer.total;
            localStorage.setItem('cart', JSON.stringify(this.cartDataClient));
          } else {
            this.cartDataServer.data.push({
              numInCart: p.incart,
              product: actualProductInfo
            });

            this.cartDataClient.total = this.cartDataServer.total;
            localStorage.setItem('cart', JSON.stringify(this.cartDataClient));
          }
          this.cartData$.next({ ...this.cartDataServer, });
        })
      })
    }


  }

  addProductToCart(productId: string, amount?: number) {
    this.productService.getProductById(productId).subscribe(prod => {
      if (this.cartDataServer.data[0].product === undefined) {
        this.cartDataServer.data[0].product = prod;
        this.cartDataServer.data[0].numInCart = amount !== undefined ? amount : 1;

        this.cartDataClient.productData[0].incart = this.cartDataServer.data[0].numInCart;
        this.cartDataClient.productData[0].id = prod.id;
        this.cartDataClient.total = this.cartDataServer.total;
        this.cartData$.next({ ...this.cartDataServer });
        this.calculateTotal();
        localStorage.setItem('cart', JSON.stringify(this.cartDataClient));
        this.cartDataClient.total = this.cartDataServer.total;
        this.toast.success(`${prod.name} added to the cart`, 'Product Added', {
          timeOut: 1500,
          progressBar: true,
          progressAnimation: 'increasing',
          positionClass: 'toast-top-right'
        });
        
      } else {
        let index = this.cartDataServer.data.findIndex(p => p.product.id === prod.id);

        if (index !== -1) {
          if (amount === undefined && amount <= prod.amount) {
            this.cartDataServer.data[index].numInCart = this.cartDataServer.data[index].numInCart < prod.amount ? amount : prod.amount;
          } else {
            this.cartDataServer.data[index].numInCart < prod.amount ? this.cartDataServer.data[index].numInCart++ : prod.amount
          }

          this.cartDataClient.productData[index].incart = this.cartDataServer.data[index].numInCart;
          this.calculateTotal();
          this.cartDataClient.total = this.cartDataServer.total;
          localStorage.setItem('cart', JSON.stringify(this.cartDataClient));
          this.toast.info(`${prod.name} amount updated in the cart`, 'Product Updated', {
            timeOut: 1500,
            progressBar: true,
            progressAnimation: 'increasing',
            positionClass: 'toast-top-right'
          });
          
        } else {
          this.cartDataServer.data.push({
            numInCart: 1,
            product: prod
          });
          this.cartDataClient.productData.push({
            incart: 1,
            id: prod.id
          });

          localStorage.setItem('cart', JSON.stringify(this.cartDataClient));
          this.toast.success(`${prod.name} added to the cart`, 'Product Added', {
            timeOut: 1500,
            progressBar: true,
            progressAnimation: 'increasing',
            positionClass: 'toast-top-right'
          });

          this.calculateTotal();
          this.cartDataClient.total = this.cartDataServer.total;
          localStorage.setItem('cart', JSON.stringify(this.cartDataClient));
          this.cartData$.next({ ...this.cartDataServer });

        }
      }
    })

  }

  updateCartItems(index: number, increace: boolean) {
    let data = this.cartDataServer.data[index];

    if (increace) {
      data.numInCart < data.product.amount ? data.numInCart++ : data.product.amount;
      this.cartDataClient.productData[index].incart = data.numInCart;

      this.cartDataClient.total = this.cartDataServer.total;
      localStorage.setItem('cart', JSON.stringify(this.cartDataClient));
      this.cartData$.next({ ...this.cartDataServer });
    } else {
      data.numInCart--;

      if (data.numInCart < 1) {
        this.cartData$.next({ ...this.cartDataServer });
      } else {
        this.cartData$.next({ ...this.cartDataServer });
        this.cartDataClient.productData[index].incart = data.numInCart;
        this.cartDataClient.total = this.cartDataServer.total;
        localStorage.setItem('cart', JSON.stringify(this.cartDataClient));
      }
    }
  }

  deleteProductFromCart(index: number) {
    if (window.confirm('Quieres eliminar el producto')) {
      this.cartDataServer.data.splice(index, 1);
      this.cartDataClient.productData.splice(index, 1);
      this.cartDataClient.total = this.cartDataServer.total;

      if (this.cartDataClient.total === 0) {
        this.cartDataClient = {
          total: 0,
          productData: [{
            incart: 0,
            id: ''
          }]
        }
        localStorage.setItem('cart', JSON.stringify(this.cartDataClient));
      } else {
        localStorage.setItem('cart', JSON.stringify(this.cartDataClient));
      }

      if (this.cartDataServer.total === 0) {
        this.cartDataServer = {
          total: 0,
          data: [{
            numInCart: 0,
            product: undefined
          }]
        }
        this.cartData$.next({ ...this.cartDataServer });
      } else {
        this.cartData$.next({ ...this.cartDataServer });
      }
    } else {
      return;
    }

  }

  private calculateTotal() {
    let total = 0;
    this.cartDataServer.data.forEach(p => {
      const { numInCart } = p;
      const { priceSale } = p.product;

      total += numInCart * priceSale;
    })
    this.cartDataServer.total = total;
    this.cartTotal$.next(this.cartDataServer.total);
  }

  calculateSubTotal(index: number): number {
    let subtotal = 0;
    const p = this.cartDataServer.data[index];
    subtotal = p.product.priceSale * p.numInCart;
    return subtotal;
  }

  checkoutFromCart(userId: string) {
    this.http.post(`${this.url}/orders/payment`, {}).subscribe((res: { success: boolean }) => {
      if (res.success) {
        this.resetServerData();
        this.http.post(`${this.url}/orders/new`, {
          userId,
          products: this.cartDataClient.productData
        }).subscribe((data: OrderResponse) => {
          this.orderService.getOrderById(data.orderId).then(prods => {
            if (data.success) {
              const navigationExtra: NavigationExtras = {
                state: {
                  message: data.message,
                  products: prods,
                  orderId: data.orderId,
                  total: this.cartDataClient.total
                }
              };

              this.spinner.hide();
              this.router.navigate(['/thankyou'], navigationExtra).then(p => {
                this.cartDataClient = {
                  total: 0,
                  productData: [{
                    incart: 0,
                    id: ''
                  }]
                };
                this.cartTotal$.next(0);
                localStorage.setItem('cart', JSON.stringify(this.cartDataClient));
              })
            }
          })
        })
      } else {
        this.spinner.hide()
        this.router.navigateByUrl('/checkout').then();
        this.toast.error(`Sorry, failed to book the order`, 'Order Status', {
          timeOut: 1500,
          progressBar: true,
          progressAnimation: 'increasing',
          positionClass: 'toast-top-right'
        });
      }
    })
  }

  private resetServerData() {
    this.cartDataServer = {
      total: 0,
      data: [{
        numInCart: 0,
        product: undefined
      }]
    };
    this.cartData$.next({ ...this.cartDataServer });
  }

}
interface OrderResponse {
  orderId: string;
  success: boolean;
  message: string;
  products: [{
    id: string,
    numInCart: string
  }]
}