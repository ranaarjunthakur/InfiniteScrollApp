import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BrickComponent } from './brick.component';

describe('BrickComponent', () => {
  let component: BrickComponent;
  let fixture: ComponentFixture<BrickComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BrickComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(BrickComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
