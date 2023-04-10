import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShopSingleV2Component } from './shop-single-v2.component';

describe('ShopSingleV2Component', () => {
  let component: ShopSingleV2Component;
  let fixture: ComponentFixture<ShopSingleV2Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ShopSingleV2Component ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ShopSingleV2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
