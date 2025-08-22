import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from 'src/app/material.module';
import { TablerIconsModule } from 'angular-tabler-icons';
import { MovimientoService } from 'src/app/services/movimientos/movimiento.service';
import { IMovimiento } from 'src/app/models/movimiento';
import { calcularTotalEntregado, calcularTotalRecibido } from 'src/app/utils/movimientos-utils';
import { DateUtils } from 'src/app/utils/date.utils';
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-ultimo-deposito',
  standalone: true,
  imports: [
    CommonModule,
    MaterialModule,
    TablerIconsModule
  ],
  templateUrl: './ultimo-deposito.component.html'
})

export class UltimoDepositoComponent implements OnInit, OnDestroy {
    private readonly destroy$ = new Subject<void>();
    
    // Propiedades tipadas para datos de depósitos
    depositos: IMovimiento[] = [];
    ultimoDeposito: IMovimiento | null = null;
    depositosAnteriores: IMovimiento[] = [];
    
    montoAnterior: string = '0';
    montoTotal: string = '0';
    montoTurno: string = '0';
    fechaUltimoDeposito: string = 'Sin depósitos';
    turno: string = 'Sin turno';
    estado: string = 'Pendiente';
    
    // Constantes del componente
    readonly bancoDestino: string = 'Banco del Pacifico';
    readonly fechaAnterior: Date = new Date(new Date().setDate(new Date().getDate() - 1));
    
    // Propiedades temporales (deberían venir del servicio en el futuro)
    recaudadoHoy: number = 8750.50;
    totalMes: number = 185430.75;
    referenciaTransaccion: string = 'TXN-240821-001';
    
    constructor(private readonly movimientoService: MovimientoService) { }

    private getUltimosDepositos(): void { 
        this.movimientoService.getUltimosDepositos()
            .pipe(takeUntil(this.destroy$))
            .subscribe({
                next: (data) => this.handleSuccess(data),
                error: (error) => this.handleError('Error al obtener últimos depósitos', error)
            });
    }

    private getDepositoAnterior(): void {
        this.movimientoService.getMovimientosReporteRetiros(this.fechaAnterior)
            .pipe(takeUntil(this.destroy$))
            .subscribe({
                next: (data) => this.processDepositosAnteriores(data),
                error: (error) => this.handleError('Error al obtener depósito anterior', error)
            });
    }

    // Procesa los depósitos anteriores y calcula el monto anterior
    private processDepositosAnteriores(data: IMovimiento[]): void {
        const tiposMovimientoValidos = ['2', '4', '6'];
        this.depositosAnteriores = data.filter(response => 
            tiposMovimientoValidos.includes(response.idTipoMovimiento || '')
        );
        
        this.montoAnterior = this.depositosAnteriores.length > 0 
            ? (calcularTotalRecibido(this.depositosAnteriores) - calcularTotalEntregado(this.depositosAnteriores)).toString()
            : '0';
    }


    // Maneja errores de forma centralizada
    private handleError(message: string, error: any): void {
        console.error(message, error);
    }

    private handleSuccess(data: IMovimiento[]): void {
        console.log('Data recibida:', data);
        
        this.processDepositos(data);
        this.setUltimoDeposito();
        this.calculateMontos();
        this.setDisplayProperties();
    }

    //  Filtra y procesa los depósitos válidos
    private processDepositos(data: IMovimiento[]): void {
        this.depositos = data.filter(response => calcularTotalRecibido(response) === 0);
    }

    
    private setUltimoDeposito(): void {
        this.ultimoDeposito = this.depositos.length > 0 
            ? this.depositos[this.depositos.length - 1] 
            : null;
    }

    private calculateMontos(): void {
        this.montoTurno = this.ultimoDeposito 
            ? calcularTotalEntregado(this.ultimoDeposito).toString() 
            : '0';
            
        this.montoTotal = this.depositos.length > 0 
            ? calcularTotalEntregado(this.depositos).toString() 
            : '0';
    }

    private setDisplayProperties(): void {
        this.fechaUltimoDeposito = this.ultimoDeposito
            ? DateUtils.formatearFechaDeposito(this.ultimoDeposito.fecha)
            : 'Sin depósitos';
            
        this.turno = this.ultimoDeposito
            ? this.ultimoDeposito.turno || 'Sin turno'
            : 'Sin turno';
            
        this.estado = this.montoTotal === '0' ? 'Pendiente' : 'Empaquetado';
    }
    
    ngOnInit(): void {
        this.loadData();
    }

    ngOnDestroy(): void {
        this.destroy$.next();
        this.destroy$.complete();
    }

    private loadData(): void {
        this.getUltimosDepositos();
        this.getDepositoAnterior(); 
    }

}
