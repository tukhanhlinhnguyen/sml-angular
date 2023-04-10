import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Level2LightComponent } from './level2-light.component';

describe('Level2LightComponent', () => {
  let component: Level2LightComponent;
  let fixture: ComponentFixture<Level2LightComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ Level2LightComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Level2LightComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
