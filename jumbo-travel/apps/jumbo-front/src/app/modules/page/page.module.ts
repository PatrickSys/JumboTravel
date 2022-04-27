import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PageComponent } from './containers/components/page/page.component';
import { SidenavComponent } from './containers/components/sidenav/sidenav.component';
import { RouterModule } from "@angular/router";
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { AuthService } from '../auth/services/auth.service';

@NgModule({
  declarations: [PageComponent, SidenavComponent],
  providers : [
    AuthService
  ],
  exports: [
    PageComponent
  ],
  imports: [CommonModule, RouterModule, MatToolbarModule, MatIconModule]
})
export class PageModule {}
