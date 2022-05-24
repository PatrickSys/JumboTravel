import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot } from "@angular/router";
import { AuthService } from "../services/auth.service";
import { LocalStorageService } from "@jumbo/core";

class AuthenticatedGuard implements CanActivate {

  constructor(private authService: AuthService,
                   private localStgService: LocalStorageService){

  }

  async canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Promise<boolean> {
    await this.authService.ifMustBeCompletedAuthorization();
    return this.authenticate(state);
  }

  private authenticate(state: RouterStateSnapshot): boolean {
    console.log('wasalokio');

    this.startAuth(state.url);
    return false;
  }

  private startAuth(url: string) {
    console.log('wasalokio');

    this.saveLoginRedirect(url);
    this.authService.startAuthentication();
  }
  private saveLoginRedirect(url: string): void {
    console.log('wasalokio');
    this.localStgService.save(
      'login_redirect',
      url.includes('/auth-callback') ? '' : url.split('?response_type=code&client_id=JumboTravel')[0]
    );
  }

}
