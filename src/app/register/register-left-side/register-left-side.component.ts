import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-register-left-side',
  templateUrl: './register-left-side.component.html',
  styleUrls: ['./register-left-side.component.css']
})
export class RegisterLeftSideComponent implements OnInit {
  @Input() fullName: string;
  @Input() role: string;
  constructor() { }

  ngOnInit() {
  }

}
