import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Level3LightComponent } from './level3-light.component';

describe('Level3LightComponent', () => {
  let component: Level3LightComponent;
  let fixture: ComponentFixture<Level3LightComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ Level3LightComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Level3LightComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
