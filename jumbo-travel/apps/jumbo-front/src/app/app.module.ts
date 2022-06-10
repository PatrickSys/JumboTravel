import { APP_INITIALIZER, NgModule } from "@angular/core";
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { RouterModule } from '@angular/router';
import { PageModule } from "./modules/page/page.module";
import { OAuthModule } from "angular-oauth2-oidc";
import { HTTP_INTERCEPTORS, HttpClientModule } from "@angular/common/http";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { CoreModule, SharedModule } from "@jumbo/core";
import { AppRoutingModule } from './modules/routing/app-routing.module';
import { DashboardModule } from './modules/dashboard/dashboard.module';
import { AuthModule } from "./modules/auth/auth.module";

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    PageModule,
    HttpClientModule,
    BrowserAnimationsModule,
    CoreModule,
    SharedModule,
    AppRoutingModule,
    DashboardModule,
    AuthModule
  ],
  providers: [

],
    bootstrap: [AppComponent],
})
export class AppModule {}
