import { Injectable } from '@angular/core';
import { GlobalsInterface } from "../../interfaces/globals.interface";
import { environment } from "../../../../../../../../apps/jumbo-front/src/environments/environment";


@Injectable({
  providedIn: 'root'
})
export class WebsiteService {

  private readonly _globals: GlobalsInterface = environment.globals;
  constructor() {}

  get globals(): GlobalsInterface {
    return this._globals;
  }
}
