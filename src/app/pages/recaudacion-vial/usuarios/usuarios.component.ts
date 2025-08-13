import { Component, ViewChild } from '@angular/core';
import { BannerUsersComponent } from 'src/app/components/banner/banner-users/banner-users.component';
import { SearchUsersComponent } from 'src/app/components/search-users/search-users.component';
import { UserTableComponent } from 'src/app/components/user-table/user-table.component';
import { IUsuario } from 'src/app/models/usuario';

@Component({
  selector: 'app-usuarios',
  imports: [BannerUsersComponent,SearchUsersComponent,UserTableComponent],
  templateUrl: './usuarios.component.html',

})
export class UsuariosComponent {
  @ViewChild('userTable') userTable: UserTableComponent;
    public filterValue: string;

  onOpenUserModal(element:IUsuario){
    this.userTable.openUserDetail(element)
  }

}
