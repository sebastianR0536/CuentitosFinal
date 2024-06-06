import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AppSinginComponent } from './app-singin.component';

describe('AppSinginComponent', () => {
  let component: AppSinginComponent;
  let fixture: ComponentFixture<AppSinginComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AppSinginComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AppSinginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
