import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { MatDialogModule } from '@angular/material/dialog';
import { MatInputModule } from '@angular/material/input';
import { MatPaginator } from '@angular/material/paginator';
import { TablerIconsModule } from 'angular-tabler-icons';
import { MaterialModule } from 'src/app/material.module';
import { EstadoService } from 'src/app/services/estado/estado.service';
import { OnInit } from '@angular/core';
import { UsuarioService } from 'src/app/services/usuario/usuario.service';
import { MatTableDataSource } from '@angular/material/table';
import { IUsuario } from 'src/app/models/usuario';
@Component({
  selector: 'app-work-table',
  imports: [
    MatPaginator, 
    MatInputModule,
    MaterialModule,
    CommonModule,
    MatDialogModule,
    TablerIconsModule,
  ],
  templateUrl: './work-table.component.html',
})
export class WorkTableComponent implements OnInit {

  constructor(private estadoService: EstadoService,private usuarioService: UsuarioService)  {}

  selectedTab: string = '1';
  estados: any[];
  dataSource = new MatTableDataSource<IUsuario>();
  usuarios: IUsuario[] = [];
  displayedColumns: string[]= ['nombre', 'via','fecha', 'turno', 'grupo','acciones'];

  
  private getAllEstados(){
    this.estadoService.getEstados().subscribe({
      next: (data)=>{ 
        this.estados = data;
      },
      error: (error) => {
        console.error('Error fetching estados:', error);
      },
    });
  }

  private getUsuariosByEstado(){
    this.usuarioService.getByEstadoTurno().subscribe({
      next: (data)=>{
        this.usuarios= data; 
        this.dataSource.data = this.usuarios;
        this.applyFilter(this.selectedTab); // <-- Aplica el filtro aquí, después de cargar los datos
      },
      error: (error) => {
        console.error('Error fetching usuarios by estado:', error);
      }
    })
  }


  private loadData(){
    this.getAllEstados();
    this.getUsuariosByEstado();
  
  }

  applyFilter(estado:string) {
    this.dataSource.data = this.usuarios.filter(u => u.Estado == estado);
  }

  setTab(tab: string) {
    this.selectedTab = tab;
    this.applyFilter(tab);
  }

  ngOnInit(): void {
    this.loadData();
  } 
}
