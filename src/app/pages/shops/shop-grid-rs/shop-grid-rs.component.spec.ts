import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShopGridRsComponent } from './shop-grid-rs.component';

describe('ShopGridRsComponent', () => {
  let component: ShopGridRsComponent;
  let fixture: ComponentFixture<ShopGridRsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ShopGridRsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ShopGridRsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
