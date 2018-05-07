import { Component} from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';

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

  constructor(private authService: AuthService, private router: Router) { }

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
      if (res) {
        if (this.userCreated) {
          this.router.navigate(['/register']);
        } else {
          this.router.navigate(['/starter']);
        }
      }
    }).catch(err => {
      this.errMessageLogin = err.message;
    });
  }
}
