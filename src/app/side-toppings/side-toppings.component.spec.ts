import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SideToppingsComponent } from './side-toppings.component';

describe('SideToppingsComponent', () => {
  let component: SideToppingsComponent;
  let fixture: ComponentFixture<SideToppingsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SideToppingsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SideToppingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
