import { CommonModule } from '@angular/common';
import { Component, Output,EventEmitter } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInput } from '@angular/material/input';
import { TablerIconsModule } from 'angular-tabler-icons';
import { MaterialModule } from 'src/app/material.module';
import { IUsuario } from 'src/app/models/usuario';

@Component({
  selector: 'app-search-users',
  imports: [MatFormFieldModule,MatCardModule,MatInput,MaterialModule, CommonModule,TablerIconsModule],
  templateUrl: './search-users.component.html',
})
export class SearchUsersComponent {

  usuario:IUsuario;

  @Output() filterApplied = new EventEmitter<string>();
  // This method will emit a signal to open the modal parner
  @Output() openModal = new EventEmitter<IUsuario>();

  OpenModal(usuario:IUsuario){
    this.openModal.emit(usuario);
  }

  applyFilter(event:any){
    const filterValue = (event.target as HTMLInputElement).value;
    this.filterApplied.emit(filterValue);
  }
}
