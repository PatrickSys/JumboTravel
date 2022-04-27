import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { RouterModule } from '@angular/router';
import { PageModule } from "./modules/page/page.module";

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    RouterModule.forRoot([], { initialNavigation: "enabledBlocking" }),
    PageModule
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
