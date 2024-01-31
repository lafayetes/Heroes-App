import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Hero } from '../interfaces/hero.interface';
import { environments } from '../../enviroments/environments';

@Injectable({providedIn: 'root'})
export class HeroesService {

  private baseUrl = environments.baseUrl;

  constructor(private http: HttpClient) { }


//Es bueno siempre mantener el estandar de colocar el tipo de retorno que tendra y siempre manejar interfaces
  getHeroes():Observable<Hero[]>{


    return this.http.get<Hero[]>(`${this.baseUrl}/heroes`);

  }

}
