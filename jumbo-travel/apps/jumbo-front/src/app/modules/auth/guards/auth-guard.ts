import { CanActivate } from "@angular/router";
import { AuthService } from "../services/auth.service";

class AuthenticatedGuard implements CanActivate {

  userLoggedIn = AuthService.isLoggedIn;
  canActivate() {
    if (this.userLoggedIn) {
      return true;
    } else {
      return false;
    }
  }
}
