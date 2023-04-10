import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NavbarLevel2DarkComponent } from './navbar-level2-dark.component';

describe('NavbarLevel2DarkComponent', () => {
  let component: NavbarLevel2DarkComponent;
  let fixture: ComponentFixture<NavbarLevel2DarkComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NavbarLevel2DarkComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NavbarLevel2DarkComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
