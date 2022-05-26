import { Injectable } from "@angular/core";
import { GlobalsInterface } from "../../interfaces/globals.interface";
import { AppConfigService } from "../config/app-config.service";


@Injectable({
  providedIn: "root"
})
export class WebsiteService {

  private readonly _globals: GlobalsInterface = this.appConfigService.globals;

  constructor(private appConfigService: AppConfigService) {
  }

  get globals(): GlobalsInterface {
    return this._globals;
  }
}
