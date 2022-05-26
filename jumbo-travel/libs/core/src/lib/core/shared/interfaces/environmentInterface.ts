import { GlobalsInterface } from "./globals.interface";

export interface EnvironmentInterface {
  readonly production: boolean;
  readonly globals?: GlobalsInterface;
}
