import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AccountWishlistComponent } from './account-wishlist.component';

describe('AccountWishlistComponent', () => {
  let component: AccountWishlistComponent;
  let fixture: ComponentFixture<AccountWishlistComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AccountWishlistComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AccountWishlistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
