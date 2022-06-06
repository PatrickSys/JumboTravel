import { Injectable } from '@angular/core';
import { WebsiteService } from "@jumbo/core";
import { HttpClient } from "@angular/common/http";
import { ObjectUnsubscribedError, Observable } from "rxjs";
import { ProductsInterface } from "../interfaces/products.interface";
import { ProductstockInterface } from "../interfaces/productstock.interface";

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  apiUrl: string = this.websiteService.globals.apiUrl;

  constructor(private websiteService: WebsiteService, private http: HttpClient) { }

  getProducts(): Observable<ProductsInterface[]> {
    return this.http.get<ProductsInterface[]>(`${this.apiUrl}/products`);
  }

  getProductsStock(): Observable<ProductstockInterface[]> {
      return this.http.get<ProductstockInterface[]>(`${this.apiUrl}/productstock`);
  }
}
