import { PlaneProductInterface, ProductInterface } from "@jumbo/core";
import { orderStatus } from "../types/orderStatusTypes";

export interface OrderInterface {
  createdAt?: any;
  updatedAt?: any;
  _id?: string;
  assistantId: string;
  restockerId?: string;
  planeId: string;
  products: PlaneProductInterface[];
  status: string;
  totalCost?: number;
  destination?: string;
}
