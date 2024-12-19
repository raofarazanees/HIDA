import { TestBed } from '@angular/core/testing';

import { SubmissionDialogService } from './submission-dialog.service';

describe('SubmissionDialogService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: SubmissionDialogService = TestBed.get(SubmissionDialogService);
    expect(service).toBeTruthy();
  });
});
