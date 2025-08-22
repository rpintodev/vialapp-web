import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from 'src/app/material.module';
import { TablerIconsModule } from 'angular-tabler-icons';
import { MovimientoService } from 'src/app/services/movimientos/movimiento.service';
import { IMovimiento } from 'src/app/models/movimiento';

interface CanjeDelMes {
  id: string;
  fecha: string;
  monto: number;
  estado: 'completado' | 'pendiente' | 'procesando';
  referencia: string;
}

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

    ultimosDepositos:IMovimiento[];
    totalCanjes = 8;
    promedio = 12000;
    montoTotal = 12000.00;
    fechaUltimoCanje = '15 Ago 2024 - 2:30 PM';
    proximoCanje = '22 Ago 2024';

  denominaciones = {
    billete10: 180, // $1,800
    billete5: 1240, // $6,200  
    moneda1: 4000   // $4,000
    // Total: $12,000
  };
  canjesRecientes: CanjeDelMes[] = [
    {
      id: '1',
      fecha: '21 Ago',
      monto: 12000,
      estado: 'completado',
      referencia: 'CNJ-001'
    },
    {
      id: '2',
      fecha: '18 Ago',
      monto: 11500,
      estado: 'completado',
      referencia: 'CNJ-002'
    },
    {
      id: '3',
      fecha: '15 Ago',
      monto: 12500,
      estado: 'completado',
      referencia: 'CNJ-003'
    },
    {
      id: '4',
      fecha: '12 Ago',
      monto: 12200,
      estado: 'procesando',
      referencia: 'CNJ-004'
    },
    {
      id: '5',
      fecha: '09 Ago',
      monto: 11800,
      estado: 'completado',
      referencia: 'CNJ-005'
    }
  ];

    ngOnInit() {
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
