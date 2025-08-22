import { Component, inject, OnInit, ViewChild, AfterViewInit, Input } from '@angular/core';
import { NgApexchartsModule } from 'ng-apexcharts';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { calcularTotalEntregado, calcularTotalRecibido, formatCurrency} from 'src/app/utils/movimientos-utils';
import { TablerIconsModule } from 'angular-tabler-icons';
import { CommonModule } from '@angular/common';
import { MaterialModule } from 'src/app/material.module';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatInputModule } from '@angular/material/input';
import { provideNativeDateAdapter } from '@angular/material/core';
import { ITipoMovimiento } from 'src/app/models/tipoMovimiento';
import { TipoMovimientoService } from 'src/app/services/tipo-movimiento/tipo-movimiento.service';
import * as moment from 'moment';
import { MovimientoService } from 'src/app/services/movimientos/movimiento.service';
import { IMovimiento } from 'src/app/models/movimiento';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import {MatDialogModule } from '@angular/material/dialog';
import { TransactionViewComponent } from '../transaction-view/transaction-view.component';
import { MovimientoMapper } from 'src/app/mappers/model.mapper';
import { TransactionsDetailComponent } from '../transactions-detail/transactions-detail.component';

@Component({
  selector: 'app-transactions-performance',
  imports: [
    NgApexchartsModule,
    MatPaginator,
    MatDatepickerModule,
    MatInputModule,
    MaterialModule,
    TablerIconsModule,
    CommonModule,
    MatDialogModule,
  ],
  templateUrl: './transactions-performance.component.html',
  providers: [provideNativeDateAdapter()],
})
export class AppTransactionPerformanceComponent implements OnInit, AfterViewInit {

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  private modalService = inject(NgbModal);
  @Input() isSettings: boolean;
  constructor(
    private tipoMovimientoService:TipoMovimientoService,
    private movimientoService:MovimientoService,
  
  ){}

  displayedColumns: string[] = ['supervisor', 'cajero', 'tipoMovimiento', 'fecha', 'monto', 'via','acciones'];
  dataSource = new MatTableDataSource<IMovimiento>();  
  tipoMovimiento:ITipoMovimiento[];
  tipomovimientoSeleccionado: string = '0'; // Valor por defecto para "Todos"
  fechaSeleccionada: Date = new Date();
  totalRecibido: number = 0;
  totalEntregado: number = 0;

 
  openTransactionView(element: IMovimiento) {
    const modalRef = this.modalService.open(TransactionViewComponent, {
      size: 'md',
      scrollable: true,
      centered: true,
      ariaLabelledBy: 'modal-basic-title',
      backdrop: 'static',
        
    });
     modalRef.componentInstance.detalle = element;
  }

  openTransactionDetail(element: IMovimiento) {
    const modalRef = this.modalService.open(TransactionsDetailComponent, {
      size: 'lg',
      scrollable: true,
      centered: true,
      ariaLabelledBy: 'modal-basic-title',
      backdrop: 'static',
    });
    modalRef.componentInstance.transaccion = element;
  }

  getTiposMovimiento() {
    this.tipoMovimientoService.getAll().subscribe(response => {
      this.tipoMovimiento = response.data.map(d => ({ id: d.Id , nombre: d.Nombre }));
      this.tipoMovimiento.unshift({ id: 0, nombre: 'Todos' }); 
    }, error => { 
      console.error('Error al obtener los tipos de movimiento:', error);
    });
  }

  getByDateAndTipoMovimiento(fechaT: string, idTipoMovimiento: string) {
    const fechaString = moment(fechaT).format('YYYY-MM-DD');
    this.movimientoService.getByDateAndTipoMovimiento(fechaString, idTipoMovimiento).subscribe(response => {
      const mappedData: IMovimiento[] = response.map(d => ({
        totalRecibido: formatCurrency(calcularTotalRecibido(d)),
        totalEntregado:formatCurrency(calcularTotalEntregado(d)),
        ...d 
      }));
      this.dataSource.data = mappedData;
      setTimeout(() => {
        if (this.paginator) {
          this.dataSource.paginator = this.paginator;
        }
      });
    }, error => {
      console.error('Error al obtener los movimientos:', error);
      });
  }

  setTipoMovimientoSeleccionado(event: any) {
    this.tipomovimientoSeleccionado = event.value.toString();
    this.getByDateAndTipoMovimiento(this.fechaSeleccionada.toString(), this.tipomovimientoSeleccionado);
  }

  onFechaChange(event: any) {
    this.getByDateAndTipoMovimiento(event.value, this.tipomovimientoSeleccionado);
  }

  ngOnInit(): void {
    this.getTiposMovimiento();
    this.getByDateAndTipoMovimiento(this.fechaSeleccionada.toString(), this.tipomovimientoSeleccionado);
  }

  ngAfterViewInit(): void {
    // Asegurar que el paginator esté configurado después de que la vista esté inicializada
    if (this.dataSource.data.length > 0) {
      this.dataSource.paginator = this.paginator;
    }
  }
}
