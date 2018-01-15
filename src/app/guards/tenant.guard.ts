import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class TenantGuard implements CanActivate {
  
  private token : any;
  private attempted_url_id : any;
  constructor(private router: Router) { }

  
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {

    this.attempted_url_id = (state.url.split("/"))[2];
    if (localStorage.getItem('token')) {
      this.token = JSON.parse(localStorage.getItem('token'));
      for(let tenant of this.token.tenants){
        if(tenant.tenant == this.attempted_url_id){
          return true;
        }
      }
      console.log("FALSE JE")
      this.router.navigate(['/?']);
      return false;
    }
    this.router.navigate(['/?']);
    return false;
  }
}
