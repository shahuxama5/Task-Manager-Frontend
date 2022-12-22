import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { WebRequestService } from './web-request.service';
import { shareReplay, tap } from 'rxjs/operators';
import { HttpResponse } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private webService: WebRequestService, private router: Router) { }

  login(email: string, password: string) {
    return this.webService.login(email, password).pipe(
      shareReplay(),
      tap((res: HttpResponse<any>) => {
        this.setSession(res.body._id, res.headers.get('x-access-token'), res.headers.get('x-refresh-token'))
        console.log("LOGGED IN !!!");
      })
    )
  }

  logout() {
    this.removeSession();
    console.log("LOGGED OUT !!!");
  }

  getAccessToken () {
    return localStorage.getItem('x-access-token');
  }

  getRefreshToken () {
    return localStorage.getItem('x-refresh-token');
  }

  setAccessToken (accessToken: string) {
    return localStorage.setItem('x-access-token', accessToken);
  }

  setRefreshToken (refreshToken: string) {
    return localStorage.setItem('x-refresh-token', refreshToken);
  }

  private setSession(userId: string, accessToken: any, refreshToken: any) {
    localStorage.setItem('user-id', userId);
    localStorage.setItem('x-access-token', accessToken);
    localStorage.setItem('x-refresh-token', refreshToken);
  }

  private removeSession() {
    localStorage.removeItem('user-id');
    localStorage.removeItem('x-access-token');
    localStorage.removeItem('x-refresh-token');
  }

}
