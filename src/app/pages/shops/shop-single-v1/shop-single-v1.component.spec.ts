import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShopSingleV1Component } from './shop-single-v1.component';

describe('ShopSingleV1Component', () => {
  let component: ShopSingleV1Component;
  let fixture: ComponentFixture<ShopSingleV1Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ShopSingleV1Component ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ShopSingleV1Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
