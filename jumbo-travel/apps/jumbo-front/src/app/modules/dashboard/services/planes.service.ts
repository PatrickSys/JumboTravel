import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {
  AppConfigService
} from "../../../../../../../libs/core/src/lib/core/shared/services/config/app-config.service";
import { PlaneInterface } from "@jumbo/core";

@Injectable({
  providedIn: 'root'
})
export class PlanesService {

  constructor(private http: HttpClient, private appConfig: AppConfigService) {
  }

  updateStatus(planeId: string, newStatus: string) {
      return this.http.post(`${this.appConfig.globals.apiUrl}/planes/status/${planeId}`, { newStatus });
  }
  updatePlane(plane: PlaneInterface) {
    return this.http.patch(`${this.appConfig.globals.apiUrl}/planes/${plane._id}`,  plane);
  }
}
