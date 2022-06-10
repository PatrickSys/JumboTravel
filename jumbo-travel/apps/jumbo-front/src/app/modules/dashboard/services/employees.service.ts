import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { EmployeeInterface, WebsiteService } from "@jumbo/core";

@Injectable({
  providedIn: "root"
})
export class EmployeesService {

  apiUrl: string = this.websiteService.globals.apiUrl;

  constructor(private websiteService: WebsiteService, private http: HttpClient) {
  }

  findEmployeeByidentifier(userIdentifier: number): Observable<EmployeeInterface> {
    return this.http.get<EmployeeInterface>(`${this.apiUrl}/employees/find/${userIdentifier}`);
  }

  listenOnNotifications() {
    return new EventSource(`${this.apiUrl}/employees/sse`);
  }
}
