import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InfaqComponent } from './infaq.component';

describe('InfaqComponent', () => {
  let component: InfaqComponent;
  let fixture: ComponentFixture<InfaqComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InfaqComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InfaqComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
