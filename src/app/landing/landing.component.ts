import { Component} from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
import { AngularFireAuth } from 'angularfire2/auth';

declare var jQuery: any;

@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.css']
})
export class LandingComponent {

  userCreated = false;
  errMessageRegister: string;
  errMessageLogin: string;
  isAdmin = false;

  constructor(private authService: AuthService, private router: Router, private afAuth: AngularFireAuth) { }

  onRegister(form: NgForm) {
    this.authService.register(form.value.email, form.value.password).then(res => {
      if (res) {
        jQuery('#myModal').modal('hide');
        this.userCreated = true;
      }
    })
    .catch(err => {
      this.errMessageRegister = err.message;
    });
  }

  onLogin(form: NgForm) {
    this.authService.login(form.value.email, form.value.password).then(res => {
      
      this.afAuth.authState.subscribe(auth => {
        if(auth.uid == 'b3IhaHPoXbS5SL0QKbE0BuWQFut1') {
          this.isAdmin = true;
        }
        if (res) {
      
        this.router.navigate(['/starter']);
        
      }
      
      });
    }).catch(err => {
      this.errMessageLogin = err.message;
    });
  }
}
