import { Injectable } from "@angular/core";
import { environment } from "../environment/environment.prod";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { Category } from "../data/category";

@Injectable()
export class CategoryService {
    private categoryUrl = environment.apiUrl + 'categories';

    constructor(private http: HttpClient) { }


    getAll(): Observable<Category[]> {
        return this.http.get<Category[]>(this.categoryUrl);
    }

    getById(id: string): Observable<Category> {
        const url = `${this.categoryUrl}/${id}`;
        return this.http.get<Category>(url);
    }

}
