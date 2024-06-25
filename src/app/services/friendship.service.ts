import { Injectable } from "@angular/core";
import { HttpClient, HttpParams } from "@angular/common/http";
import { Observable } from "rxjs";
import { User } from "../data/user";
import { environment } from "../environment/environment.prod";

@Injectable()
export class FriendShipService {

    constructor(private http: HttpClient) { }

        
    getById(id: string): Observable<User[]> {
        return this.http.get<User[]>(environment.apiUrl + 'users/' + id +'/friends');
    }

    create(id1: String, id2 : String): Observable<any> {
        const url = environment.apiUrl + 'users/' + id1 +'/friends/' +id2;
        return this.http.post(url, { responseType: 'json' });
    }

    removeFriend(userId: string, friendId: string): Observable<any> {
        return this.http.delete<any>(`${environment.apiUrl}users/${userId}/friends/${friendId}`);
    }
    

}