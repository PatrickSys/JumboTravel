import { planeModel } from "../types/planeModel";
import {
  ProductsInterface
} from "../../../../../../../apps/jumbo-front/src/app/modules/dashboard/interfaces/products.interface";

export interface PlaneInterface {
  model: planeModel;
  productsStock: [{
    product: {
      productInfo: ProductsInterface,
      stock: number
    }
  }];
}
