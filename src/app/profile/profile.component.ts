import { Component, OnInit } from '@angular/core';
import { AngularFireDatabase, AngularFireObject } from 'angularfire2/database';
import { AngularFireAuth } from 'angularfire2/auth';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  userInfoRef: AngularFireObject<any>;
  userInfo: Observable<any>;

  constructor(private afDb: AngularFireDatabase, private afAuth: AngularFireAuth) {
    this.afAuth.authState.subscribe(auth => {
      this.userInfoRef = this.afDb.object(`user/${auth.uid}`);
      this.userInfo = this.userInfoRef.valueChanges();
    });
  }

  ngOnInit() {
  }

}
