import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Level2DarkComponent } from './level2-dark.component';

describe('Level2DarkComponent', () => {
  let component: Level2DarkComponent;
  let fixture: ComponentFixture<Level2DarkComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ Level2DarkComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Level2DarkComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
