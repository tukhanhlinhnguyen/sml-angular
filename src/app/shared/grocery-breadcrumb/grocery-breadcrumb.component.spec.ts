import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GroceryBreadcrumbComponent } from './grocery-breadcrumb.component';

describe('GroceryBreadcrumbComponent', () => {
  let component: GroceryBreadcrumbComponent;
  let fixture: ComponentFixture<GroceryBreadcrumbComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GroceryBreadcrumbComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GroceryBreadcrumbComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
