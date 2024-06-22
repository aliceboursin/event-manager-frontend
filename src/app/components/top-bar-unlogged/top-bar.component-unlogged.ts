import { Component } from "@angular/core";
import { MatDialog } from "@angular/material/dialog";
import { LoginComponent } from "../login/login.component";
import { SignUpComponent } from "../signup/signup.component";

@Component({
    selector : 'app-top-bar-unlogged',
    templateUrl: './top-bar-unlogged.component.html',
    styleUrls: ['./top-bar-unlogged.component.css']

})
export class TopBarUnloggedComponent{

    constructor(public dialog: MatDialog) {}

  openLogin(): void {
    const dialogRef = this.dialog.open(LoginComponent, {
      width: '50%',
      position: { right: '0' },
      panelClass: 'custom-dialog-container'
    });
  }

  openSignUp(): void {
    const dialogRef = this.dialog.open(SignUpComponent, {
      width: '50%',
      position: { right: '0' },
      panelClass: 'custom-dialog-container'
    });
  }
    
}