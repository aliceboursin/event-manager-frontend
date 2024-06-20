import { Injectable } from "@angular/core";
import { environment } from "../environment/environment.prod";
import { HttpClient, HttpParams } from "@angular/common/http";
import { Observable } from "rxjs";
import { CreateEventRequest, UpdateEventRequest } from "../data/event";
import { Event } from "../data/event";

@Injectable()
export class EventService {
    private eventUrl = environment.apiUrl + 'events';

    constructor(private http: HttpClient) { }

        
    getAll(title?: string): Observable<Event[]> {
        let params = new HttpParams();
        if (title) {
          params = params.append('title', title);
        }
        return this.http.get<Event[]>(this.eventUrl, { params });
    }

    getAllSortedByDate(): Observable<Event[]> {
        const url = `${this.eventUrl}/sorted-by-date`;
        return this.http.get<Event[]>(url);
    }

    getById(id: string): Observable<Event> {
        const url = `${this.eventUrl}/${id}`;
        return this.http.get<Event>(url);
    }

    getByCategoryId(categoryId: string): Observable<Event[]> {
        const url = `${this.eventUrl}/category/${categoryId}`;
        return this.http.get<Event[]>(url);
    }

    create(post: CreateEventRequest): Observable<Event> {
        return this.http.post<Event>(this.eventUrl, post);
    }

    update(id: string, post: UpdateEventRequest): Observable<Event> {
        const url = `${this.eventUrl}/${id}`;
        return this.http.put<Event>(url, post);
    }


    deleteById(id: string): Observable<void> {
        const url = `${this.eventUrl}/${id}`;
        return this.http.delete<void>(url);
    }
    

}