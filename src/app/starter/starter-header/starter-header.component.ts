import { Component, OnInit, Input } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';
import { AngularFireAuth } from 'angularfire2/auth';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Router } from '@angular/router';

@Component({
  selector: 'app-starter-header',
  templateUrl: './starter-header.component.html',
  styleUrls: ['./starter-header.component.css']
})
export class StarterHeaderComponent {
  @Input() fullName: string;
  @Input() role: string;

  registerListRef: AngularFireList<any>;
  registerList: Observable<any[]>;

  constructor(db: AngularFireDatabase, private afAuth: AngularFireAuth, private router: Router) {
    this.registerListRef = db.list('user', ref => ref.orderByChild('sys_status').equalTo('applied'));
    this.registerList = this.registerListRef.snapshotChanges().pipe(
      map(changes => 
        changes.map(c => ({ key: c.payload.key, ...c.payload.val() }))
      )
    );
  }

  logout() {
    this.afAuth.auth.signOut();
    this.router.navigate(['/landing']);
  }
}
