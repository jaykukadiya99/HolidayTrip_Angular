import { Injectable } from '@angular/core';
import { Router , CanActivate} from "@angular/router";
import { JwtHelperService } from "@auth0/angular-jwt";
@Injectable({
  providedIn: 'root'
})
export class AuthGuardService {

  constructor(private jwtHelper: JwtHelperService, private router: Router) { }

  //check whether user is active or not
  canActivate() {
    var token = localStorage.getItem("AgentToken");
 
    if (token && !this.jwtHelper.isTokenExpired(token)){
      return true;
    }
    this.router.navigate(["login"]);
    return false;
  }
}
