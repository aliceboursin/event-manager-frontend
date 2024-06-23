import { Component, Input } from "@angular/core";
import { SessionStorageService } from "../../services/session.storage.service";

@Component({
  selector: 'user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']  // Correction ici
})
export class UserComponent {

  username: string = "";  // Initialisation par défaut

  constructor(private sessionStorageService: SessionStorageService) {
    // Initialisation correcte de la variable `username` dans le constructeur
    this.username = this.sessionStorageService.getItem('username') || "";
  }


  friends: { name: string }[] = [
    { name: 'John Doe' },
    { name: 'Jane Smith' },
    { name: 'Emily Johnson' }
  ];

  editUsername() {
    // Logique pour éditer le nom d'utilisateur
    console.log('Edit Username');
  }

  editPassword() {
    // Logique pour éditer le mot de passe
    console.log('Edit Password');
  }

  removeFriend(friend: { name: string }) {
    // Logique pour supprimer un ami
    this.friends = this.friends.filter(f => f !== friend);
  }
}

