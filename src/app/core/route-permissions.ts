import { CanActivateFn,Router } from "@angular/router";
import {inject} from '@angular/core';
import {map,catchError} from 'rxjs/operators';
import { of } from 'rxjs';
import { AuthService } from "../services/auth/auth.service";

export const routePermissionsGuard: CanActivateFn=(route,state)=>{

    const authService=inject(AuthService);
    const router=inject(Router);
    const requestedRoute=state.url;

    return authService.hasRouteAccess(requestedRoute).pipe(
        map(hasAccess=>{
            if (hasAccess) {
                console.log('✅ Acceso permitido a:', requestedRoute);
                return true;
            } else {
                console.log('❌ Acceso denegado a:', requestedRoute);
                router.navigate(['/dashboard']);
                return false;
            }
        }),
        catchError(error=>{
            console.error('Error checking route access:', error);
            router.navigate(['/unauthorized']);
            return of(false);
        })
    )

    
}