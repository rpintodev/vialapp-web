import { CommonModule } from '@angular/common';
import { Component, inject, Input, OnChanges, OnInit, SimpleChanges, ViewChild } from '@angular/core';
import { MatDialogModule } from '@angular/material/dialog';
import { MatInputModule } from '@angular/material/input';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { TablerIconsModule } from 'angular-tabler-icons';
import { PeajeMapper, RolMapper, UsuarioMapper } from 'src/app/mappers/model.mapper';
import { MaterialModule } from 'src/app/material.module';
import { IRol } from 'src/app/models/rol';
import { IUsuario } from 'src/app/models/usuario';
import { RolService } from 'src/app/services/rol/rol.service';
import { UsuarioService } from 'src/app/services/usuario/usuario.service';
import { UserDatailComponent } from '../user-datail/user-datail.component';
import { PeajeService } from 'src/app/services/peaje/peaje.service';
import { IPeaje } from 'src/app/models/peaje';

@Component({
  selector: 'app-user-table',
  imports: [
    MatPaginator, 
    MatInputModule,
    MaterialModule,
    CommonModule,
    MatDialogModule,
    TablerIconsModule,
  
  ],
  templateUrl: './user-table.component.html',
})
export class UserTableComponent implements OnInit,OnChanges {
  
  displayedColumns: string[] = ['nombre', 'usuario', 'rol', 'telefono', 'peaje','acciones'];
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @Input() userName: string;
  private modalService = inject(NgbModal);
  dataSource = new MatTableDataSource<IUsuario>();  
  rolSeleccionado: string='0';
  roles: IRol[];
  grupos: string[];
  peajes: IPeaje[];
  usuarios: IUsuario[];
  constructor(
    private rolService: RolService,
    private userService: UsuarioService,
    private peajeService: PeajeService,
  ){}

  applyFilter(idRol: number) {
     if (idRol === 0 ) {
      this.dataSource.filter = this.userName.toLocaleLowerCase();
      } else {
        this.dataSource.data = this.usuarios.filter(u => u.IdRol == idRol);
      }
  }

  getRoles(){
    this.rolService.getRoles().subscribe(response => {
      this.roles = response.map(RolMapper.fromDto);
    })
  }

  getGrupos(){
    this.userService.getGrupos().subscribe(response => {
      this.grupos = response;
    })
  }

  getPeajes(){
    this.peajeService.getPeajes().subscribe(response => {
      this.peajes = response.map(PeajeMapper.fromDto);
    })
  }

  getUsuarios(){
    this.userService.getUsuariosByPeaje().subscribe(response =>{
      this.usuarios = response;
      this.dataSource.data=this.usuarios;
      this.dataSource.paginator = this.paginator;
    }, error =>{
      console.error('Error al obtener usuarios:', error);
    })
  }

  setRolSeleccionado(event:any){
    this.rolSeleccionado = event.value;
    this.applyFilter(parseInt(this.rolSeleccionado));
  }

  

  async openUserDetail(element: IUsuario)  {
     
    const modalRef = this.modalService.open(UserDatailComponent,{
      size: 'lg',
      scrollable:true,
      centered: true,
      ariaLabelledBy: ' modal-basic-title',
      backdrop: 'static',
    })

    
    modalRef.componentInstance.detalle = element;
    modalRef.componentInstance.roles = this.roles;
    modalRef.componentInstance.peajes = this.peajes;
    modalRef.componentInstance.grupos = this.grupos;

    modalRef.componentInstance.usuarioGuardado.subscribe(() => {
      this.getUsuarios(); // <-- Aquí actualizas la tabla
    });
  }

  ngOnInit(): void {
    this.loadData();
  }

  loadData() {
    this.getRoles();
    this.getGrupos();
    this.getPeajes();
    this.getUsuarios();
  }

   ngOnChanges(changes: SimpleChanges): void {
    if (changes['userName']) {
      this.applyFilter(0);
    }
  }


}
