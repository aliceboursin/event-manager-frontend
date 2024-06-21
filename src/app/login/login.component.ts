import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { AuthService } from '../services/auth.service';
import { AuthData } from '../data/authdata';
import { SessionStorageService } from '../services/session.storage.service';
import { MatDialogRef } from '@angular/material/dialog';


@Component({
  selector: 'login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

    constructor(private fb: FormBuilder, private authService: AuthService, private sessionStorageService: SessionStorageService,  public dialogRef: MatDialogRef<LoginComponent>){};

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
        const data: AuthData = {
            username: this.form.get('username')?.value ?? '',
            password: this.form.get('password')?.value ?? ''
        }
        this.authService.login(data).subscribe(
            response => {
              console.log('Login successful:', response);
              const userId = response.userId;
              this.sessionStorageService.setItem('userId', userId);
            },
            error => {
              console.error('Login failed:', error);
            }
          );
    }

    
  closeDialog(): void {
    this.dialogRef.close();
  }
}
