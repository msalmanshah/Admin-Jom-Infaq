import { AdminDashboard2Component } from './../admin/admin-dashboard2/admin-dashboard2.component';
import { AdminDashboard1Component } from './../admin/admin-dashboard1/admin-dashboard1.component';
import { StarterComponent } from './../starter/starter.component';
import { AdminComponent } from './../admin/admin.component';
import { RegisterComponent } from './../register/register.component';
import { LandingComponent } from '../landing/landing.component';
import { ProfileComponent } from './../profile/profile.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@NgModule({
  imports: [
    RouterModule.forRoot([
      { path: '', redirectTo: 'landing', pathMatch: 'full' },
      { path: 'starter', component: StarterComponent },
      { path: 'register', component: RegisterComponent },
      { path: 'landing', component: LandingComponent },
      { path: 'profile', component: ProfileComponent }
    ])
  ],
  declarations: [],
  exports: [ RouterModule ]
})
export class AppRoutingModule { }
