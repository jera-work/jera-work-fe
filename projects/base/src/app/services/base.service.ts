import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { AuthService } from './auth.service';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';

// RESPONSE
function response<T>(message: MessageService, router: Router) {
  return tap<T>({
    next: (data) => {
      if (data && (data as any).message) {
        message.add({
          severity: 'success',
          summary: 'Success',
          detail: (data as any).message,
        });
      }
    },
    error: (err) => {
      console.log(err.status === 401 && err.error.message === 'Token Expired');

      if (err instanceof HttpErrorResponse) {
        message.add({
          severity: 'error',
          summary: 'Error',
          detail: err.error.message,
        });
      }
      if (err.status === 401 && err.error.message === 'Token Expired') {
        localStorage.clear();
        router.navigateByUrl('/login');
      }
    },
  });
}

@Injectable({
  providedIn: 'root',
})
export class BaseService {
  constructor(
    private http: HttpClient,
    private authService: AuthService,
    private router: Router,
    private message: MessageService
  ) {}

  private get token(): string | null {
    const data = this.authService.getProfile();
    return data && data.token ? data.token : null;
  }

  private get headers() {
    return {
      headers: {
        Authorization: `Bearer ${this.token}`,
      },
    };
  }

  // POST API
  post<T>(url: string, body: any, withToken = true): Observable<T> {
    return this.http
      .post<T>(url, body, withToken ? this.headers : undefined)
      .pipe(response(this.message, this.router));
  }

  // GET API
  get<T>(url: string, withToken = true): Observable<T> {
    return this.http
      .get<T>(url, withToken ? this.headers : undefined)
      .pipe(response(this.message, this.router));
  }

  // PATCH API
  patch<T>(url: string, body: any, withToken = true): Observable<T> {
    return this.http
      .patch<T>(url, body, withToken ? this.headers : undefined)
      .pipe(response(this.message, this.router));
  }

  // PUT API
  put<T>(url: string, body: any, withToken = true): Observable<T> {
    return this.http
      .put<T>(url, body, withToken ? this.headers : undefined)
      .pipe(response(this.message, this.router));
  }
}
