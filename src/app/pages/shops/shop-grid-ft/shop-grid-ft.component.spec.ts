import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShopGridFtComponent } from './shop-grid-ft.component';

describe('ShopGridFtComponent', () => {
  let component: ShopGridFtComponent;
  let fixture: ComponentFixture<ShopGridFtComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ShopGridFtComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ShopGridFtComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
