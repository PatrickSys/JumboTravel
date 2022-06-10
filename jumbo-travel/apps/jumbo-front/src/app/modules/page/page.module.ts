import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PageComponent } from './containers/page/page.component';
import { SidenavComponent } from './containers/sidenav/sidenav.component';
import { RouterModule } from '@angular/router';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { AuthService } from '../auth/services/auth.service';
import { MatButtonModule } from '@angular/material/button';
import { MatSidenavModule } from '@angular/material/sidenav';
import { ToolbarComponent } from './containers/components/toolbar/toolbar.component';
import { FormsModule } from '@angular/forms';
import { MenuComponent } from './containers/components/menu/menu.component';
import { MatMenuModule } from '@angular/material/menu';
import { OrdersComponent } from './containers/components/orders/orders.component';
import { MatTableModule } from '@angular/material/table';
import { ProductsDialogComponent } from './containers/components/products-dialog/products-dialog.component';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { HomeComponent } from './containers/components/home/home.component';

@NgModule({
  declarations: [
    PageComponent,
    SidenavComponent,
    ToolbarComponent,
    MenuComponent,
    OrdersComponent,
    ProductsDialogComponent,
    HomeComponent,
  ],
  providers: [],
  exports: [PageComponent, SidenavComponent],
  imports: [
    CommonModule,
    RouterModule,
    MatIconModule,
    MatToolbarModule,
    MatButtonModule,
    MatSidenavModule,
    FormsModule,
    MatMenuModule,
    MatTableModule,
    MatDialogModule,
  ],
})
export class PageModule {}
