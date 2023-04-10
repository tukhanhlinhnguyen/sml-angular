import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShopListLsComponent } from './shop-list-ls.component';

describe('ShopListLsComponent', () => {
  let component: ShopListLsComponent;
  let fixture: ComponentFixture<ShopListLsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ShopListLsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ShopListLsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
