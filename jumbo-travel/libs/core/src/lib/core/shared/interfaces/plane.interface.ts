import { planeModel } from "../types/planeModel";
import { ProductInterface } from "./product.interface";

export interface PlaneInterface {
  model: planeModel;
  productsStock: [{
    product: {
      productInfo: ProductInterface,
      stock: number
    }
  }];
}
