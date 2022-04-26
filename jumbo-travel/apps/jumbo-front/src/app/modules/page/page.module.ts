import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PageComponent } from './containers/components/page/page.component';
import { SidenavComponent } from './containers/components/sidenav/sidenav.component';

@NgModule({
  declarations: [PageComponent, SidenavComponent],
  imports: [CommonModule],
})
export class PageModule {}
