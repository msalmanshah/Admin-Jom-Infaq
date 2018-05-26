import { Component, OnInit } from '@angular/core';
import { AngularFireDatabase, AngularFireList, AngularFireObject } from 'angularfire2/database';
import { AngularFireAuth } from 'angularfire2/auth';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Router } from '@angular/router';

@Component({
  selector: 'app-infaq',
  templateUrl: './infaq.component.html',
  styleUrls: ['./infaq.component.css']
})
export class InfaqComponent implements OnInit {

  registerListRef: AngularFireList<any>;
  infaqList: Observable<any[]>;
  registerList2: Observable<any[]>;
  // tslint:disable-next-line:no-trailing-whitespace

  userInfoRef: AngularFireObject<any>;
  // userInfo: Observable<any>;
  name: string;
  desc: string;
  current: number;
  goal: number;

  userId: string;

  constructor(public db: AngularFireDatabase, private router: Router) {
    this.registerListRef = db.list('infaq');
    this.infaqList = this.registerListRef.snapshotChanges().pipe(
      map(changes =>
        changes.map(c => ({ key: c.payload.key, ...c.payload.val() }))
      )
    );
  }

  ngOnInit() {
  }

  add() {
    this.registerListRef.push({
      'name': this.name,
      'desc': this.desc,
      'current': this.current,
      'goal': this.goal
    });
  }

  edit(key) {
    // console.log(key);
    // this.userId = key;
    // this.userInfoRef = this.db.object(`infaq/${this.userId}`);
    // this.userInfo = this.userInfoRef.valueChanges();
  }

  remove(key) {
    console.log(key);
    this.userId = key;
    this.db.object(`infaq/${this.userId}`).remove();

  }

}
