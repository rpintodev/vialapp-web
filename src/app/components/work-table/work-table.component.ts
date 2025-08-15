import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
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
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { IMovimiento } from 'src/app/models/movimiento';
import { UserTrasnsacctionsComponent } from '../user-trasnsacctions/user-trasnsacctions.component';
import { MovimientoService } from 'src/app/services/movimientos/movimiento.service';
import { calcularTotalRecibido,calcularTotalEntregado } from 'src/app/utils/movimientos-utils';

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

  constructor(
    private estadoService: EstadoService,
    private usuarioService: UsuarioService,
    private movimientoService: MovimientoService,
  ) {}

  private modalService = inject(NgbModal);

  selectedTab: string = '1';
  estados: any[];
  movimientos: IMovimiento[];
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
        this.applyFilter(this.selectedTab);
      },
      error: (error) => {

      }
    })
  }

  private loadData(){
    this.getAllEstados();
    this.getUsuariosByEstado();
  }

  public getTransacctions(turno: string) {
    this.movimientoService.getMovimientosByTurno(turno).subscribe({
      next: (data) => { 
        data.forEach(mov => {
          mov.totalRecibido = calcularTotalRecibido(mov).toString();
          mov.totalEntregado = calcularTotalEntregado(mov).toString();
        });
        this.openUserTransacction(data)
      },
      error: (err) => { console.error(err)}
    });
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

  private openUserTransacction(element: IMovimiento[]){
    const modalRef = this.modalService.open(UserTrasnsacctionsComponent, 
      { size: 'lg',
        centered: true,
        scrollable: true,
        ariaLabelledBy: 'modal-basic-title',
        backdrop: 'static',
      });

      
      modalRef.componentInstance.movimiento = element;
  }
}
