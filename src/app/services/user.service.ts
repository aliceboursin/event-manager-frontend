import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { User } from "../data/user";
import { environment } from "../environment/environment.prod";
import {Review} from "../data/review";

@Injectable()
export class UserService {

  constructor(private http: HttpClient) { }

  getById(id: string): Observable<User> {
    return this.http.get<User>(`${environment.apiUrl}users/${id}`);
  }

  updatePassword(id: string, newPassword: string): Observable<any> {
    return this.http.put<any>(`${environment.apiUrl}users/${id}`, newPassword, {
      headers: { 'Content-Type': 'application/json' }
    });
  }

  deleteById(id: string): Observable<any> {
    return this.http.delete<any>(`${environment.apiUrl}users/${id}`);
  }


  getFriendsParticipationEventId(userId: string): Observable<string> {
    const url = `${environment.apiUrl}users/${userId}/friends/participations/events/id`;
    return this.http.get<string>(url);
  }

  getAllUserReviews(userId: string): Observable<Review[]> {
    const url = `${environment.apiUrl}users/${userId}/reviews`;
    return this.http.get<Review[]>(url);
  }


}






