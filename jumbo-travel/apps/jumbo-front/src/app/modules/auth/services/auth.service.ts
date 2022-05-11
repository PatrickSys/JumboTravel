import { Injectable, OnInit } from "@angular/core";
import { AuthConfig, OAuthService } from "angular-oauth2-oidc";
import { BehaviorSubject, filter, Observable, Subject } from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class AuthService  {

  private isLoggedInSubject: Subject<boolean> = new Subject<boolean>();
  isLoggedIn$: Observable<boolean> = this.isLoggedInSubject.asObservable()
  isLoggedIn: boolean = false;

  constructor(private oauthService: OAuthService) {
    this.initAuth();
    this.guardAuth();
  }



  initAuth() {
    if(this.oauthService.hasValidAccessToken()) {
      return;
    }
    console.log('called once');

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
      requireHttps: false,
      clearHashAfterLogin: true
    };

    this.oauthService.configure(authCodeFlowConfig);
    this.oauthService.setupAutomaticSilentRefresh();
    this.oauthService.timeoutFactor = 0.1;



    this.oauthService.events.pipe(filter(event => event.type === 'token_received')).subscribe( event => {
      this.isLoggedInSubject.next(this.oauthService.hasValidAccessToken());
      console.log(this.oauthService.hasValidAccessToken(), ' ea');
    });



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
      console.log(isLoggedIn, 'here dude');
      if (!isLoggedIn) {
        console.log('entersherebud');
        this.oauthService.loadDiscoveryDocumentAndTryLogin({
        }).then(doc => {
          console.log('heyou');
          this.oauthService.initCodeFlow();
        });
       }
    });

    this.isLoggedInSubject.next(this.oauthService.hasValidAccessToken())
  }

  public logoff() {
    this.oauthService.logOut();
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
