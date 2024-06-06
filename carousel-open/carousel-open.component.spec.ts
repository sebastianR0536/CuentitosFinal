import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CarouselOpenComponent } from './carousel-open.component';

describe('CarouselOpenComponent', () => {
  let component: CarouselOpenComponent;
  let fixture: ComponentFixture<CarouselOpenComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CarouselOpenComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CarouselOpenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
