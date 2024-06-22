import { Injectable } from "@angular/core";
import { environment } from "../environment/environment.prod";
import { HttpClient } from "@angular/common/http";
import { Observable} from "rxjs";
import { AuthData } from "../data/authdata";

@Injectable()
export class AuthService {
    
    private authUrl = environment.apiUrl + 'auth';

    constructor(private http: HttpClient) { }

    login(authData: AuthData) : Observable<any>{
        const loginUrl = `${this.authUrl}/login`;
        return this.http.post(loginUrl, authData, { responseType: 'json' });
    }

    signup(authData : AuthData) : Observable<any>{
        const signupUrl = `${this.authUrl}/register`;
        return this.http.post(signupUrl, authData, { responseType: 'json' });
    }

}