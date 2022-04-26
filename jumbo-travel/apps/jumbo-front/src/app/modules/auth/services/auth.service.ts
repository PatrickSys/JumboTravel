import { Injectable } from '@angular/core';
import { AuthConfig, OAuthService } from "angular-oauth2-oidc";
import {filter} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class AuthService {


  constructor(private oauthService: OAuthService) {
  }


  async initAuth() {

    const authCodeFlowConfig: AuthConfig = {
      // Url of the Identity Provider
      issuer: 'http://localhost:6500/auth/realms/master',

      tokenEndpoint: 'http://localhost:6500/realms/master/protocol/openid-connect/token',
      // URL of the SPA to redirect the user to after login
      redirectUri: window.location.origin ,

      // The SPA's id. The SPA is registerd with this id at the auth-server
      // clientId: 'server.code',
      clientId: 'JumboTravel',


      // Just needed if your auth server demands a secret. In general, this
      // is a sign that the auth server is not configured with SPAs in mind
      // and it might not enforce further best practices vital for security
      // such applications
      dummyClientSecret: 'XTTWDsOd5p2HwT6ALapFfNUfGIjVzPDd',

      responseType: 'code',

      // set the scope for the permissions the client should request
      // The first four are defined by OIDC.
      // Important: Request offline_access to get a refresh token
      // The api scope is a usecase specific one
      scope: 'openid profile email offline_access web-origins',

      showDebugInformation: true,
      requireHttps: this.isHttps()
    };

    this.oauthService.configure(authCodeFlowConfig);
    this.oauthService.setupAutomaticSilentRefresh();

    this.oauthService.events.pipe(filter(event => event.type === 'invalid_nonce_in_state')).subscribe( event => {
      console.error(event, ' kpasakisosio')
      if (this.oauthService.hasValidIdToken()) {
        console.log('watata')
        // Bypass on refresh with valid token
      } else {
        console.log('wowto')
        this.oauthService.tryLogin();
      }
    });

  }

  public async login() {

    await this.oauthService.loadDiscoveryDocumentAndTryLogin().then(doc => {
      console.log(doc)
      this.oauthService.initImplicitFlow();
    });

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
