import { Injectable } from '@angular/core';
import {
  Router,
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  UrlTree
} from '@angular/router';
import { AuthService } from '../service/auth/auth.service';
import { KeycloakAuthGuard, KeycloakService } from 'keycloak-angular';

// import { AuthService } from '../../core/service/auth.service';

@Injectable({
  providedIn: 'root'
})
// export class AuthGuard extends KeycloakAuthGuard {
//   async isAccessAllowed(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Promise<boolean | UrlTree> {
//     if(!this.authenticated)
//     {
//       await this.keycloakAngular.login({
//         redirectUri: window.location.origin + state.url
//       })
//     }

//     const requiredRoles = route.data.roles;
//     console.log("Require ",requiredRoles)
//     if(!(requiredRoles instanceof Array) || requiredRoles.length ===0) return true;

//     return requiredRoles.every((role)=>this.roles.includes(role))
//   }
  
// }
export class AuthGuard implements CanActivate {
  constructor(private authService: AuthService, private keycloakService:KeycloakService,private router: Router) {}

  async canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {

    if (await this.keycloakService.isLoggedIn()) {
      return true;
    }
    this.router.navigate(['/authentication/signin']);
    return false;
  }
}
