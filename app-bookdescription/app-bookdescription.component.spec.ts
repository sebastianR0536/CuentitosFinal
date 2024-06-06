import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AppBookdescriptionComponent } from './app-bookdescription.component';

describe('AppBookdescriptionComponent', () => {
  let component: AppBookdescriptionComponent;
  let fixture: ComponentFixture<AppBookdescriptionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AppBookdescriptionComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AppBookdescriptionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
