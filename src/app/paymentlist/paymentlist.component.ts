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
  check: string = "all";
  zakatList: Observable<any[]>;
  fidyahList: Observable<any[]>;
  infaqList: Observable<any[]>;
  total: number = 0;
  zakatamt: number = 0;
  fidyahamt: number = 0;
  infaqamt: number = 0;

  constructor(public db: AngularFireDatabase, private router: Router) {
    this.registerListRef = db.list('transaction', ref => ref.orderByChild('status').equalTo('Paid'));
    this.paymentList = this.registerListRef.snapshotChanges().pipe(
      map(changes =>
        changes.map(c => ({ key: c.payload.key, ...c.payload.val() }))
      )
    );

    this.paymentList.subscribe(
      competitors => {
        competitors.map(competitor =>
          this.calcTotal(competitor.amount, competitor.status)
        );
      });

    this.zakatListRef = db.list('transaction', ref => ref.orderByChild('transid').equalTo('ZAKAT'));
    this.zakatList = this.zakatListRef.snapshotChanges().pipe(
      map(changes =>
        changes.map(c => ({ key: c.payload.key, ...c.payload.val() }))
      )
    );

    this.zakatList.subscribe(
      competitors => {
        competitors.map(competitor =>
          this.calcZakat(competitor.amount, competitor.status)
        );
      });

    this.fidyahListRef = db.list('transaction', ref => ref.orderByChild('transid').equalTo('FIDYAH'));
    this.fidyahList = this.fidyahListRef.snapshotChanges().pipe(
      map(changes =>
        changes.map(c => ({ key: c.payload.key, ...c.payload.val() }))
      )
    );

    this.fidyahList.subscribe(
      competitors => {
        competitors.map(competitor =>
          this.calcFidyah(competitor.amount, competitor.status)
        );
      });

    this.infaqListRef = db.list('transaction', ref => ref.orderByChild('transid').equalTo('INFAQ'));
    this.infaqList = this.infaqListRef.snapshotChanges().pipe(
      map(changes =>
        changes.map(c => ({ key: c.payload.key, ...c.payload.val() }))
      )
    );

    this.infaqList.subscribe(
      competitors => {
        competitors.map(competitor =>
          this.calcInfaq(competitor.amount, competitor.status)
        );
      });

  }

  calcTotal(amt, status) {
    if (status === "Paid" || status === "paid") {
      this.total = +this.total + +amt;
    }
  }

  ngOnInit() {
  }

  calcZakat(amt, status) {
    if (status === "Paid" || status === "paid") {
      this.zakatamt = +this.zakatamt + +amt;
    }
  }

  calcFidyah(amt, status) {
    if (status === "Paid" || status === "paid") {
      this.fidyahamt = +this.fidyahamt + +amt;
    }
  }

  calcInfaq(amt, status) {
    if (status === "Paid" || status === "paid") {
      this.infaqamt = +this.infaqamt + +amt;
    }
  }

}
