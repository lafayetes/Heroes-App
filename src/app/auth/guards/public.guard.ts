import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, CanMatch, Route, Router, RouterStateSnapshot, UrlSegment, UrlTree } from '@angular/router';
import { Observable, tap, map } from 'rxjs';
import { AuthService } from '../services/auth.service';
//TODO: El desafio estara en adecuar el nuevo modo de usar los guards.
@Injectable({
  providedIn: 'root'
})
export class PublicGuard implements CanActivate, CanMatch {

  constructor(private authService: AuthService,
    private router: Router) { }

  private checkAuthStatus(): Observable<boolean> | boolean {
    return this.authService.checkAuthentication()
      .pipe(
        tap(isAuthenticated => {
          if (isAuthenticated) this.router.navigate(['./'])

        }),
        map(isAuthenticated => !isAuthenticated)
      );
  }

  canMatch(
    route: Route,
    segments: UrlSegment[]): Observable<boolean> | boolean {
    console.log({ route, segments });
    return this.checkAuthStatus();
  }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | boolean {
    console.log({ route, state });

    return this.checkAuthStatus();
  }

}
