import { Component, OnInit } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { OrderInterface } from "../../../../../../../../../libs/core/src/lib/core/shared/interfaces/order.interface";
import { OrdersService } from "../../../../dashboard/services/orders.service";
import {
  AppConfigService
} from "../../../../../../../../../libs/core/src/lib/core/shared/services/config/app-config.service";
import { EmployeesService } from "../../../../dashboard/services/employees.service";
import {
  EmployeeInterface,
  EventsManagerService,
  PlaneInterface,
  PlaneProductInterface,
  Events
} from "@jumbo/core";
import { ProductsService } from "../../../../dashboard/services/products.service";
import { RouteInterface } from "../../../../../../../../../libs/core/src/lib/core/shared/interfaces/route.interface";
import { baseCodes } from "../../../../../../../../../libs/core/src/lib/core/shared/types/baseTypes";
import { MatDialog } from "@angular/material/dialog";
import { ProductsDialogComponent } from "../products-dialog/products-dialog.component";

@Component({
  selector: "jumbo-travel-orders",
  templateUrl: "./orders.component.html",
  styleUrls: ["./orders.component.scss"]
})
export class OrdersComponent implements OnInit {

  orders: OrderInterface[];
  role: string;
  employeeData: EmployeeInterface;
  id: string;
  userName: string;
  loginUser: number;
  plane: PlaneInterface;
  route: RouteInterface;
  products: PlaneProductInterface[];
  baseCode = baseCodes;

  displayedColumns: string[] = [ 'orderId', 'assistantId', 'restockerId', 'orderStatus', 'createdAt', 'approvedAt', 'totalCost', 'consultProducts' ];


  constructor(private http: HttpClient, private ordersService: OrdersService, private appConfig: AppConfigService,
              private employeesService: EmployeesService,
              private productsService: ProductsService,
              private eventsManager: EventsManagerService,
              public dialog: MatDialog) {

  }

  ngOnInit(): void {
    if (this.appConfig.loginUser && this.appConfig.userName) {
      this.userName = this.appConfig.userName;
      this.loginUser = this.appConfig.loginUser;
      this.employeesService.findEmployeeByidentifier(this.loginUser)
        .subscribe((employeeData: EmployeeInterface) => {
          this.employeeData = employeeData;
          this.productsService.getPlaneById(this.employeeData.plane).subscribe((plane: PlaneInterface) => {
            this.plane = plane;
            if(plane.route)
              this.route = plane.route;
            this.products = plane.productsStock;
          });
          if (employeeData.role === "assistant") {
            this.getAssistantOrders();
          }
          else {
            this.getRestockerOrders();
          }
        });

      this.eventsManager.listenEvent(Events.orderApproved, this.getAssistantOrders.bind(this));
      this.eventsManager.listenEvent(Events.orderRequested, this.getAssistantOrders.bind(this));
    }
  }

  private getAssistantOrders(): void {
    this.ordersService.getAssistantOrders(this.employeeData._id)
      .subscribe((orders: OrderInterface[]) => {
        this.orders = orders;
        orders.forEach((order: OrderInterface) => {
          order.products.forEach((product: PlaneProductInterface) => {
            if(!order.totalCost) order.totalCost = 0;
            if(!product.amount) product.amount = 0;
            order.totalCost += product.amount * product.productInfo.price;
          })
        })
      });
  }
  private getRestockerOrders() {
    this.ordersService.getRestockerOrdersByBase(this.employeeData.base)
      .subscribe((orders: OrderInterface[]) => {
        this.orders = orders;
      })
  }

  formatDate(date: string): string {;
    return new Date(date).toLocaleString();
  }

  consultProducts(order: OrderInterface) {
    this.dialog.open(ProductsDialogComponent, {
      width: '100vw',
      data: order.products
    });
  }
}
