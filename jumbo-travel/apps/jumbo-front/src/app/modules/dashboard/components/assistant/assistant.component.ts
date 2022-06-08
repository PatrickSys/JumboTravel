import { Component, OnInit } from "@angular/core";
import { ProductsService } from "../../services/products.service";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { map, switchMap } from "rxjs";
import { Debugger } from "inspector";
import {
  AppConfigService
} from "../../../../../../../../libs/core/src/lib/core/shared/services/config/app-config.service";
import { Employee } from "apps/jumbo-api/src/app/schemas/employee.schema";
import { EmployeesService } from "../../services/employees.service";
import { Plane } from "../../../../../../../jumbo-api/src/app/schemas/plane.schema";
import { ProductInterface } from "@jumbo/core";

@Component({
  selector: 'jumbo-travel-assistant',
  templateUrl: './assistant.component.html',
  styleUrls: ['./assistant.component.scss'],
})


export class AssistantComponent implements OnInit {

  displayedColumns: string[] = [ 'name', 'price', 'maxStock', 'stock', 'orderQuantity'];
  products: ProductInterface[] | undefined;
  formControl = new FormControl(0, [Validators.required, Validators.min(0)]);
  formGroup: FormGroup;
  //_products: ProductsInterface[] | undefined;
  userName: string | undefined;
  loginUser: number | undefined;
  employeeData: any;
  plane: Plane;

  constructor(private productsService: ProductsService, private appConfig: AppConfigService, private employeesService: EmployeesService) {
    this.formGroup = new FormGroup({
      formControl: new FormControl(0, Validators.min(0)),
    });
    this.userName = this.appConfig.userName;
    this.loginUser = this.appConfig.loginUser;

    if(this.loginUser) {
      this.employeesService.findEmployeeByidentifier(this.loginUser).subscribe((employee: any) => {
        this.employeeData = employee;

        this.productsService.getPlaneById(this.employeeData.plane).subscribe((plane: any) => {
          this.plane = plane;
          this.products = plane.productsStock;
        });

      });


    }




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

