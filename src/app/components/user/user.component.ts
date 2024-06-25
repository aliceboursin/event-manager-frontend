import { Component } from "@angular/core";
import { SessionStorageService } from "../../services/session.storage.service";
import { User } from "../../data/user";
import { FriendShipService } from "../../services/friendship.service";
import { AddFriendPopupComponent } from "../add-friend-popup/add-friend-popup.component";
import { MatDialog } from "@angular/material/dialog";
import { UserService } from "../../services/user.service";
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { hasLowerCase, hasNumeric, hasUpperCase, passwordsMatch } from "../../validators/text.validators";
import { ToastService } from "../../services/toast.service";

@Component({
  selector: 'user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent {

  username: string = ""; 
  id: string = "";
  copyButtonState: boolean = false;
  passwordForm: FormGroup;
  editModePassword: boolean = false;
  isSubmitted: boolean = false;

  friends: User[] = [];

  constructor(
    private sessionStorageService: SessionStorageService,
    private friendshipService: FriendShipService,
    private dialog: MatDialog,
    private userService: UserService,
    private router: Router,
    private fb: FormBuilder,
    private toastService: ToastService,
  ) {
    this.username = this.sessionStorageService.getItem('username') || "";
    this.id = this.sessionStorageService.getItem('userId') || "";
    this.passwordForm = this.fb.group({
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
  }

get password() {
    return this.passwordForm.controls['password'];
}

get confirmPassword(){
    return this.passwordForm.controls['confirmPassword'];
}

ngOnInit(): void {
  this.loadFriends();
}

loadFriends(): void {
  this.friendshipService.getById(this.id).subscribe((friends) => {
    this.friends = friends;
  });
}

editPassword(): void {
  this.editModePassword = true;
  this.passwordForm.reset();
}

cancelEditPassword(): void {
  this.editModePassword = false;
}

onSubmitPassword(): void {
  this.isSubmitted = true;
  if (this.passwordForm.valid) {
    const newPassword = this.passwordForm.get('password')?.value ?? '';
    if(newPassword == ''){
      console.log("error");
    }
    else{
      this.userService.updatePassword(this.id, newPassword).subscribe(
      response => {
        console.log('Password updated successfully:', response);
        this.toastService.showToast("Password updated successfully", "success");
        this.editModePassword = false;
      },
      error => {
        console.error('Failed to update password:', error);
        this.toastService.showToast("Failed to update password", "error");
      }
      ); 
    } 
     
  } else {
    this.toastService.showToast("Please review your information", "error");
  }
}

  removeFriend(friend: User): void {
    this.friendshipService.removeFriend(this.id, friend.id).subscribe({
      next: () => {
        this.friends = this.friends.filter(f => f.id !== friend.id);
      },
      error: (error) => {
        console.error('Error removing friend:', error);
        alert('An error occurred while removing the friend. Please try again.');
      }
    });
  }

  deleteUserAccount(): void {
    if (confirm('Are you sure you want to delete your account? This action cannot be undone.')) {
      this.userService.deleteById(this.id).subscribe({
        next: () => {
          this.sessionStorageService.clear();
          this.router.navigate(['/']);
          this.toastService.showToast("Account deleted.", "success");
        },
        error: (error) => {
          console.error('Error deleting account:', error);
          alert('An error occurred while deleting the account. Please try again.');
        }
      });
    }
  }

  openAddFriendPopup(): void {
    const dialogRef = this.dialog.open(AddFriendPopupComponent, {
      width: '300px'
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.loadFriends();
      }
    });
  }

  copyUserId(): void {
    navigator.clipboard.writeText(this.id).then(() => {
      this.copyButtonState = true;
      setTimeout(() => {
        this.copyButtonState = false;
      }, 2000);
    }, (err) => {
      console.error('Could not copy text: ', err);
    });
  }
}


