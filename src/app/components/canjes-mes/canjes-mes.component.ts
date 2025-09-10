import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from 'src/app/material.module';
import { TablerIconsModule } from 'angular-tabler-icons';
import { MovimientoService } from 'src/app/services/movimientos/movimiento.service';
import { IMovimiento } from 'src/app/models/movimiento';
import { calcularTotalEntregado, calcularTotalRecibido } from 'src/app/utils/movimientos-utils';


@Component({
  selector: 'app-canjes-mes',
  standalone: true,
  imports: [
    CommonModule,
    MaterialModule,
    TablerIconsModule
  ],
  templateUrl: './canjes-mes.component.html',
  styles: [`
    .max-height-200 {
      max-height: 200px;
    }
  `]
})
export class CanjesMesComponent implements OnInit {

    canjes:IMovimiento[];
    movimientos:IMovimiento[];
    ultimoCanje:IMovimiento | null = null;
    totalCanjesMes:number = 0;

    constructor(private movimientoService:MovimientoService){}

  ngOnInit() {
    this.getCanjesMes();
  }

  private getCanjesMes(): void {
    this.movimientoService.getUltimosCanjes().subscribe({
      next: (data) => {
        this.movimientos = data.map(canje => ({
          totalEntregado: calcularTotalEntregado(canje),
          totalRecibido: calcularTotalRecibido(canje),
          ...canje
        }));
        this.canjes = this.movimientos.filter(movimiento => parseInt(movimiento.totalRecibido ?? '0') > 0);
        this.getUltimoCanje(this.canjes);
      },
      error: (error) => {
        console.error('Error al obtener los canjes del mes', error);
      }
    });
  }

  private getUltimoCanje(canjes: IMovimiento[]): void {
    this.ultimoCanje = canjes[0];
  }

  getIconByEstado(estado: string): string {
    switch (estado) {
      case 'completado': return 'check-circle';
      case 'procesando': return 'clock';
      case 'pendiente': return 'hourglass';
      default: return 'question-mark';
    }
  }

  getEstadoTexto(estado: string): string {
    switch (estado) {
      case 'completado': return 'Completado';
      case 'procesando': return 'Procesando';
      case 'pendiente': return 'Pendiente';
      default: return 'Desconocido';
    }
  }

}
