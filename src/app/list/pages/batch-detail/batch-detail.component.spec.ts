import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BatchDetailComponent } from './batch-detail.component';

describe('EmployeeDetailComponent', () => {
  let component: BatchDetailComponent;
  let fixture: ComponentFixture<BatchDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BatchDetailComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BatchDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
