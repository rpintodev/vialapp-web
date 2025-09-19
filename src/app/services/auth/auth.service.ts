import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, catchError, map, Observable, tap } from 'rxjs';
import { Environment } from 'src/app/environment/environment';
import { UsuarioMapper } from 'src/app/mappers/model.mapper';
import { IUsuario } from 'src/app/models/usuario';
import { CookieService } from '../cookie.service';
import { NavItem } from 'src/app/layouts/full/sidebar/nav-item/nav-item';
import { PermissionsService } from '../permissions/permissions.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  
  constructor(
    private http: HttpClient,
    private cookieService: CookieService,
    private navTransformer: PermissionsService
  ) { }

  private apiUrl = `${Environment.NODESERVER}api/usuarios`;
  private apiUrlAuth = `${Environment.NODESERVER}api/auth`;

  private navItemsSubject = new BehaviorSubject<NavItem[]>([]);
  private allowedRoutesSubject = new BehaviorSubject<string[]>([]);
  
  // Observables públicos
  public navItems$ = this.navItemsSubject.asObservable();
  public allowedRoutes$ = this.allowedRoutesSubject.asObservable();

  private isAuthenticatedSubject = new BehaviorSubject<boolean>(false);

  usuario: IUsuario;
  private token: string = '';

  // 🍪 LOGIN CON SOPORTE PARA COOKIES
  public login(usuario: string, contraseña: string): Observable<IUsuario> {
    const body = {
      Usuario: usuario,
      Password: contraseña
    };
    
    return this.http.post<IUsuario>(`${this.apiUrl}/login`, body, {
      withCredentials: true // Importante: permite recibir cookies del servidor
    }).pipe(
      tap((response: any) => {
        if (response.success) {
          if (response.permissions) {

            const navItems = this.navTransformer.transformPermissionsToNavItems(response.permissions);
            this.navItemsSubject.next(navItems);
            const allowedRoutes = this.navTransformer.getAllowedRoutes(response.permissions);
            this.allowedRoutesSubject.next(allowedRoutes);
            this.savePermissionsToStorage(navItems, allowedRoutes);
          
          }
          this.isAuthenticatedSubject.next(true);
        }
      })
    );
  }

   getNavItems(): Observable<NavItem[]> {
    // Si ya están cargados, devolverlos
    if (this.navItemsSubject.value.length > 0) {
      return this.navItems$;
    }
    
    // Si no, intentar cargar desde localStorage
    const cached = this.loadPermissionsFromStorage();
    if (cached.navItems.length > 0) {
      this.navItemsSubject.next(cached.navItems);
      this.allowedRoutesSubject.next(cached.allowedRoutes);
      return this.navItems$;
    }
    
    // Si no hay nada en cache, devolver items por defecto
    const defaultItems = this.navTransformer.transformPermissionsToNavItems([]);
    this.navItemsSubject.next(defaultItems);
    return this.navItems$;
  }

  logOut(): Observable<any> {
  return this.http.post<any>(`${this.apiUrlAuth}/logout`, {}, {
    withCredentials: true
  }).pipe(
    tap((response) => {
      this.isAuthenticatedSubject.next(false);
      this.clearAuthData();
    }),
    catchError(error => {
      this.isAuthenticatedSubject.next(false);
      this.clearAuthData();
      throw error;
    })
  );
}

  private savePermissionsToStorage(navItems: NavItem[], allowedRoutes: string[]): void {
    try {
      const permissionsData = {
        navItems,
        allowedRoutes,
        timestamp: Date.now()
      };
      localStorage.setItem('user_navigation', JSON.stringify(permissionsData));
    } catch (error) {
      console.warn('Error guardando permisos en localStorage:', error);
    }
  }

  public getUserInfo(): any | null {
    try {
      const userInfoString = this.getCookie('userInfo');
      if (userInfoString) {
        return JSON.parse(userInfoString);
      }
      return null;
    } catch (error) {
      console.error('Error parsing userInfo cookie:', error);
      return null;
    }
  }

  private loadPermissionsFromStorage(): { navItems: NavItem[], allowedRoutes: string[] } {
    try {
      const cached = localStorage.getItem('user_navigation');
      if (cached) {
        const data = JSON.parse(cached);
        // Verificar que no sea muy viejo (1 hora)
        if (Date.now() - data.timestamp < 60 * 60 * 1000) {
          return {
            navItems: data.navItems || [],
            allowedRoutes: data.allowedRoutes || []
          };
        }
      }
    } catch (error) {
      console.warn('Error cargando permisos desde localStorage:', error);
    }
    
    return { navItems: [], allowedRoutes: [] };
  }

  getCookie(name: string): string | null {
    const nameEQ = name + "=";
    const ca = document.cookie.split(';');
    
    for(let i = 0; i < ca.length; i++) {
      let c = ca[i];
      while (c.charAt(0) === ' ') {
        c = c.substring(1, c.length);
      }
      if (c.indexOf(nameEQ) === 0) {
        const encodedValue = c.substring(nameEQ.length, c.length);
        // ⭐ DECODIFICAR la cookie
        return decodeURIComponent(encodedValue);
      }
    }
    return null;
  }

  get isLoggedIn(): Observable<boolean> {
    return this.isAuthenticated();
  }

  

  
  checkAuthStatus(): Observable<boolean> {
    return this.http.get<any>(`${this.apiUrlAuth}/verify`).pipe(
      tap(response => {
        if (response.authenticated) {
          this.isAuthenticatedSubject.next(true);
        } else {
          this.isAuthenticatedSubject.next(false);
          this.clearAuthData();
        }
      }),
      catchError(error => {
        this.isAuthenticatedSubject.next(false);
        this.clearAuthData();
        throw error;
      })
    );
  }

  // ✅ Método público para verificar si está autenticado
  isAuthenticated(): Observable<boolean> {
    return this.checkAuthStatus();
  }

  // ✅ Obtener estado actual (síncrono)
  getCurrentAuthStatus(): boolean {
    return this.isAuthenticatedSubject.value;
  }

  private clearAuthData(): void {
    this.cookieService.clearAuthCookies();
    this.navItemsSubject.next([]);
    this.allowedRoutesSubject.next([]);
    localStorage.removeItem('user_navigation');
  }


}
