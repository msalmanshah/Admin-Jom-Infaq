import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RegisterLeftSideComponent } from './register-left-side.component';

describe('RegisterLeftSideComponent', () => {
  let component: RegisterLeftSideComponent;
  let fixture: ComponentFixture<RegisterLeftSideComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RegisterLeftSideComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RegisterLeftSideComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
