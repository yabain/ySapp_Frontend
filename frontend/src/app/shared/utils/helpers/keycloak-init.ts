import { KeycloakService } from "keycloak-angular";
import { environment } from "src/environments/environment";

export function initializeKeycloak(keycloak: KeycloakService): () => Promise<any> {
    return (): Promise<any> => {
        return new Promise(async (resolve, reject) => {
          try {
            await keycloak.init({
                config: {
                    url: environment.keycloak.url,
                    realm: environment.keycloak.realm,
                    clientId: environment.keycloak.clientId,
                    
                },
              initOptions: {
                onLoad: 'check-sso',
                checkLoginIframe: false,
                redirectUri: window.location.origin + '/#/dashboard/main',
                flow: "standard"
                // silentCheckSsoRedirectUri: window.location.origin + '/#/authentication/sigin'
              },
                enableBearerInterceptor: true,
                // bearerPrefix: 'Bearer',
              bearerExcludedUrls:[]
            });
            resolve(true);
          } catch (error) {
            reject(error);
          }
        });
      };
}