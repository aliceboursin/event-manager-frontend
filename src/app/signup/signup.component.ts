import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { hasLowerCase, hasNumeric, hasUpperCase, passwordsMatch } from '../validators/text.validators';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { AuthData } from '../data/authdata';
import { SessionStorageService } from '../services/session.storage.service';


@Component({
  selector: 'signup',
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.css'
})
export class SignUpComponent {

    constructor(private fb: FormBuilder, private authService: AuthService, private router: Router, private sessionStorageService: SessionStorageService){};

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
        const data: AuthData = {
            username: this.form.get('username')?.value ?? '',
            password: this.form.get('password')?.value ?? ''
        }
        this.authService.signup(data).subscribe(
            response => {
              console.log('Register successful:', response);
              const userId = response.userId;
              this.sessionStorageService.setItem('userId', userId);
            },
            error => {
              console.error('Register failed:', error);
              // Gérez l'affichage des erreurs ici
            }
          );
    }
}
