import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RegisterControlSidebarComponent } from './register-control-sidebar.component';

describe('RegisterControlSidebarComponent', () => {
  let component: RegisterControlSidebarComponent;
  let fixture: ComponentFixture<RegisterControlSidebarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RegisterControlSidebarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RegisterControlSidebarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
