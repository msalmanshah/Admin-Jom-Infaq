import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-starter-left-side',
  templateUrl: './starter-left-side.component.html',
  styleUrls: ['./starter-left-side.component.css']
})
export class StarterLeftSideComponent implements OnInit {
  @Input() fullName: string;
  @Input() role: string;
  constructor() {
  }

  ngOnInit() {
  }

}
