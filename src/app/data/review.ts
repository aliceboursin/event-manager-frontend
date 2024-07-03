import { User } from "../data/user";
import { Event } from "../data/event";

export interface Review {
    id: string;
    event : Event,
    user: User;
    comment : string;
    grade : number;
    date : Date;
}


export interface CreateReviewRequest {
  eventId : string,
  userId: string;
  comment : string;
  grade : number;
}



