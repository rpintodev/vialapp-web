import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { PermissionItem } from 'src/app/models/permissions';
import { CoreService } from '../core.service';
import { HttpClient } from '@angular/common/http';
import { Environment } from 'src/app/environment/environment';
import { NavItem } from 'src/app/layouts/full/sidebar/nav-item/nav-item';


@Injectable({
    providedIn: 'root',
})

export class PermissionsService{

    private readonly CACHE_KEY = 'user_permissions';

    private permissionsSubject = new BehaviorSubject<PermissionItem[]|null>(null);
    private permissions$ = this.permissionsSubject.asObservable();


    constructor(
        private http: HttpClient,
    ){}

    transformPermissionsToNavItems(permissions: PermissionItem[]): NavItem[] {
        
        if (!permissions || permissions.length === 0) {
            return this.getDefaultNavItems();
        }
        const separatorItems = permissions.filter(item => 
            item.ParentId === null && item.DisplayName === null
        );
        const parentItems = permissions.filter(item => 
            item.ParentId === null && item.DisplayName !== null
        );
        const childItems = permissions.filter(item => 
            item.ParentId !== null && item.DisplayName !== null
        );

        const navItems: NavItem[] = [];
        this.buildNavSections(navItems,separatorItems,parentItems,childItems);
        return navItems;
  }

    private buildNavSections(navItems: NavItem[],separators: PermissionItem[],parents: PermissionItem[],children: PermissionItem[]): void {
        // Ordenar todos los items por IdItem para mantener el orden
        const allItems = [...separators, ...parents].sort((a, b) => a.IdItem - b.IdItem);
        let currentSection: string | null = null;
        let pendingItems: PermissionItem[] = [];

        allItems.forEach((item, index) => {
            if (item.DisplayName === null) {
                if (pendingItems.length > 0) {
                    this.addItemsToSection(navItems, currentSection, pendingItems, children);
                    pendingItems = [];
                }
                currentSection = this.getSectionName(item, index);
            } else {
                // Es un item padre, agregarlo a items pendientes
                pendingItems.push(item);
            }
        });

        // Agregar items pendientes de la última sección
        if (pendingItems.length > 0) {
            this.addItemsToSection(navItems, currentSection, pendingItems, children);
        }
    }
    private addItemsToSection(navItems: NavItem[], sectionName: string | null, items: PermissionItem[], allChildren: PermissionItem[]): void { 
        // Agregar navCap si hay nombre de sección
        if (sectionName) {
            navItems.push({
                navCap: sectionName
            });
        }
        // Agregar items de esta sección
        items.forEach(parent => {
            const children = allChildren.filter(child => child.ParentId === parent.IdItem);

            if (children.length > 0) {
                // Item padre con hijos
                navItems.push({
                    displayName: parent.DisplayName!,
                    iconName: parent.IconName || 'folder',
                    route: parent.Route || '', // Usar ruta del padre si existe
                    children: children.map(child => ({
                        displayName: child.DisplayName!,
                        iconName: child.IconName || 'point',
                        route: child.Route!,
                        chip: this.shouldShowChip(child),
                        chipClass: this.getChipClass(child)
                    }))
                });
            } else {
                // Item padre sin hijos (ruta directa)
                navItems.push({
                    displayName: parent.DisplayName!,
                    iconName: parent.IconName || 'circle',
                    route: parent.Route || '#'
                });
            }
        });
    }

    private getSectionName(separatorItem: PermissionItem, index: number): string {
        
        switch (separatorItem.IdItem) {
            case 1:
                return 'Home';
            case 3:
                return 'Apps';
            case 8:
                return 'Reportes';
            case 12:
                return 'Settings';
            default:
                return index === 0 ? 'Home' : 'Menu';
        }
    }

   //Determina si mostrar chip en el item
    private shouldShowChip(item: PermissionItem): boolean {
        return false; // Por defecto no mostrar chip
    }

  //Obtiene la clase CSS para el chip
  private getChipClass(item: PermissionItem): string {
    // Puedes personalizar esto según tus necesidades
    return 'bg-light-primary text-primary';
  }

  //NavItems por defecto si no hay permisos
  private getDefaultNavItems(): NavItem[] {
    return [
      {
        navCap: 'Home',
      },
      {
        displayName: 'Dashboard',
        iconName: 'layout-grid-add',
        route: '/authentication/error'
      }
    ];
  }

  //Obtener rutas permitidas de los permisos
  getAllowedRoutes(permissions: PermissionItem[]): string[] {
    if (!permissions) return ['/dashboard'];

    const routes = permissions
      .filter(item => item.Route !== null && item.Route !== '')
      .map(item => item.Route!)
      .filter(route => route !== null);

    // Agregar rutas base para items con hijos
    const parentRoutes = permissions
      .filter(item => item.ParentId === null && item.Route)
      .map(item => `${item.Route}/*`); // Permitir subrutas

    return [...routes, ...parentRoutes, '/dashboard']; // Siempre incluir dashboard
  }


}