import { planeModel } from "../types/planeModel";
import { PlaneProductInterface, ProductInterface } from "./product.interface";
import { RouteInterface } from "./route.interface";

export interface PlaneInterface {
  _id: string;
  model: planeModel;
  productsStock: PlaneProductInterface[];
  route?: RouteInterface;
}
