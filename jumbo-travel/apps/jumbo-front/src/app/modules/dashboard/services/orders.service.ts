import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from '@angular/core';
import { PlaneProductInterface, WebsiteService } from "@jumbo/core";
import { OrderInterface } from "../../../../../../../libs/core/src/lib/core/shared/interfaces/order.interface";
import { orderStatus } from "../../../../../../../libs/core/src/lib/core/shared/types/orderStatusTypes";
import { Observable } from "rxjs";
import { baseTypes } from "../../../../../../../libs/core/src/lib/core/shared/types/baseTypes";
import { AuthService } from "../../auth/services/auth.service";

@Injectable({
  providedIn: 'root'
})
export class OrdersService {

  apiUrl: string = this.websiteService.globals.apiUrl;

  constructor(private websiteService: WebsiteService, private http: HttpClient) { }

  createOrder(assistantId: string, planeId: string,destination: string, products: PlaneProductInterface[]): Observable<OrderInterface> {
    const orderBody: OrderInterface = {
      assistantId,
      planeId,
      products,
      destination,
      status: orderStatus.requested
    }
    return this.http.post<OrderInterface>(`${this.apiUrl}/orders`, orderBody);
  }

  getAssistantOrders(assistantId: string) {
    // const headers =  new HttpHeaders({
    //   'Content-Type': 'application/x-www-form-urlencoded',
    //   Authorization: 'Bearer ' + this.authService.accessToken
    // });


    return this.http.get<OrderInterface[]>(`${this.apiUrl}/orders/assistant/${assistantId}`, {});
  }
  getRestockerOrdersById(restockerId: string) {
    return this.http.get<OrderInterface[]>(`${this.apiUrl}/orders/restocker/${restockerId}`);
  }
  getRestockerOrdersByBase(base: baseTypes) {
    return this.http.get<OrderInterface[]>(`${this.apiUrl}/orders/base/${base}`);
  }

  approveOrder(orderId: string, restockerId: string) {
    return this.http.post<OrderInterface>(`${this.apiUrl}/orders/accept/${orderId}`, { restockerId});
  }
}
