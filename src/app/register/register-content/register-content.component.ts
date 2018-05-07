import { Component, OnInit, OnDestroy } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import { Register } from './../../models/register';
import { AngularFireStorage } from 'angularfire2/storage';
import { Observable } from 'rxjs/Observable';
import { AngularFireDatabase, AngularFireObject } from 'angularfire2/database';

@Component({
  selector: 'app-register-content',
  templateUrl: './register-content.component.html',
  styleUrls: ['./register-content.component.css']
})
export class RegisterContentComponent implements OnInit, OnDestroy {

  userInfoRef: AngularFireObject<any>;
  userInfo: Observable<any>;

  fullName: string;
  role: string;

  bodyClasses = 'skin-blue sidebar-mini';
  body: HTMLBodyElement = document.getElementsByTagName('body')[0];

  constructor(private afDb: AngularFireDatabase, private afAuth: AngularFireAuth) {
    this.afAuth.authState.subscribe(auth => {
      
      this.userInfoRef = this.afDb.object(`user/${auth.uid}`);
      this.userInfo = this.userInfoRef.valueChanges();
      this.userInfo.subscribe(res => {
        this.setFullName(res.fullName);
        this.setRole(res.role);
      });
    });
  }

  setFullName(name) {
    this.fullName = name;
  }

  setRole(role) {
    if (role === 2) {
      this.role = 'Tow Service Provider';
    } else if (role === 3) {
      this.role = 'Approver Officer';
    }
  }

  ngOnInit() {
    // add the the body classes
    this.body.classList.add('skin-blue');
    this.body.classList.add('sidebar-mini');
  }

   ngOnDestroy() {
    // remove the the body classes
    this.body.classList.remove('skin-blue');
    this.body.classList.remove('sidebar-mini');
  }



}
