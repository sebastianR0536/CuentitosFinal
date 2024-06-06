import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AppSingupComponent } from './app-singup.component';

describe('AppSingupComponent', () => {
  let component: AppSingupComponent;
  let fixture: ComponentFixture<AppSingupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AppSingupComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AppSingupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
