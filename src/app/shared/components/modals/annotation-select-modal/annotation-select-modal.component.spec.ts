import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AnnotationSelectModalComponent } from './annotation-select-modal.component';

describe('AnnotationSelectModalComponent', () => {
  let component: AnnotationSelectModalComponent;
  let fixture: ComponentFixture<AnnotationSelectModalComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AnnotationSelectModalComponent]
    });
    fixture = TestBed.createComponent(AnnotationSelectModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
