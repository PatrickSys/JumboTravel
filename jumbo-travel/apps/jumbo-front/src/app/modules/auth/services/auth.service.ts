import { Injectable } from "@angular/core";
import { AuthConfig, OAuthService } from "angular-oauth2-oidc";
import { BehaviorSubject, Observable } from "rxjs";
import { EventsManagerService } from "@jumbo/core";
import { Events } from "../../../../../../../libs/core/src/lib/core/events/events.enum";

@Injectable({
  providedIn: 'root'
})
export class AuthService  {

  private isLoggedInSubject: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  isLoggedIn$: Observable<boolean> = this.isLoggedInSubject.asObservable()
  isLoggedIn: boolean = false;

  constructor(private oauthService: OAuthService,
              private eventsManager: EventsManagerService) {
    this.listenLogOutEvent();
  }



  initAuth() {

    const authCodeFlowConfig: AuthConfig = {
      // Url of the Identity Provider
      issuer: 'http://localhost:6500/auth/realms/master',

      tokenEndpoint: 'http://localhost:6500/realms/master/protocol/openid-connect/token',
      // URL of the SPA to redirect the user to after login
      redirectUri: window.location.origin ,

      // The SPA's id. The SPA is registerd with this id at the auth-server
      // clientId: 'server.code',
      clientId: 'JumboTravel',
      silentRefreshRedirectUri: window.location.origin + '/silent-refresh.html',

      // Just needed if your auth server demands a secret. In general, this
      // is a sign that the auth server is not configured with SPAs in mind
      // and it might  not enforce further best practices vital for security
      // such applications
      dummyClientSecret: '0rtyI1TtYrQTKZQi99KyJm3C3jgQh7CD',
      useSilentRefresh: true,
      responseType: 'code',

      // set the scope for the permissions the client should request
      // The first four are defined by OIDC.
      // Important: Request offline_access to get a refresh token
      // The api scope is a usecase specific one
      scope: 'openid profile email offline_access web-origins',

      showDebugInformation: true,
      requireHttps: this.isHttps(),
      clearHashAfterLogin: true
    };

    this.oauthService.configure(authCodeFlowConfig);
    this.oauthService.setupAutomaticSilentRefresh();
    this.oauthService.timeoutFactor = 0.1;
    this.isLoggedIn = this.oauthService.hasValidAccessToken();

    //
    // this.oauthService.events.pipe(filter(event => event.type === 'invalid_nonce_in_state')).subscribe( event => {
    //   console.error(event, ' kpasakisosio')
    //   if (this.oauthService.hasValidIdToken()) {
    //     console.log('watata')
    //     // Bypass on refresh with valid token
    //   } else {
    //     console.log('wowto')
    //     this.oauthService.tryLogin();
    //   }
    // });

  }

  public guardAuth(): void {


    this.isLoggedIn$.subscribe((isLoggedIn: boolean) => {
      this.isLoggedIn = isLoggedIn;

      if (!isLoggedIn) {
        this.oauthService.loadDiscoveryDocumentAndTryLogin({
        }).then(doc => {
          if(!this.oauthService.hasValidAccessToken()) {
            this.oauthService.initCodeFlow();
           // this.oauthService.tryLogin({
           //   onTokenReceived: (info: ReceivedTokens): void => {
           //     const what = this.oauthService.hasValidAccessToken();
           //     this.isLoggedInSubject.next(what)
           //   }
           // });
          }});
       }
    });

  }

  public listenLogOutEvent() {
    this.eventsManager.listenEvent(Events.logOut, this.logOut());

  }

  private logOut() {
    console.log('heyou');
    this.oauthService.revokeTokenAndLogout().then(() => this.isLoggedInSubject.next(false));
  }
  public get name() {
    const claims = this.oauthService.getIdentityClaims();
    if (!claims) {
      return null;
    }
    return claims;
  }

  private isHttps(): boolean {
    return window.location.protocol === 'https';
  }
}
