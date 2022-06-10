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
import { JwtInterceptor } from "./modules/auth/interceptors/JwtInterceptor";

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    PageModule,
    OAuthModule.forRoot({
      resourceServer: {
        sendAccessToken: true,
        allowedUrls: ['http://localhost:3000'],
      },
    }),
    HttpClientModule,
    BrowserAnimationsModule,
    CoreModule,
    SharedModule,
    AppRoutingModule,
    DashboardModule
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
],
    bootstrap: [AppComponent],
})
export class AppModule {}
