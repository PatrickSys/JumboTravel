export interface ProductsInterface {
  _id: string;
  name: string;
  price: number;
  maxStock: number;
  orderQuantity?: number;
  currentStock?: number
}
