import { ProductModel } from "./product.model";

export interface CartModelServer {
  total: number;
  data: [{
    product: ProductModel,
    numInCart: number,
  }]
}

export interface CartModelPublic {
  total: number;
  productData: [
    {
      id: number,
      incart: number,
    }
  ]
}
