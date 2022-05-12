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
import { MatMenuModule } from "@angular/material/menu";

@NgModule({
  declarations: [
    PageComponent,
    SidenavComponent,
    ToolbarComponent,
    MenuComponent,
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
    MatMenuModule
  ]
})
export class PageModule {}
