import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ApproveRefundDialogComponent } from './approve-refund-dialog.component';

describe('ApproveRefundDialogComponent', () => {
  let component: ApproveRefundDialogComponent;
  let fixture: ComponentFixture<ApproveRefundDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ApproveRefundDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ApproveRefundDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
