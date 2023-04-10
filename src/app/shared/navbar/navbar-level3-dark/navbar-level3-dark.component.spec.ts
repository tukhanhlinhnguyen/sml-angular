import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NavbarLevel3DarkComponent } from './navbar-level3-dark.component';

describe('NavbarLevel3DarkComponent', () => {
  let component: NavbarLevel3DarkComponent;
  let fixture: ComponentFixture<NavbarLevel3DarkComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NavbarLevel3DarkComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NavbarLevel3DarkComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
