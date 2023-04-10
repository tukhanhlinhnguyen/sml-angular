import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GroceryHeaderComponent } from './grocery-header.component';

describe('GroceryHeaderComponent', () => {
  let component: GroceryHeaderComponent;
  let fixture: ComponentFixture<GroceryHeaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GroceryHeaderComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GroceryHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
