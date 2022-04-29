import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PageComponent } from './containers/components/page/page.component';
import { SidenavComponent } from './containers/components/sidenav/sidenav.component';
import { RouterModule } from '@angular/router';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { AuthService } from '../auth/services/auth.service';
import { MatButtonModule } from '@angular/material/button';
import { MatSidenavModule } from '@angular/material/sidenav';
import { JumboToolbarComponent } from './containers/components/toolbar/jumbo-toolbar.component';

@NgModule({
  declarations: [PageComponent, SidenavComponent, JumboToolbarComponent],
  providers: [AuthService],
  exports: [PageComponent],
  imports: [
    CommonModule,
    RouterModule,
    MatIconModule,
    MatToolbarModule,
    MatButtonModule,
    MatSidenavModule
  ],
})
export class PageModule {}
