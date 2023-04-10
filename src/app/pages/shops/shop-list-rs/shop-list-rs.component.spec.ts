import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShopListRsComponent } from './shop-list-rs.component';

describe('ShopListRsComponent', () => {
  let component: ShopListRsComponent;
  let fixture: ComponentFixture<ShopListRsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ShopListRsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ShopListRsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
