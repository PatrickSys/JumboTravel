import { Component, OnInit } from "@angular/core";
import { EmployeeInterface, Events, EventsManagerService, PlaneInterface, PlaneProductInterface } from "@jumbo/core";
import { baseCodes } from "../../../../../../../../libs/core/src/lib/core/shared/types/baseTypes";
import { ProductsService } from "../../services/products.service";
import {
  AppConfigService
} from "../../../../../../../../libs/core/src/lib/core/shared/services/config/app-config.service";
import { EmployeesService } from "../../services/employees.service";
import { OrdersService } from "../../services/orders.service";
import { ToastrService } from "ngx-toastr";
import { OrderInterface } from "../../../../../../../../libs/core/src/lib/core/shared/interfaces/order.interface";
import { orderStatus } from "libs/core/src/lib/core/shared/types/orderStatusTypes";
import { ProductsDialogComponent } from "../../../page/containers/components/products-dialog/products-dialog.component";
import { MatDialog } from "@angular/material/dialog";
import { PlanesService } from "../../services/planes.service";

@Component({
  selector: "jumbo-travel-restocker",
  templateUrl: "./restocker.component.html",
  styleUrls: ["./restocker.component.scss"]
})
export class RestockerComponent implements OnInit {
  displayedColumns: string[] = [    'orderId', 'assistantId', 'planeId', 'status', 'requestedAt', 'consultProducts','acceptOrder'];
  orders: OrderInterface[];
  userName: string | undefined;
  loginUser: number | undefined;
  employeeData: EmployeeInterface;
  baseCode = baseCodes;

  constructor(private productsService: ProductsService,
              private appConfig: AppConfigService,
              private employeesService: EmployeesService,
              private ordersService: OrdersService,
              private toastService: ToastrService,
              public dialog: MatDialog,
              private eventsManager: EventsManagerService) {
    this.userName = this.appConfig.userName;
    this.loginUser = this.appConfig.loginUser;
  }

  ngOnInit(): void {
    if (this.loginUser) {
      this.employeesService.findEmployeeByidentifier(this.loginUser).subscribe((employee: EmployeeInterface) => {
        this.employeeData = employee;
        this.getRestockerOrders();
      });
    }
    this.eventsManager.listenEvent(Events.orderRequested, this.getRestockerOrders.bind(this));

  }

  private getRestockerOrders() {
    this.ordersService.getRestockerOrdersByBase(this.employeeData.base).subscribe((orders: OrderInterface[]) => {
      this.orders = orders.filter(order => order.status === orderStatus.requested).filter(order => order.destination === this.employeeData.base)
    });
  }

  acceptOrder(orderId: string) {
    this.ordersService.approveOrder(orderId, this.employeeData._id)
      .subscribe((updatedOrder: OrderInterface) =>{
      this.toastService.success('Succesfully Approved Order', 'Order Approved')
        setTimeout(this.getRestockerOrders.bind(this), 150);

      });
  }

  formatDate(date: string): string {
    return new Date(date).toLocaleString();
  }
  consultProducts(order: OrderInterface) {
    this.dialog.open(ProductsDialogComponent, {
      width: '100vw',
      data: order.products
    });
  }
}
