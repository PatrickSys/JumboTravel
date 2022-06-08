import { Injectable } from "@angular/core";
import { AuthConfig, OAuthService } from "angular-oauth2-oidc";
import { BehaviorSubject, Observable } from "rxjs";
import { EventsManagerService, WebsiteService } from "@jumbo/core";

@Injectable({
  providedIn: 'root'
})
export class AuthService  {

  private isLoggedInSubject: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(this.oauthService.hasValidAccessToken());
  isLoggedIn$: Observable<boolean> = this.isLoggedInSubject.asObservable()
  private globals = this.webService.globals;


  constructor(private oauthService: OAuthService,
              private eventsManager: EventsManagerService,
              private webService: WebsiteService) {
    this.isLoggedInSubject.next(this.isLoggedIn);
    this.initAuth();
    this.guardAuth();
    this.listenLogOutEvent();



    this.oauthService.events.subscribe(eve => {
      console.log(eve);
    });
  }

  private isTokenExpired(): boolean {
    return new Date() > new Date(this.oauthService.getAccessTokenExpiration());
  }

  get isLoggedIn() {
    return !this.isTokenExpired();
  }

  private initAuth(): void {
    const authCodeFlowConfig: AuthConfig = {
      issuer: this.globals.authority,
      tokenEndpoint: `${this.globals.openIdEndpoint}/token`,
      revocationEndpoint: `${this.globals.openIdEndpoint}/revoke`,
      logoutUrl: `${this.globals.openIdEndpoint}/logout`,
      redirectUri: window.location.origin,
      clientId: 'JumboTravel',
      silentRefreshRedirectUri: window.location.origin + '/silent-refresh.html',
      dummyClientSecret: 'UV1pQfRVx272052xtsgG742AtIdarsmn',
      useSilentRefresh: true,
      responseType: 'code',
      scope: 'openid profile email offline_access web-origins',
      showDebugInformation: true,
      requireHttps: this.isHttps(),
      clearHashAfterLogin: true,
      sessionChecksEnabled: true,
    };

    this.oauthService.configure(authCodeFlowConfig);
    this.oauthService.setupAutomaticSilentRefresh();
  }

  private guardAuth(): void {
    this.isLoggedIn$.subscribe(async (isLoggedIn: boolean) => {
      if (!isLoggedIn) {
        console.log(isLoggedIn);
        this.oauthService.loadDiscoveryDocumentAndTryLogin({}).then(() => {
          this.oauthService.initCodeFlow();
        });
      }
    });
  }

  listenLogOutEvent(): void {
    this.eventsManager.listenEvent(this.eventsManager.eventsType.logOut, this.logOut.bind(this));
  }
  private logOut() {
     this.oauthService.revokeTokenAndLogout();
  }
  private isHttps(): boolean {
    return window.location.protocol === 'https';
  }

  get userName(): string {
    const wasa =  (this.oauthService.getIdentityClaims() as { name: string }).name;
    return wasa;
  }
  get loginUser(): number {
    return +(this.oauthService.getIdentityClaims() as { preferred_username: string }).preferred_username;
  }

}
