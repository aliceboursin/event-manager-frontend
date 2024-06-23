import { Injectable } from "@angular/core";
import { environment } from "../environment/environment.prod";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { User } from "../data/user";

@Injectable()
export class UserService {
  private userUrl = environment.apiUrl + 'users';

  constructor(private http: HttpClient) { }


  getUserByUsername(name: string): Observable<User> {
    const url = `${this.userUrl}/username/${name}`;
    return this.http.get<User>(url);
  }

}
