import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NavbarLevel2LightComponent } from './navbar-level2-light.component';

describe('NavbarLevel2LightComponent', () => {
  let component: NavbarLevel2LightComponent;
  let fixture: ComponentFixture<NavbarLevel2LightComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NavbarLevel2LightComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NavbarLevel2LightComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
