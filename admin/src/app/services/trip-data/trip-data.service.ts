import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Trip {
  code: string;
  name: string;
  length: string;
  start: Date;
  resort: string;
  perPerson: number;
  image: string;
  description: string;
}

@Injectable({
  providedIn: 'root'
})
export class TripDataService {
  private url = 'http://localhost:3000/api/trips';

  constructor(private http: HttpClient) {}

  getTrips(): Observable<Trip[]> {
    return this.http.get<Trip[]>(this.url);
  }

  addTrip(trip: any) {
    return this.http.post(this.url, trip);
  }

  updateTrip(code: string, updatedTrip: any): Observable<any> {
    return this.http.put(`${this.url}/${code}`, updatedTrip);
  }

  deleteTrip(code: string): Observable<any> {
    return this.http.delete(`${this.url}/${code}`);
  }

  getTrip(code: string): Observable<Trip> {
    return this.http.get<Trip>(`${this.url}/${code}`);
  }

}
