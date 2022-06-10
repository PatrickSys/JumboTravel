export interface ProductInterface {
  name: string;
  price: number;
  maxStock: number;
  measureUnit: string;
}

export interface PlaneProductInterface {
  productInfo: ProductInterface;
  stock: number;
  amount?: number
}
