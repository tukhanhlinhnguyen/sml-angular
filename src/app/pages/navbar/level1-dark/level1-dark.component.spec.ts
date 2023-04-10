import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Level1DarkComponent } from './level1-dark.component';

describe('Level1DarkComponent', () => {
  let component: Level1DarkComponent;
  let fixture: ComponentFixture<Level1DarkComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ Level1DarkComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Level1DarkComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
