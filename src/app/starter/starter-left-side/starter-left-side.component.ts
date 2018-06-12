import { Component, OnInit, Input } from '@angular/core';

import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-starter-left-side',
  templateUrl: './starter-left-side.component.html',
  styleUrls: ['./starter-left-side.component.css']
})
export class StarterLeftSideComponent implements OnInit {
  @Input() fullName: string;
  @Input() role: string;
  registerListRef: AngularFireList<any>;
  paymentList: Observable<any[]>;
  flag: number = 0;

  constructor(private db: AngularFireDatabase) {
    this.registerListRef = db.list('transaction', ref => ref.orderByChild('flag').equalTo(0));
    this.paymentList = this.registerListRef.snapshotChanges().pipe(
      map(changes =>
        changes.map(c => ({ key: c.payload.key, ...c.payload.val() }))
      )
    );

    this.paymentList.subscribe(
      competitors => {
        competitors.map(competitor =>
          this.getNotify()
        );
      });

  }

  getNotify(){
    this.flag = +this.flag + 1;
  }

  ngOnInit() {
  }

}
