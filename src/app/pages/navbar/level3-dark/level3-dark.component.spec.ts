import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Level3DarkComponent } from './level3-dark.component';

describe('Level3DarkComponent', () => {
  let component: Level3DarkComponent;
  let fixture: ComponentFixture<Level3DarkComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ Level3DarkComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Level3DarkComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
