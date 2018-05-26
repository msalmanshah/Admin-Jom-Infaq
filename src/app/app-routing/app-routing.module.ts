import { AdminDashboard2Component } from './../admin/admin-dashboard2/admin-dashboard2.component';
import { AdminDashboard1Component } from './../admin/admin-dashboard1/admin-dashboard1.component';
import { StarterComponent } from './../starter/starter.component';
import { AdminComponent } from './../admin/admin.component';
import { RegisterComponent } from './../register/register.component';
import { LandingComponent } from '../landing/landing.component';
import { ProfileComponent } from './../profile/profile.component';
import { ApplicationListComponent } from './../application-list/application-list.component'
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { PaymentlistComponent } from '../paymentlist/paymentlist.component';
import { InfaqComponent } from '../infaq/infaq.component';

@NgModule({
  imports: [
    RouterModule.forRoot([
      { path: '', redirectTo: 'landing', pathMatch: 'full' },
      { path: 'starter', component: StarterComponent },
      { path: 'register', component: RegisterComponent },
      { path: 'landing', component: LandingComponent },
      { path: 'profile/:key', component: ProfileComponent },
      { path: 'applicationList', component: ApplicationListComponent },
      { path: 'paymentList', component: PaymentlistComponent },
      { path: 'infaq', component: InfaqComponent }
    ])
  ],
  declarations: [],
  exports: [ RouterModule ]
})
export class AppRoutingModule { }
