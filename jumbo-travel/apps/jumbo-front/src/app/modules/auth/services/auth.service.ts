import { Injectable } from "@angular/core";
import { AuthConfig, OAuthService } from "angular-oauth2-oidc";
import { BehaviorSubject, filter, Observable, ReplaySubject } from "rxjs";
import { EventsManagerService } from "@jumbo/core";
import { Events } from "../../../../../../../libs/core/src/lib/core/modules/events/events.enum";
import { Router } from "@angular/router";

@Injectable({
  providedIn: 'root'
})
export class AuthService  {

  private isLoggedInSubject: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(this.oauthService.hasValidAccessToken());
  isLoggedIn$: Observable<boolean> = this.isLoggedInSubject.asObservable()

  constructor(private oauthService: OAuthService,
              private eventsManager: EventsManagerService,
              private router: Router) {
    this.initAuth();
    this.guardAuth();
    this.isLoggedInSubject.next(this.isLoggedIn)
    this.listenLogOutEvent();
  }


  private isTokenExpired(): boolean {
    return new Date() > new Date(this.oauthService.getAccessTokenExpiration());
  }

  get isLoggedIn() {
    return !this.isTokenExpired();
  }

  initAuth() {

    const authCodeFlowConfig: AuthConfig = {
      // Url of the Identity Provider
      issuer: 'http://localhost:6500/auth/realms/master',

      tokenEndpoint: 'http://localhost:6500/realms/master/protocol/openid-connect/token',
      revocationEndpoint: 'http://localhost:6500/auth/realms/master/protocol/openid-connect/revoke',
      logoutUrl: window.location.origin,
      // URL of the SPA to redirect the user to after login
      redirectUri: window.location.origin + '/auth-callback',

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
   // this.oauthService.timeoutFactor = 0.1;


    this.oauthService.events.subscribe(eventt => {
      console.log(eventt);
    })

    this.oauthService.events.pipe(filter(event => event.type === 'token_received')).subscribe( event => {
      //this.isLoggedInSubject.next(this.oauthService.hasValidAccessToken())
      // if (this.oauthService.hasValidIdToken()) {
      //   // Bypass on refresh with valid token
      // } else {
      //   console.log('wowto')
      //   this.oauthService.tryLogin();
      // }
    });
  }

  public guardAuth(): void {

    // this.isLoggedIn$.subscribe((isLoggedIn: boolean) => {
    //
    //   if (!isLoggedIn) {
    //     this.oauthService.loadDiscoveryDocumentAndTryLogin({
    //     }).then(doc => {
    //       debugger;
    //       if(!this.isLoggedIn) {
    //         this.oauthService.initCodeFlow();
    //
    //       }
    //       // if(!this.oauthService.hasValidAccessToken()) {
    //       //   console.log('hasnotvalid');
    //       //  // this.oauthService.tryLogin({
    //       //  //   onTokenReceived: (info: ReceivedTokens): void => {
    //       //  //     const what = this.oauthService.hasValidAccessToken();
    //       //  //     this.isLoggedInSubject.next(what)
    //       //  //   }
    //       //  // });
    //       // }
    //
    //     });
    //    }
    // });

  }

  public listenLogOutEvent() {
    this.eventsManager.listenEvent(Events.logOut, this.logOut.bind(this));

  }

  private logOut() {
   // this.oauthService.logOut(true);
    //this.router.navigate([]);
    //this.isLoggedInSubject.next(false)
    //this.oauthService.initCodeFlow();
    this.oauthService.revokeTokenAndLogout().then(() =>{
      this.isLoggedInSubject.next(this.isLoggedIn);
    });
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

  public async ifMustBeCompletedAuthorization() {
    if (!this.isLoggedIn) {
      await this.completeAuthentication();
    }
  }
  public startAuthentication(): void {
    this.oauthService.loadDiscoveryDocumentAndLogin();
  }

  async completeAuthentication(): Promise<void> {
    const hasLoggedIn = await this.oauthService.loadDiscoveryDocumentAndTryLogin();
    if (hasLoggedIn) {
      this.isLoggedInSubject.next(this.isLoggedIn);
    }
  }
}
