import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfrimModalComponent } from './confrim-modal.component';

describe('ConfrimModalComponent', () => {
  let component: ConfrimModalComponent;
  let fixture: ComponentFixture<ConfrimModalComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ConfrimModalComponent]
    });
    fixture = TestBed.createComponent(ConfrimModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
