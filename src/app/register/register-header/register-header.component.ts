import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-register-header',
  templateUrl: './register-header.component.html',
  styleUrls: ['./register-header.component.css']
})
export class RegisterHeaderComponent implements OnInit {
  @Input() fullName: string;
  @Input() role: string;
  constructor() { }

  ngOnInit() {
  }

}
