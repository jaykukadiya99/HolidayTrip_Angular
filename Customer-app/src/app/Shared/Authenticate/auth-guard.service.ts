import { Injectable } from '@angular/core';
import { Router , CanActivate } from "@angular/router";
import { JwtHelperService } from "@auth0/angular-jwt";

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanActivate {

  constructor(private jwtHelper: JwtHelperService, private router: Router) { }
  canActivate() {
    var token = localStorage.getItem("jwt");
    
    if (token && !this.jwtHelper.isTokenExpired(token)){
      console.log(token);
      var jwtdata = this.jwtHelper.decodeToken(token);
      var data = JSON.parse(jwtdata.sub);    
      console.log(jwtdata.typ);
      console.log(data.Id);
      console.log(this.jwtHelper.decodeToken(token));
      return true;
    }
    this.router.navigate(["customerLogin"]);
    return false;
  }
}
