import { PlaneInterface } from "./plane.interface";

export interface EmployeeInterface {
  loginIdentifier: number;
  name: string;
  plane: string | PlaneInterface;
  base: string;
  role: "assistant" | "restocker";
}
