import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GroceryFooterComponent } from './grocery-footer.component';

describe('GroceryFooterComponent', () => {
  let component: GroceryFooterComponent;
  let fixture: ComponentFixture<GroceryFooterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GroceryFooterComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GroceryFooterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
