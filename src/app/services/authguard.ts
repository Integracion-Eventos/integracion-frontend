import { Injectable } from "@angular/core";
import { CanActivate, Router } from "@angular/router"
import { AuthserviceService } from "./authservice.service";
import { Observable, flatMap, of, tap } from "rxjs";

@Injectable({
    providedIn: 'root'
  })
  export class AuthGuard implements CanActivate {
    constructor(
      private authService: AuthserviceService,
      private router: Router
    ) {}
  
    canActivate(): boolean {
      if (this.authService.isLoggedIn()) {
        return true;
      } else {
        this.router.navigate(['/login']);
        return false;
      }
    }
  }