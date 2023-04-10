import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FashionStoreV2Component } from './fashion-store-v2.component';

describe('FashionStoreV2Component', () => {
  let component: FashionStoreV2Component;
  let fixture: ComponentFixture<FashionStoreV2Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FashionStoreV2Component ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FashionStoreV2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
