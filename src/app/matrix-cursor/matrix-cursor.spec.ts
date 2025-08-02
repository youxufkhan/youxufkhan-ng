import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MatrixCursor } from './matrix-cursor';

describe('MatrixCursor', () => {
  let component: MatrixCursor;
  let fixture: ComponentFixture<MatrixCursor>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MatrixCursor]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MatrixCursor);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
