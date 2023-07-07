import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreditNoteIndicatorComponent } from './credit-note-indicator.component';

describe('CreditNoteIndicatorComponent', () => {
  let component: CreditNoteIndicatorComponent;
  let fixture: ComponentFixture<CreditNoteIndicatorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreditNoteIndicatorComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreditNoteIndicatorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
