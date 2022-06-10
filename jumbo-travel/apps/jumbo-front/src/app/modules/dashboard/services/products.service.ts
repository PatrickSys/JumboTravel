import { Injectable } from '@angular/core';
import { PlaneInterface, ProductInterface, WebsiteService } from "@jumbo/core";
import { HttpClient } from "@angular/common/http";
import { ObjectUnsubscribedError, Observable } from "rxjs";
import { ProductStockInterface } from "../../../../../../../libs/core/src/lib/core/shared/interfaces/product-stock";


@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  apiUrl: string = this.websiteService.globals.apiUrl;

  constructor(private websiteService: WebsiteService, private http: HttpClient) { }

  getProducts(): Observable<ProductInterface[]> {
    return this.http.get<ProductInterface[]>(`${this.apiUrl}/products`);
  }

  getPlanes(): Observable<ProductStockInterface[]> {
      return this.http.get<ProductStockInterface[]>(`${this.apiUrl}/planes`);
  }

  getPlaneById(id: string): Observable<PlaneInterface> {
    return this.http.get<PlaneInterface>(`${this.apiUrl}/planes/${id}`);
  }
}
