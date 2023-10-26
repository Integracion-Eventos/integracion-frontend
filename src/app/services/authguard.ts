import { Injectable } from "@angular/core";
import { CanActivate, Router } from "@angular/router"
import { AuthserviceService } from "./authservice.service";
import { Observable, flatMap, of, tap } from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private authService: AuthserviceService, private router: Router) {}

  canActivate(): Observable<boolean> {
    return this.authService.isLoggedIn().pipe(
      tap((loggedIn) => {
        if (!loggedIn) {
          this.router.navigate(['/login']);
        }
      }, error => {
        localStorage.removeItem('jwt')
        this.router.navigate(['/login']);
      })
    );
  }
}
