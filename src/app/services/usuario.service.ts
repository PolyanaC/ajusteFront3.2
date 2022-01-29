import { Usuario } from '../models/usuario.model';
import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { HttpClient } from '@angular/common/http';
import { EMPTY, Observable } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { API_CONFIG } from '../Config/api.config';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  //baseUrl = "http://localhost:3001/usuarios"

 /* constructor(private snackBar: MatSnackBar, private http: HttpClient) { }
  showMessage(msg: string, isError: boolean = false): void{
    this.snackBar.open(msg, 'x', {
      duration: 3000,
      horizontalPosition: "center",
      verticalPosition: "top",
      panelClass: isError ? ['msg-error'] :['msg-success']
    })
  }*/

  constructor(
    private http: HttpClient,
    private toast: ToastrService){}

  //this.http.post(`${API_CONFIG.baseUrl}/login`
  create(usuario: Usuario): Observable<Usuario> {
    return this.http.post<Usuario>(`${API_CONFIG.baseUrl}/usuario`, usuario).pipe(
      map((obj) => obj),
      catchError(e => this.errorHandler(e))
    );
  }

  errorHandler(e: any): Observable<any>{
    this.toast.error('Ocorreu um erro!', 'Erro');
    console.log(e)
    return EMPTY;
  }

  read(): Observable<Usuario[]> {
    return this.http.get<Usuario[]>(`${API_CONFIG.baseUrl}/usuario`).pipe(
      map((obj) => obj),
      catchError(e => this.errorHandler(e))
      );
  }

readById(id: number): Observable<Usuario>{
  const url = `${API_CONFIG.baseUrl}/usuario/${id}`
  return this.http.get<Usuario>(url).pipe(
    map((obj) => obj),
    catchError(e => this.errorHandler(e))
    );
}

update(usuario: Usuario): Observable<Usuario>{
  const url = `${API_CONFIG.baseUrl}/usuario/${usuario.id}`
  return this.http.put<Usuario>(url, usuario).pipe(
    map((obj) => obj),
    catchError(e => this.errorHandler(e))
    );
}

delete(id: number): Observable<Usuario>{
  const url = `${API_CONFIG.baseUrl}/usuario/${id}`;
  return this.http.delete<Usuario>(url).pipe(
    map((obj) => obj),
    catchError(e => this.errorHandler(e))
  );
}

}
