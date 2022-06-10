import { Component, OnInit } from "@angular/core";
import { ProductsService } from "../../services/products.service";
import { take } from "rxjs";
import {
  AppConfigService
} from "../../../../../../../../libs/core/src/lib/core/shared/services/config/app-config.service";
import { EmployeesService } from "../../services/employees.service";
import { EmployeeInterface, EventsManagerService, PlaneInterface, PlaneProductInterface } from "@jumbo/core";
import { OrdersService } from "../../services/orders.service";
import { OrderInterface } from "../../../../../../../../libs/core/src/lib/core/shared/interfaces/order.interface";
import { ToastrService } from "ngx-toastr";
import { Clipboard } from '@angular/cdk/clipboard';
import { RouteInterface } from "../../../../../../../../libs/core/src/lib/core/shared/interfaces/route.interface";
import { baseCodes } from "../../../../../../../../libs/core/src/lib/core/shared/types/baseTypes";
import { PlanesService } from "../../services/planes.service";

@Component({
  selector: 'jumbo-travel-assistant',
  templateUrl: './assistant.component.html',
  styleUrls: ['./assistant.component.scss'],
})


export class AssistantComponent implements OnInit {

  displayedColumns: string[] = [ 'name', 'price', 'maxStock', 'stock', 'orderQuantity'];
  products: PlaneProductInterface[];
  userName: string | undefined;
  loginUser: number | undefined;
  employeeData: EmployeeInterface;
  plane: PlaneInterface;
  route: RouteInterface;
  baseCode = baseCodes;
  alreadyOrdered: boolean = false;

  constructor(private productsService: ProductsService,
              private appConfig: AppConfigService,
              private employeesService: EmployeesService,
              private ordersService: OrdersService,
              private toastService: ToastrService,
              private clipboard: Clipboard,
              private planesService: PlanesService) {
    this.userName = this.appConfig.userName;
    this.loginUser = this.appConfig.loginUser;
  }

  ngOnInit(): void {
    if(this.loginUser) {
      this.employeesService.findEmployeeByidentifier(this.loginUser).subscribe((employee: EmployeeInterface) => {
        this.employeeData = employee;
        this.productsService.getPlaneById(this.employeeData.plane).subscribe((plane: PlaneInterface) => {
          this.plane = plane;
          if(plane.route)
          this.route = plane.route;
          this.products = plane.productsStock;
          this.getAssistantOrders();
        });
      });
    }

  }

  private getAssistantOrders() {
    this.ordersService.getAssistantOrders(this.employeeData._id).subscribe((orderData: OrderInterface[]) =>{
      orderData.forEach((order: OrderInterface) => {
        if(order.planeId === this.plane._id && order.assistantId === this.employeeData._id) {
          this.alreadyOrdered = true;
        }
      })
    })
  }

  validateForm(product: PlaneProductInterface) {
    if(!product.amount) return;
    if(product.amount < 0) {
    product.amount = 0;
    return;
    }
    if(product.amount + product.stock >  product.productInfo.maxStock) {
      product.amount = product.stock - product.productInfo.maxStock;
    }
  }

  createOrder() {
    // if(this.route.status !== 'on air' ) {
    //   this.toastService.error('The plane must be on air for ordering', 'Cannot order');
    //   return;
    // }
    // if(this.alreadyOrdered) {
    //   this.toastService.error('There\'s already an order for this route', 'Cannot order');
    //   return;
    // }


    let _products: PlaneProductInterface[] = [];
    this.products.forEach((product: PlaneProductInterface) => {
      if(product.amount) {
        product.stock = product.stock + product.amount;
        product.amount = 0;
      }
      _products.push(product);
    });

    if(_products.length === 0) {
      this.toastService.error('Please select at least one product to order', 'Order cannot be empty');
      return;
    }

    this.ordersService.createOrder(this.employeeData._id, this.employeeData.plane, this.route.destination, _products)
      .subscribe((orderData: OrderInterface) => {
        this.plane.productsStock = _products;
        console.log(this.plane);
        this.planesService.updatePlane(this.plane).subscribe(() => {
          setTimeout(this.getAssistantOrders.bind(this), 150);
        });


        this.toastService.success('Succesfully created order with id<br>' + orderData._id + '<br><small>Click to copy order id</small>', 'Order created', {
          timeOut: 8000,
          closeButton: true,
          enableHtml: true
        }).onTap.pipe(take(1))
          .subscribe(() => {
            this.clipboard.copy(<string>orderData._id)
          });
      });
  }

  fly() {
    this.planesService.updateStatus(this.plane._id, 'on air').subscribe(() => {
      this.route.status = 'on air';
    });
  }
  arrive() {
    this.planesService.updateStatus(this.plane._id, 'arrived').subscribe(() => {
      this.route.status = 'arrived';
    });
  }
  depart() {
    this.planesService.updateStatus(this.plane._id, 'departure').subscribe(() => {
      this.route.status = 'departure';
    });
  }
}


