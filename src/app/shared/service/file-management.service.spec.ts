import { TestBed } from '@angular/core/testing';

import { FileManagementService } from './file-management.service';

describe('EmployeeService', () => {
  let service: FileManagementService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FileManagementService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
