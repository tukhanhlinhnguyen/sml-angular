import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Level1LightComponent } from './level1-light.component';

describe('Level1LightComponent', () => {
  let component: Level1LightComponent;
  let fixture: ComponentFixture<Level1LightComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ Level1LightComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Level1LightComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
