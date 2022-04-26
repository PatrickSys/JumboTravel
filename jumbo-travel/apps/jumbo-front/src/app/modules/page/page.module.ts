import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PageComponent } from './containers/components/page/page.component';
import { SidenavComponent } from './containers/components/sidenav/sidenav.component';
import { RouterModule } from "@angular/router";

@NgModule({
  declarations: [PageComponent, SidenavComponent],
  imports: [CommonModule, RouterModule]
})
export class PageModule {}
