import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { UserModel } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class UsersDataService {

  constructor(
    private http: HttpClient
  ) { }

  /** Request all users limited amount by backend settings */
  getAllUsers(): Observable<UserModel[]> {
    return this.http.get<UserModel[]>(`${environment.apiRoute}/get-stored-users`);
  }

  /** Get all unique countries that are available in Database */
  getAllUniqueCountries():  Observable<string[]> {
    return this.http.get<string[]>(`${environment.apiRoute}/get-unique-countries`);
  }

  /** Request all users for country amount limited by backend settings */
  getUsersForCountry(country: string): Observable<UserModel[]> {
    return this.http.post<UserModel[]>(`${environment.apiRoute}/get-users-by-country`, {country});
  }
}
