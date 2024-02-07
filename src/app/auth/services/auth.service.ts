import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from '../interfaces/user.interface';
import { Observable, catchError, map, of, tap } from 'rxjs';
import { environments } from '../../enviroments/environments';

@Injectable({providedIn: 'root'})
export class AuthService {
  constructor(private http: HttpClient) { }
  baseUrl:string = environments.baseUrl;
  user?:User;

  get currentUser():User|undefined {
    if(!this.user) return undefined;
    return structuredClone(this.user);
  }

  login(email:string,password:string):Observable<User>{

    return this.http.get<User>(`${this.baseUrl}/users/1`)
      .pipe(
        tap( user => this.user=user),
        tap( user => localStorage.setItem('token','12asdasd.12dasdae45342.d4322'))
      )
  }

  checkAuthentication():Observable<boolean> {
    if(!localStorage.getItem('token')) return of(false);

    const token = localStorage.getItem('token');
    return this.http.get<User>(`${this.baseUrl}/users/1`)
      .pipe(
        tap( user => this.user=user),
        map( user =>!!user),
        catchError(err => of(false))
      )

  }

  logout(){
    this.user = undefined;
    localStorage.clear();
  }

}
