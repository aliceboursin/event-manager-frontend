import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { AuthData } from '../../data/authdata';
import { SessionStorageService } from '../../services/session.storage.service';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { ToastService } from '../../services/toast.service';
import { Router } from '@angular/router';
import { SignUpComponent } from '../signup/signup.component';


@Component({
  selector: 'login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

  isSubmitted: boolean = false;

    constructor(
      private fb: FormBuilder,
      private authService: AuthService, 
      private sessionStorageService: SessionStorageService,  
      public dialogRef: MatDialogRef<LoginComponent>,
      private toastService: ToastService,
      private router: Router,
      public dialog: MatDialog,

    ){};

    form = this.fb.group({
        username: [
            '',
            {
                validators : [Validators.required],
                updateOn: 'blur',
            },
        ],
        password:[
            '',
            [
                Validators.required,
            ],
        ],
    });

    get username() {
        return this.form.controls['username'];
    }
    
    get password() {
        return this.form.controls['password'];
    }

    onSubmit(){
      this.isSubmitted = true;
      if (this.form.valid) {
        const data: AuthData = {
          username: this.form.get('username')?.value ?? '',
          password: this.form.get('password')?.value ?? ''
      }
      this.authService.login(data).subscribe(
          response => {
            console.log('Login successful:', response);
            const userId = response.userId;
            this.sessionStorageService.setItem('userId', userId);
            this.toastService.showToast("Welcome back !", "success");
            this.goToEventsPage();
            this.closeDialog();
          },
          error => {
            console.error('Login failed:', error);
            this.toastService.showToast("Username or password incorrect", "error");
          }
        );
        console.log(this.sessionStorageService.getItem('userId'));
      }
      else{
        this.toastService.showToast("Please review your information", "error");
    }
        
    }

    
  closeDialog(): void {
    this.dialogRef.close();
  }

  goToEventsPage(){
    this.router.navigate(['/events']);
  }

  openSignUp(): void {
    this.dialog.open(SignUpComponent, {
      width: '50%',
      position: { right: '0' },
      panelClass: 'custom-dialog-container'
    });
  }
}
