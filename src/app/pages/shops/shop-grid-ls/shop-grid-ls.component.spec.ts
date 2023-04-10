import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShopGridLsComponent } from './shop-grid-ls.component';

describe('ShopGridLsComponent', () => {
  let component: ShopGridLsComponent;
  let fixture: ComponentFixture<ShopGridLsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ShopGridLsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ShopGridLsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
