import { AngularFireAuth } from 'angularfire2/auth';
import { Component, OnInit } from '@angular/core';
import { Register } from './../models/register';
import { AngularFireStorage } from 'angularfire2/storage';
import { Observable } from 'rxjs/Observable';
import { AngularFireDatabase, AngularFireObject } from 'angularfire2/database';

declare var jQuery: any;

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  states = [ 'Kuala Lumpur',
              'Selangor',
              'Negeri Sembilan',
              'Melaka',
              'Johor',
              'Pahang',
              'Terengganu',
              'Kelantan',
              'Perak',
              'Pulau Pinang',
              'Kedah',
              'Perlis',
              'Sabah',
              'Sarawak',
              'Labuan' ];

  register = {} as Register;

  userId: string;
  isBizCert = false;
  isBizProfile = false;
  isMyKad = false;

  uploadPercentBizCert: Observable<number>;
  downloadURLBizCert: Observable<string>;

  uploadPercentBizProfile: Observable<number>;
  downloadURLBizProfile: Observable<string>;

  uploadPercentMyKad: Observable<number>;
  downloadURLMyKad: Observable<string>;

  registrationRef: AngularFireObject<any>;
  registration: Observable<any>;

  constructor(private afStorage: AngularFireStorage, private afAuth: AngularFireAuth, private afDb: AngularFireDatabase) {
    this.afAuth.authState.subscribe(auth => {
      this.assignUserId(auth.uid);
      this.registrationRef = this.afDb.object(`user/${this.userId}`);
      this.registration = this.registrationRef.valueChanges();
    });
  }

  ngOnInit() {
  }

  assignUserId(id) {
    this.userId = id;
  }

  sameAddress(e) {
    if (e.target.checked) {
      this.register.mailAddress = this.register.homeAddress;
      this.register.mailPostcode = this.register.homePostcode;
      this.register.mailState = this.register.homeState;
    } else {
      this.register.mailAddress = '';
      this.register.mailPostcode = '';
      this.register.mailState = '';
    }
  }

  uploadBizCert(event) {
    const filePath = this.userId + '/bizCert';
    const file = event.target.files[0];
    const task = this.afStorage.upload(filePath, file);
    this.isBizCert = true;
    // observe percentage changes
    this.uploadPercentBizCert = task.percentageChanges();
    // get notified when the download URL is available
    this.downloadURLBizCert = task.downloadURL();

    if (this.isBizCert && this.isBizProfile && this.isMyKad) {
      jQuery('#myModal').modal('hide');
    }
  }

  uploadBizProfile(event) {
    const filePath = this.userId + '/bizProfile';
    const file = event.target.files[0];
    const task = this.afStorage.upload(filePath, file);
    this.isBizProfile = true;
    // observe percentage changes
    this.uploadPercentBizProfile = task.percentageChanges();
    // get notified when the download URL is available
    this.downloadURLBizProfile = task.downloadURL();

    if (this.isBizCert && this.isBizProfile && this.isMyKad) {
      jQuery('#myModal').modal('hide');
    }
  }

  uploadMykad(event) {
    const filePath = this.userId + '/myKad';
    const file = event.target.files[0];
    const task = this.afStorage.upload(filePath, file);
    this.isMyKad = true;
    // observe percentage changes
    this.uploadPercentMyKad = task.percentageChanges();
    // get notified when the download URL is available
    this.downloadURLMyKad = task.downloadURL();
  }

  submit() {
    if (this.isBizCert && this.isBizProfile && this.isMyKad) {
      jQuery('#myModal').modal('hide');
      this.register.role = 2;
      this.registrationRef.set(this.register);
    }
  }

}
