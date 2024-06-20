import { Category } from "./category";
import { User } from "./user";


export interface Event {
    id: string;
    title: string;
    city : string;
    address : string;
    date : Date;
    time : String;
    description : String;
    category : Category;
    owner : User;
}


export type CreateEventRequest = Omit<Event, "id"> ;

export type UpdateEventRequest= Omit<Event, "id" | "owner"> ;