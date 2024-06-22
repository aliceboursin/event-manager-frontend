import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { SignUpComponent } from '../signup/signup.component';

@Component({
  selector: 'home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  constructor(public dialog: MatDialog) {}

  openSignUp(): void {
    const dialogRef = this.dialog.open(SignUpComponent, {
      width: '50%',
      position: { right: '0' },
      panelClass: 'custom-dialog-container'
    });
  }
}
