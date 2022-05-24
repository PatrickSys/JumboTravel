import { Component, OnInit } from '@angular/core';
import { AuthService } from "../../services/auth.service";
import { Router } from "@angular/router";
import {
  LocalStorageService
} from "../../../../../../../../libs/core/src/lib/core/shared/services/local-storage.service";

@Component({
  selector: 'jumbo-travel-auth-callback',
  templateUrl: './auth-callback.component.html',
  styleUrls: ['./auth-callback.component.scss'],
})
export class AuthCallbackComponent implements OnInit {
  constructor(
    private authService: AuthService,
    private router: Router,
    private localStgService: LocalStorageService
  ) {}

  ngOnInit() {
    this.authService.completeAuthentication().then(() => this.completeCallback());
  }

  private completeCallback(): void {
    const redirectUri: string = this.localStgService.load<string>('login_redirect');
    if (redirectUri) {
      this.localStgService.delete('login_redirect');
      this.router.navigateByUrl(redirectUri);
    } else {
      this.redirectToHome();
    }
  }

  private redirectToHome(): void {
    this.router.navigate(['']);
  }


}
