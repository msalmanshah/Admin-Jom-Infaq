import { Component, OnInit } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-paymentlist',
  templateUrl: './paymentlist.component.html',
  styleUrls: ['./paymentlist.component.css']
})
export class PaymentlistComponent implements OnInit {

  registerListRef: AngularFireList<any>;
  zakatListRef: AngularFireList<any>;
  fidyahListRef: AngularFireList<any>;
  infaqListRef: AngularFireList<any>;
  paymentList: Observable<any[]>;
  registerList2: Observable<any[]>;
  check:string = "all";
  zakatList: Observable<any[]>;
  fidyahList: Observable<any[]>;
  infaqList: Observable<any[]>;
  total:number = 0;

  constructor(public db: AngularFireDatabase, private router: Router) {
    this.registerListRef = db.list('transaction', ref => ref.orderByChild('status').equalTo('Paid'));
    this.paymentList = this.registerListRef.snapshotChanges().pipe(
      map(changes =>
        changes.map(c => ({ key: c.payload.key, ...c.payload.val() }))
      )
    );

    this.zakatListRef = db.list('transaction', ref => ref.orderByChild('transid').equalTo('ZAKAT'));
    this.zakatList = this.zakatListRef.snapshotChanges().pipe(
      map(changes =>
        changes.map(c => ({ key: c.payload.key, ...c.payload.val() }))
      )
    );

    this.fidyahListRef = db.list('transaction', ref => ref.orderByChild('transid').equalTo('FIDYAH'));
    this.fidyahList = this.fidyahListRef.snapshotChanges().pipe(
      map(changes =>
        changes.map(c => ({ key: c.payload.key, ...c.payload.val() }))
      )
    );

    this.infaqListRef = db.list('transaction', ref => ref.orderByChild('transid').equalTo('INFAQ'));
    this.infaqList = this.infaqListRef.snapshotChanges().pipe(
      map(changes =>
        changes.map(c => ({ key: c.payload.key, ...c.payload.val() }))
      )
    );

  }

  calcTotal(val){
    this.total = +this.total + +val;
  }

  ngOnInit() {
  }

}
