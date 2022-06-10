import { PlaneInterface } from "./plane.interface";
import { baseTypes } from "../types/baseTypes";

export interface EmployeeInterface {
  _id: string;
  loginIdentifier: number;
  name: string;
  plane: string;
  base: baseTypes;
  role: "assistant" | "restocker";
}
