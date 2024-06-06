import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AppUserprofileComponent } from './app-userprofile.component';

describe('AppUserprofileComponent', () => {
  let component: AppUserprofileComponent;
  let fixture: ComponentFixture<AppUserprofileComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AppUserprofileComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AppUserprofileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
