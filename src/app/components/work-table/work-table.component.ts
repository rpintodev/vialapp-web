import { CommonModule } from '@angular/common';
import { Component, inject, Input, ViewChild } from '@angular/core';
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
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { ITurno } from 'src/app/models/turno';
import { TurnoService } from 'src/app/services/turno/turno.service';
import { TurnoDetailComponent } from '../turno-detail/turno-detail.component';

@Component({
  selector: 'app-work-table',
  imports: [
    MatPaginator, 
    MatInputModule,
    MaterialModule,
    CommonModule,
    MatDialogModule,
    MatButtonModule,
    MatIconModule,
    TablerIconsModule,
  ],
  templateUrl: './work-table.component.html',
})
export class WorkTableComponent implements OnInit {

  constructor(
    private estadoService: EstadoService,
    private usuarioService: UsuarioService,
    private turnoService: TurnoService,
    private movimientoService: MovimientoService,
  ) {}

  private modalService = inject(NgbModal);

  @Input() isSettings: boolean;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  
  selectedTab: string = '1';
  estados: any[];
  movimientos: IMovimiento[];
  dataSource = new MatTableDataSource<ITurno>();
  usuariosTurno: ITurno[] = [];
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

  private handleSuccess(response: any[]){
    this.usuariosTurno= response; 
    this.dataSource.data = this.usuariosTurno;
    setTimeout(() => {
      this.dataSource.paginator = this.paginator;
      this.applyFilter(this.selectedTab);
    });
  }

  private getUsuariosByEstado(){
    this.turnoService.getAll().subscribe({
      next: (data)=>{this.handleSuccess(data)},
      error: (error) => {console.error('Error fetching usuarios:', error);
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
    this.dataSource.data = this.usuariosTurno.filter(u => u.estado == estado);
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
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

  openTurnoDetail(turno: ITurno){
    const modalRef = this.modalService.open(TurnoDetailComponent, {
      size: 'lg',
      centered: true,
      scrollable: true,
      ariaLabelledBy: 'modal-basic-title',
      backdrop: 'static',
    });

    modalRef.componentInstance.turno = turno;
    modalRef.componentInstance.estados = this.estados;
    modalRef.componentInstance.turnoGuardado.subscribe(() => {
      this.loadData(); // <-- Aquí actualizas la tabla
    });
  }
}
