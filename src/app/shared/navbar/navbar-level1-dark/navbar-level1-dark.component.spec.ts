import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NavbarLevel1DarkComponent } from './navbar-level1-dark.component';

describe('NavbarLevel1DarkComponent', () => {
  let component: NavbarLevel1DarkComponent;
  let fixture: ComponentFixture<NavbarLevel1DarkComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NavbarLevel1DarkComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NavbarLevel1DarkComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
