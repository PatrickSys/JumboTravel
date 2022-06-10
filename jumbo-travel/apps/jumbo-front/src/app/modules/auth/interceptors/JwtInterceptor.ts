import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable } from 'rxjs';

import { AuthService } from '../services/auth.service';
import {
  AppConfigService
} from "../../../../../../../libs/core/src/lib/core/shared/services/config/app-config.service";

@Injectable()
export class JwtInterceptor implements HttpInterceptor {
  constructor(private authService: AuthService, private appConfig: AppConfigService) { }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    // add auth header with jwt if account is logged in and request is to the api url

    const isApiUrl = request.url.startsWith(this.appConfig.globals.apiUrl);
    if (isApiUrl) {
      request = request.clone({
        setHeaders: { Authorization: `Bearer ${this.authService.accessToken}` }
      });
    }

    return next.handle(request);
  }
}

