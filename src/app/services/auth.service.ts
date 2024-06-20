import { Injectable } from "@angular/core";
import { environment } from "../environment/environment.prod";
import { HttpClient } from "@angular/common/http";
import { Observable, of } from "rxjs";
import { User } from "../data/user";
import { AuthData } from "../data/authdata";

@Injectable()
export class AuthService {
    
    private authUrl = environment.apiUrl + 'auth';

    constructor(private http: HttpClient) { }

    login(authData: AuthData) : Observable<any>{
        const loginUrl = `${this.authUrl}/login`;
        return this.http.post(loginUrl, authData, { responseType: 'text' });
    }

    signup(authData : AuthData) : Observable<any>{
        const signupUrl = `${this.authUrl}/signup`;
        return this.http.post(signupUrl, authData, { responseType: 'text' });
    }

}