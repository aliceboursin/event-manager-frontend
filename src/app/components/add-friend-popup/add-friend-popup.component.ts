import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { UserService } from '../../services/user.service';
import { FriendShipService } from '../../services/friendship.service';
import { SessionStorageService } from '../../services/session.storage.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';


@Component({
  selector: 'app-add-friend-popup',
  templateUrl: './add-friend-popup.component.html',
  styleUrls: ['./add-friend-popup.component.css']
})
export class AddFriendPopupComponent implements OnInit {
  loggedUserId: string = '';
  isSubmitted: boolean = false;
  form: FormGroup;

  constructor(
    public dialogRef: MatDialogRef<AddFriendPopupComponent>,
    private userService: UserService,
    private friendshipService: FriendShipService,
    private sessionStorageService: SessionStorageService,
    private fb: FormBuilder
  ) {
    this.loggedUserId = this.sessionStorageService.getItem('userId') || '';
    this.form = this.fb.group({
      friendUserId: [
        '',
        {
          validators: [Validators.required],
          updateOn: 'blur',
        },
      ],
    });
  }

  ngOnInit(): void {}

  get friendUserIdControl() {
    return this.form.controls['friendUserId'];
  }

  onSubmit(): void {
    this.isSubmitted = true;

    if (!this.form.valid) {
      return;
    }

    const friendUserId = this.friendUserIdControl.value;

    if (friendUserId === this.loggedUserId) {
      alert("You can't add yourself as a friend");
      return;
    }

    this.userService.getById(friendUserId).subscribe({
      next: (user) => {
        if (user) {
          this.friendshipService.create(this.loggedUserId, friendUserId).subscribe({
            next: () => {
              this.dialogRef.close(true);
            },
            error: (error) => {
              alert(error.error);
            }
          });
        } else {
          alert('User not found');
        }
      },
      error: (error) => {
        console.error('Error fetching user:', error);
        alert('The userId you entered is incorrect.');
      }
    });
  }
}