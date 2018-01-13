import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from './guards/auth.guard';
import { AnonymusGuard } from './guards/anonymus.guard';
import { TenantGuard } from './guards/tenant.guard';
import { LoginComponent } from './components/login/login.component';
import { AdminHomeComponent } from './components/admin/admin-home/admin-home.component';
import { HomeComponent } from './components/home/home.component';
import { EmployeeHomeComponent } from './components/employee/employee-home/employee-home.component';
import { TenantHomeComponent } from './components/tenant/tenant-home/tenant-home.component';
import { TenantProblemComponent } from './components/tenant/tenant-problem/tenant-problem.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { RegistrationComponent } from './components/registration/registration.component';

const routes: Routes = [

{ path: '', component: HomeComponent, canActivate: [AuthGuard]},
{ path: 'login', component: LoginComponent, canActivate: [AnonymusGuard]},
{ path: 'registration', component: RegistrationComponent, canActivate: [AnonymusGuard]},
{ path: '', canActivateChild: [AuthGuard], data: { expectedRole: 'ADMIN'},
  children: [
    { path: 'admin', component: AdminHomeComponent },
    { path: 'admin/lists', component: AdminHomeComponent },
    { path: 'admin/news', component: AdminHomeComponent }
  ]
},

{ path: '', canActivateChild: [AuthGuard], data: { expectedRole: 'EMPLOYEE'},
  children: [
    { path: 'employee/:id', component: EmployeeHomeComponent }
  ]
},

{ path: '', canActivateChild: [AuthGuard], data: { expectedRole: 'TENANT'},
  children: [
    { path: 'tenant/:id', canActivate: [TenantGuard], component: TenantHomeComponent },
    { path: 'tenant/:id/kvarovi', canActivate: [TenantGuard], component: TenantProblemComponent }
  ]
},
{path: '?', component: NotFoundComponent},
{path: '**', redirectTo: '/%3F'}


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
