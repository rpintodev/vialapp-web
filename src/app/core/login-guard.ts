// core/login-guard.ts
import { CanActivateFn, Router } from "@angular/router";
import { AuthService } from "../services/auth/auth.service";
import { inject } from "@angular/core";
import { map, catchError } from 'rxjs/operators';
import { of } from 'rxjs';

export const loginGuard: CanActivateFn = (route, state) => {
    const authService = inject(AuthService);
    const router = inject(Router);

    return authService.checkAuthStatus().pipe(
        map(isAuthenticated => {
            if (isAuthenticated) {
                router.navigateByUrl('/dashboard');
                return false; // Bloquear acceso al login
            } else {
                return true;
            }
        }),
        catchError(error => {

            return of(true);
        })
    );
};