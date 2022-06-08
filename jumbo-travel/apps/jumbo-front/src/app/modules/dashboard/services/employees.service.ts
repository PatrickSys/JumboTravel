import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { Employee } from "../../../../../../jumbo-api/src/app/schemas/employee.schema";
import { WebsiteService } from "@jumbo/core";

@Injectable({
  providedIn: 'root'
})
export class EmployeesService {

  apiUrl: string = this.websiteService.globals.apiUrl;

  constructor(private websiteService: WebsiteService, private http: HttpClient) { }

  findEmployeeByidentifier(userIdentifier: number): Observable<Employee>{
    return this.http.get<Employee>(`${this.apiUrl}/employees/find/${userIdentifier}`)
  }
}
