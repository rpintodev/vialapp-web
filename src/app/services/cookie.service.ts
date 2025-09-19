import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CookieService {

  constructor() { }

  // 🍪 LEER UNA COOKIE ESPECÍFICA
  getCookie(name: string): string | null {
    if (typeof document === 'undefined') {
      return null; // Para SSR
    }

    const nameEQ = name + "=";
    const ca = document.cookie.split(';');
    
    for (let i = 0; i < ca.length; i++) {
      let c = ca[i];
      while (c.charAt(0) === ' ') {
        c = c.substring(1, c.length);
      }
      if (c.indexOf(nameEQ) === 0) {
        return c.substring(nameEQ.length, c.length);
      }
    }
    return null;
  }

  // 🍪 CONFIGURAR UNA COOKIE (solo funciona si no es httpOnly)
  setCookie(name: string, value: string, days?: number): void {
    if (typeof document === 'undefined') {
      return; // Para SSR
    }

    let expires = "";
    if (days) {
      const date = new Date();
      date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
      expires = "; expires=" + date.toUTCString();
    }
    document.cookie = name + "=" + (value || "") + expires + "; path=/";
  }

  // 🍪 ELIMINAR UNA COOKIE
  deleteCookie(name: string): void {
    if (typeof document === 'undefined') {
      return; // Para SSR
    }
    
    document.cookie = name + '=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;';
  }

  // 🍪 VERIFICAR SI UNA COOKIE EXISTE
  hasCookie(name: string): boolean {
    return this.getCookie(name) !== null;
  }

  // 🍪 OBTENER TODAS LAS COOKIES
  getAllCookies(): { [key: string]: string } {
    if (typeof document === 'undefined') {
      return {}; // Para SSR
    }

    const cookies: { [key: string]: string } = {};
    const cookieArray = document.cookie.split(';');
    
    cookieArray.forEach(cookie => {
      const [name, value] = cookie.trim().split('=');
      if (name && value) {
        cookies[name] = value;
      }
    });
    
    return cookies;
  }

  // 🍪 OBTENER INFORMACIÓN DEL USUARIO DESDE COOKIES
  getUserInfo(): any {
    const userInfoCookie = this.getCookie('userInfo');
    if (userInfoCookie) {
      try {
        return JSON.parse(userInfoCookie);
      } catch (error) {
        console.error('Error parsing userInfo cookie:', error);
        return null;
      }
    }
    return null;
  }

  // 🍪 VERIFICAR SI EL USUARIO ESTÁ AUTENTICADO (basado en cookies)
  isAuthenticated(): boolean {

    return this.hasCookie('authtoken');
  }

  // 🍪 LIMPIAR COOKIES DE AUTENTICACIÓN
  clearAuthCookies(): void {
    this.deleteCookie('authtoken');
    this.deleteCookie('userInfo');
  }
}