import { Injectable } from "@angular/core";
import { GlobalsInterface } from "../../interfaces/globals.interface";
import { environment } from "../../../../environments/environment";
import { DevGlobals } from "@jumbo/core";


@Injectable({
  providedIn: "root"
})
export class AppConfigService {

  private readonly _globals: GlobalsInterface = environment.globals ?? DevGlobals;
  userName: string | undefined;
  loginUser: number | undefined;

  constructor() {
  }

  get globals(): GlobalsInterface {
    return this._globals;
  }
}
