import { CanActivateFn, Router } from "@angular/router";
import { AuthService } from "../services/auth/auth.service";
import { inject } from "@angular/core";
import { catchError, map, of } from "rxjs";

export const authGuard:CanActivateFn=(route,state)=>{
    const authService=inject(AuthService);
    const router = inject(Router);
    
    return authService.checkAuthStatus().pipe(
        map(isAuthenticated => {
            if (isAuthenticated) {
                return true;
            } else {
                router.navigateByUrl('/authentication/login');
                return false;
            }
        }),
        catchError(error => {
            router.navigateByUrl('/authentication/login');
            return of(false);
        })
    );
}