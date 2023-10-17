import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, catchError, of, tap, throwError } from 'rxjs';

import { User } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {
  //private apiUrl = 'https://jsonplaceholder.typicode.com/users'; // Reemplaza con la IP de tu servidor FastAPI
  private apiUrl = 'http://localhost:8000';
  constructor(private http: HttpClient){ }

  post(user : User): Observable<User>{
    return this.http.post<User>(this.apiUrl+ '/users', user)
    .pipe(
      tap(_ => console.log('Usuario registrado')),
      catchError(error =>{
          console.log(error)
          return of(error)
      })
    );
  }

  uploadFile(file: File): Observable<any>{
    const formData = new FormData();
    formData.append('file', file);
    return this.http.post(this.apiUrl+ '/upload-image', formData);
  }

  get(): Observable <User[]>{
    return this.http.get<User[]>(this.apiUrl+'/users').pipe(
      tap(_ => console.log('Datos Encontrado')),
      catchError(error =>{
        console.log("error al buscar")
        return of(error as User[])
      })
      );
  
  }


  
}
