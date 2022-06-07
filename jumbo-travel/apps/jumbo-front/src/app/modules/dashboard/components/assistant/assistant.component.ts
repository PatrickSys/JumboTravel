import { Component, OnInit } from "@angular/core";
import { ProductsService } from "../../services/products.service";
import { ProductsInterface } from "../../interfaces/products.interface";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { map, switchMap } from "rxjs";
import { ProductstockInterface } from "../../interfaces/productstock.interface";
import { Debugger } from "inspector";
import {
  AppConfigService
} from "../../../../../../../../libs/core/src/lib/core/shared/services/config/app-config.service";

@Component({
  selector: 'jumbo-travel-assistant',
  templateUrl: './assistant.component.html',
  styleUrls: ['./assistant.component.scss'],
})


export class AssistantComponent implements OnInit {

  displayedColumns: string[] = [ 'name', 'price', 'maxstock', 'orderQuantity', 'currstock'];
  products: ProductsInterface[] | undefined;
  formControl = new FormControl(0, [Validators.required, Validators.min(0)]);
  formGroup: FormGroup;
  _products: ProductsInterface[] | undefined;
  userName: string | undefined;

  constructor(private productsService: ProductsService, private appConfig: AppConfigService) {
    this.formGroup = new FormGroup({
      formControl: new FormControl(0, Validators.min(0)),
    });
    this.userName = this.appConfig.userName;


    this.productsService.getProducts().subscribe((products: ProductsInterface[]) => {
      this._products = products;

      this.productsService.getPlaneStock().subscribe((productss: any) => productss.forEach((product: ProductstockInterface) => {
        this._products?.forEach(productt => {
          if(productt._id == product.productId) productt.currentStock = product.stock;
        })
        this.products = this._products;
      }));
    });
  }

  ngOnInit(): void {}

  validateForm(ev: any, currentStock: number = 0, maxStock: number) {
    if(ev?.target?.value < 0 ) {
    ev.target.value = 0;
    }
    if(ev.target.value > maxStock - currentStock) {
      ev.target.value = maxStock - currentStock;
    }
  }
}

