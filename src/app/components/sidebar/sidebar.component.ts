import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth-service/auth.service';
import { ActivatedRoute } from '@angular/router';

declare const $: any;
declare interface RouteInfo {
    path: string;
    title: string;
    icon: string;
    class: string;
}

export const ROUTES_ADMIN: RouteInfo[] = [
    { path: '/admin', title: 'Početna',  icon: 'pe-7s-graph', class: '' },
    { path: '/admin/lists', title: 'Lista',  icon: 'pe-7s-note2', class: '' },
    { path: '/admin/news', title: 'Dodavanje',  icon: 'pe-7s-plus', class: '' }
];

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html'
})
export class SidebarComponent implements OnInit {
  menuItems: any[];
  menuRoles: any[];
  title = '';
  tenants_id;
  employee_id;
  ROUTES_TENANT: any[];
  ROUTES_SUPERVISOR: any[];
  ROLES: any[];
  ROUTES_EMPLOYEE: any[];

  constructor(private authService: AuthService, private activeRoute: ActivatedRoute) { }

  ngOnInit() {
    if(localStorage.getItem('sidebar')){
      const sidebarType = localStorage.getItem('sidebar');
      const token = JSON.parse(localStorage.getItem('token'));
      if(sidebarType === 'admin') {
        this.menuItems = ROUTES_ADMIN;
        this.title = "ADMIN PANEL";
      } else if(sidebarType === 'employee') {
        let employee_id;
        this.activeRoute.params.subscribe(params => {
          this.employee_id = (params['id']);
        });
        this.title = "ZAPOSLENI";
        this.ROUTES_EMPLOYEE = [
          { path: '/employee/'+this.employee_id, title: 'Početna',  icon: 'pe-7s-graph', class: '' },
          { path: '/employee/'+this.employee_id, title: 'Popravke',  icon: 'pe-7s-note2', class: '' },
        ]

      } else if(sidebarType === 'tenant') {
        this.title = "STANAR";
        let tenants_id;
        this.activeRoute.params.subscribe(params => {
                 this.tenants_id = (params['id']);
              });
        this.ROUTES_TENANT = [
          { path: '/tenant/' + this.tenants_id, title: 'Početna',  icon: 'pe-7s-home', class: '' },
          { path: '/tenant/' + this.tenants_id + "/kvarovi", title: 'Kvarovi',  icon: 'pe-7s-tools', class: '' },
        ];
         for(let tenant of token.tenants){
           if(tenant.tenant == this.tenants_id){
             if(tenant.owner == 'true') {
              this.ROUTES_TENANT = this.ROUTES_TENANT.concat(
                { path: '/tenant/' + this.tenants_id , title: 'Vlasnik stana dugme',  icon: 'pe-7s-key', class: '' },
               );
              if(tenant.supervisor){
                this.ROUTES_TENANT = this.ROUTES_TENANT.concat(
                 { path: '/tenant/' + this.tenants_id , title: 'Predsedničko dugme',  icon: 'pe-7s-piggy', class: '' },
                );
              }
             }
           }
         }

        this.menuItems = this.ROUTES_TENANT;
      }
    }
  }

  logout() {
    this.authService.logout_service();
  }

  isMobileMenu() {
      if ($(window).width() > 991) {
          return false;
      }
      return true;
  }
}