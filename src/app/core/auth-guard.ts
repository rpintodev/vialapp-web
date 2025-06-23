import { CanActivateFn, Router } from "@angular/router";
import { AuthService } from "../services/auth/auth.service";
import { inject } from "@angular/core";

export const authGuard:CanActivateFn=(route,state)=>{
    const authService=inject(AuthService);
    const router = inject(Router);
    if(authService.isLoggedIn){
        console.log('esta logeado');
        return true
    }else{
               
        console.log(' no esta logeado');
        router.navigateByUrl('/authentication/login');
        return false;
    }
}