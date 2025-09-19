
export interface PermissionItem {
  IdItem: number;
  ParentId: number | null;
  DisplayName: string | null;
  IconName: string | null;
  Route: string | null;
  [key: string]: any; // Para otras propiedades que puedas tener
}
