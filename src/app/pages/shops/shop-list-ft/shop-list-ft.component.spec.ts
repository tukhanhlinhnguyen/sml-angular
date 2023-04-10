import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShopListFtComponent } from './shop-list-ft.component';

describe('ShopListFtComponent', () => {
  let component: ShopListFtComponent;
  let fixture: ComponentFixture<ShopListFtComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ShopListFtComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ShopListFtComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
