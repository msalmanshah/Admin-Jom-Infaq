import { Component, OnInit, Input } from '@angular/core';
import { AngularFireDatabase, AngularFireList, AngularFireObject } from 'angularfire2/database';
import { AngularFireAuth } from 'angularfire2/auth';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Router } from '@angular/router';

@Component({
  selector: 'app-application-list',
  templateUrl: './application-list.component.html',
  styleUrls: ['./application-list.component.css']
})
export class ApplicationListComponent implements OnInit {

  registerListRef: AngularFireList<any>;
  paymentList: Observable<any[]>;
  registerList2: Observable<any[]>;
  // tslint:disable-next-line:no-trailing-whitespace
  
  userInfoRef: AngularFireObject<any>;
  userInfo: Observable<any>;

  userId: string;

  constructor(public db: AngularFireDatabase, private router: Router) {
    this.registerListRef = db.list('transaction', ref => ref.orderByChild('status').equalTo('Processing'));
    this.paymentList = this.registerListRef.snapshotChanges().pipe(
      map(changes =>
        changes.map(c => ({ key: c.payload.key, ...c.payload.val() }))
      )
    );

    this.registerList2 = this.registerListRef.valueChanges();
    this.registerList2.subscribe(request => {
      console.log(request);
    });
  }

  ngOnInit() {
  }

  verify(key) {
      console.log(key);
      this.userId = key;
      this.userInfoRef = this.db.object(`transaction/${this.userId}`);
      this.userInfo = this.userInfoRef.valueChanges();

      this.userInfoRef.update({'status': 'Paid'});
  }

}
