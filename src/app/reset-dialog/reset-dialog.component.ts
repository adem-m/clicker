import { Component, OnInit } from '@angular/core';
import { AppService } from '../services/app.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-reset-dialog',
  templateUrl: './reset-dialog.component.html',
  styleUrls: ['./reset-dialog.component.scss']
})
export class ResetDialogComponent implements OnInit {

  constructor(private appService: AppService, private snackBar: MatSnackBar) { }

  ngOnInit(): void {
  }
  reset() {
    this.appService.reset();
    this.snackBar.open('Your data has been sucessfully reset', 'Close', { duration: 3000 });
  }
}
