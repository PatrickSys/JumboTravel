import { Component, OnInit } from "@angular/core";
import { ProductsService } from "../../services/products.service";
import { ProductsInterface } from "../../interfaces/products.interface";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { map, switchMap } from "rxjs";
import { ProductstockInterface } from "../../interfaces/productstock.interface";
import { ProductstockService } from "../../../../../../../jumbo-api/src/app/modules/productstock/productstock.service";
import { Debugger } from "inspector";
import {
  AppConfigService
} from "../../../../../../../../libs/core/src/lib/core/shared/services/config/app-config.service";

export interface PeriodicElement {
  name: string;
  position: number;
  weight: number;
  symbol: string;
}

const ELEMENT_DATA: PeriodicElement[] = [
  {position: 1, name: 'Hydrogen', weight: 1.0079, symbol: 'H'},
  {position: 2, name: 'Helium', weight: 4.0026, symbol: 'He'},
  {position: 3, name: 'Lithium', weight: 6.941, symbol: 'Li'},
  {position: 4, name: 'Beryllium', weight: 9.0122, symbol: 'Be'},
  {position: 5, name: 'Boron', weight: 10.811, symbol: 'B'},
  {position: 6, name: 'Carbon', weight: 12.0107, symbol: 'C'},
  {position: 7, name: 'Nitrogen', weight: 14.0067, symbol: 'N'},
  {position: 8, name: 'Oxygen', weight: 15.9994, symbol: 'O'},
  {position: 9, name: 'Fluorine', weight: 18.9984, symbol: 'F'},
  {position: 10, name: 'Neon', weight: 20.1797, symbol: 'Ne'},
];

@Component({
  selector: 'jumbo-travel-assistant',
  templateUrl: './assistant.component.html',
  styleUrls: ['./assistant.component.scss'],
})


export class AssistantComponent implements OnInit {

  displayedColumns: string[] = [ 'name', 'price', 'maxstock', 'orderQuantity', 'currstock'];
  dataSource = ELEMENT_DATA;
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

      this.productsService.getProductsStock().subscribe((productss: any) => productss.forEach((product: ProductstockInterface) => {
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

