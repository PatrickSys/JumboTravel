import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HTTP_INTERCEPTORS } from "@angular/common/http";
import { JwtInterceptor } from "./interceptors/JwtInterceptor";
import { OAuthModule } from 'angular-oauth2-oidc';

@NgModule({
  declarations: [],
  imports: [CommonModule,
    OAuthModule.forRoot({
      resourceServer: {
        sendAccessToken: true,
        allowedUrls: ['http://localhost:3000'],
      },
    })],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true }],
})
export class AuthModule {}
