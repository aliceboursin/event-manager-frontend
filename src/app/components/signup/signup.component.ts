import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { hasLowerCase, hasNumeric, hasUpperCase, passwordsMatch } from '../../validators/text.validators';
import { AuthService } from '../../services/auth.service';
import { AuthData } from '../../data/authdata';
import { SessionStorageService } from '../../services/session.storage.service';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { LoginComponent } from '../login/login.component';
import { ToastService } from '../../services/toast.service';
import { Router } from '@angular/router';


@Component({
  selector: 'signup',
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.css'
})
export class SignUpComponent {

    constructor(
        private fb: FormBuilder, 
        private authService: AuthService, 
        private sessionStorageService: SessionStorageService, 
        public dialogRef: MatDialogRef<SignUpComponent>, 
        public dialog: MatDialog,
        private toastService: ToastService,
        private router: Router,
    ){};

    isSubmitted: boolean = false;

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
                Validators.minLength(8),
                hasUpperCase(),
                hasLowerCase(),
                hasNumeric(),
            ],
        ],
        confirmPassword:[
            '',
            [
                Validators.required,
            ],
        ]
    }, { validators: passwordsMatch()});

    get username() {
        return this.form.controls['username'];
    }
    
    get password() {
        return this.form.controls['password'];
    }

    get confirmPassword(){
        return this.form.controls['confirmPassword'];
    }

    onSubmit(){
         this.isSubmitted = true;
        if (this.form.valid) {
            const data: AuthData = {
                username: this.form.get('username')?.value ?? '',
                password: this.form.get('password')?.value ?? ''
            }
            this.authService.signup(data).subscribe(
                response => {
                  console.log('Register successful:', response);
                  const userId = response.userId;
                  this.sessionStorageService.setItem('userId', userId);
                  this.toastService.showToast("Register succeed!", "success");
                  this.closeDialog();
                  this.goToEventsPage();
                },
                error => {
                  console.error('Register failed:', error);
                  this.toastService.showToast(error.error, "error");
                }
              );
        }
        else{
            this.toastService.showToast("Please review your information", "error");
        }
    
    }

    closeDialog(): void {
        this.dialogRef.close();
    }

    openLogin(): void {
        this.dialogRef.close();
        const dialogRefLogin = this.dialog.open(LoginComponent, {
          width: '50%',
          position: { right: '0' },
          panelClass: 'custom-dialog-container'
        });
    }

    goToEventsPage(){
        this.router.navigate(['/events']);
      }



}
