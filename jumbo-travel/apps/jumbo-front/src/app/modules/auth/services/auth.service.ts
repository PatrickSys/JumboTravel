import { Injectable } from "@angular/core";
import { AuthConfig, OAuthService } from "angular-oauth2-oidc";
import { BehaviorSubject, Observable } from "rxjs";
import { EventsManagerService } from "@jumbo/core";
import { WebsiteService } from "@jumbo/core";

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
    })
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
      dummyClientSecret: '6W9azJk4ngK3NAlE2PVFhZfDiZZYtmJL',
      useSilentRefresh: true,
      responseType: 'code',
      scope: 'openid profile email offline_access web-origins',
      showDebugInformation: true,
      requireHttps: this.isHttps(),
      clearHashAfterLogin: true
    };

    this.oauthService.configure(authCodeFlowConfig);
    this.oauthService.setupAutomaticSilentRefresh();
  }

  private guardAuth(): void {
    this.isLoggedIn$.subscribe(async (isLoggedIn: boolean) => {
      if (!isLoggedIn) {
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
}
