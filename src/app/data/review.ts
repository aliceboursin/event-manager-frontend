import { User } from "./user";

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
