import { GlobalsInterface } from "./globals.interface";

export interface Environment {
  production: boolean;
  globals: GlobalsInterface;
}
