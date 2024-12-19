import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class MessageService {
  constructor(private _snackBar: MatSnackBar) {}

  showToast(message: string, action: string, duration?:number): void {
    this.open(message, action, duration);
  }

  open(message: string, action: string, duration = 20000): void {
    duration = action === 'success' ? 10000 : 30000 
    this._snackBar.open(message, 'Close', {
      duration: duration,
    });
  }
}
