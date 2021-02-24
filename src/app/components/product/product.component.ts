import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { ProductModel } from '../../business-logic/models';
import { CartService, ProductService } from 'src/app/business-logic/services';

declare let $: any;

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent implements OnInit, AfterViewInit {
  baseImageUrl = 'http://127.0.0.1:3000/api';
  productId: string;
  product: ProductModel;
  thumbImages: any[] = [];

  @ViewChild('amount') amountInput

  constructor(private productService: ProductService, private cartService: CartService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.productId = this.route.snapshot.paramMap.get('id');
    this.productService.getProductById(this.productId).subscribe(product => {
      this.product = product;

      if (product.images !== null) {
        this.thumbImages = product.images;
      }
    })
  }

  ngAfterViewInit() {

    // Product Main img Slick
    $('#product-main-img').slick({
      infinite: true,
      speed: 300,
      dots: false,
      arrows: true,
      fade: true,
      asNavFor: '#product-imgs',
    });

    // Product imgs Slick
    $('#product-imgs').slick({
      slidesToShow: 3,
      slidesToScroll: 1,
      arrows: true,
      centerMode: true,
      focusOnSelect: true,
      centerPadding: 0,
      vertical: true,
      asNavFor: '#product-main-img',
      responsive: [{
        breakpoint: 991,
        settings: {
          vertical: false,
          arrows: false,
          dots: true,
        }
      },
      ]
    });

    // Product img zoom
    var zoomMainProduct = document.getElementById('product-main-img');
    if (zoomMainProduct) {
      $('#product-main-img .product-preview').zoom();
    }
  }

  addtoCart(productId: string) {
    this.cartService.addProductToCart(productId, this.amountInput.nativeElement.value)
  }

  increace() {
    let value = parseInt(this.amountInput.nativeElement.value);

    if (this.product.amount >= 1) {
      value++;

      if (value > this.product.amount) {
        value = this.product.amount;
      }
    } else {
      return;
    }
    this.amountInput.naiveElement.value = value.toString();
  }

  decreace() {
    let value = parseInt(this.amountInput.nativeElement.value);

    if (this.product.amount > 0) {
      value--;

      if (value <= 1) {
        value = 1
      }
    } else {
      return;
    }
    this.amountInput.naiveElement.value = value.toString();
  }
}
