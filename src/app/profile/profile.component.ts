import { Component, OnInit } from '@angular/core';
import { AngularFireDatabase, AngularFireObject } from 'angularfire2/database';
import { Observable } from 'rxjs/Observable';
import { NgForm } from '@angular/forms';
import { AngularFireStorage } from 'angularfire2/storage';
import { ActivatedRoute, Router } from '@angular/router';

declare var jQuery: any;

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  userInfoRef: AngularFireObject<any>;
  userInfo: Observable<any>;

  userId: string;

  downloadURLBizCert: Observable<string | null>;
  downloadURLBizProfile: Observable<string | null>;
  downloadURLMyKad: Observable<string | null>;

  constructor(private afDb: AngularFireDatabase, private afStorage: AngularFireStorage,
    private activatedRoute: ActivatedRoute, private router: Router) {
      
      this.activatedRoute.params.subscribe(params => {
       this.userId = params['key'];
      });
      console.log(this.userId);

      this.userInfoRef = this.afDb.object(`user/${this.userId}`);
      this.userInfo = this.userInfoRef.valueChanges();

      const refBC = this.afStorage.ref(`${this.userId}/bizCert`);
      this.downloadURLBizCert = refBC.getDownloadURL();

      const refBP = this.afStorage.ref(`${this.userId}/bizProfile`);
      this.downloadURLBizProfile = refBP.getDownloadURL();

      const refMK = this.afStorage.ref(`${this.userId}/myKad`);
      this.downloadURLMyKad = refMK.getDownloadURL();
    
  }

  ngOnInit() {
    
  }

  onReject(form: NgForm) {
    jQuery('#myModal2').modal('hide');
    const rejectReason = form.value.rejectReason;
    this.userInfoRef.update({'sys_status': 'rejected', 'reject_reason': rejectReason});
    this.router.navigate(['/starter']);
  }

  onConfirm() {
    jQuery('#myModal').modal('hide');
    this.userInfoRef.update({'sys_status': 'active'});
    this.router.navigate(['/starter']);
  }

}
