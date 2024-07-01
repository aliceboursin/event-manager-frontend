import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { User } from "../data/user";
import { environment } from "../environment/environment.prod";

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

  getFriendsById(id: string): Observable<User[]> {
    return this.http.get<User[]>(`${environment.apiUrl}users/${id}/friends`);
  }

  addFriend(userId: string, friendId: string): Observable<User> {
    return this.http.post<User>(`${environment.apiUrl}users/${userId}/friends/${friendId}`, {});
  }

  isParticipating(eventId: string, userId: string): Observable<boolean> {
    const url = `${environment.apiUrl}users/${eventId}/participations/${userId}`;
    return this.http.get<boolean>(url);
  }
  
  
}
