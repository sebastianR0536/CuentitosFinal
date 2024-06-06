import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AppAdminprofileComponent } from './app-adminprofile.component';

describe('AppAdminprofileComponent', () => {
  let component: AppAdminprofileComponent;
  let fixture: ComponentFixture<AppAdminprofileComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AppAdminprofileComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AppAdminprofileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
