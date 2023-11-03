import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewBillComponent } from './view-bill.component';

describe('ViewBillComponent', () => {
  let component: ViewBillComponent;
  let fixture: ComponentFixture<ViewBillComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ViewBillComponent]
    });
    fixture = TestBed.createComponent(ViewBillComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
