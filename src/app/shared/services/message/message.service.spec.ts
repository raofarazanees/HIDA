import { inject, TestBed } from '@angular/core/testing';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';

import { MessageService } from './message.service';

describe('MessageService', () => {
  beforeEach(() =>
    TestBed.configureTestingModule({
      imports: [MatSnackBarModule]
    })
  );

  it('should be created', () => {
    const service: MessageService = TestBed.get(MessageService);
    expect(service).toBeTruthy();
  });

  it(`'showToast' should have called '_snackBar.open'`, inject([MatSnackBar], (_snackBar: MatSnackBar) => {
    spyOn(_snackBar, 'open').and.returnValues();
    const service: MessageService = TestBed.get(MessageService);
    service.showToast('test', 'close');
    expect(_snackBar.open).toHaveBeenCalled();
  }));
});
