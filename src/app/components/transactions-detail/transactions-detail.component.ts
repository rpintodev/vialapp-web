import { R } from '@angular/cdk/overlay.d-BdoMy0hX';
import { CommonModule } from '@angular/common';
import { Component, inject, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { TablerIconsModule } from 'angular-tabler-icons';
import { IMovimiento } from 'src/app/models/movimiento';

@Component({
  selector: 'app-transactions-detail',
  imports: [
    CommonModule,
    ReactiveFormsModule,
    TablerIconsModule,
  ],
  templateUrl: './transactions-detail.component.html',
})
export class TransactionsDetailComponent implements OnInit {
  @Input() transaccion: IMovimiento;
  formTransactionDetail!: FormGroup;

  constructor(public modal: NgbActiveModal) {}

  showDenominacionesAdicionales = false;

  toggleDenominacionesAdicionales() {
    this.showDenominacionesAdicionales = !this.showDenominacionesAdicionales;
  }

   hasErrors(controlName: string, errorName: string){
    const control = this.formTransactionDetail.get(controlName);
    return control?.hasError(errorName) && control?.touched;
  }

   private initForm(){
        this.formTransactionDetail = new FormGroup({
          via: new FormControl(this.transaccion?.via || '', [Validators.required, Validators.pattern('^[0-9]+$')]),
          turno: new FormControl(this.transaccion?.turno || '', [Validators.required, Validators.pattern('^[0-9]+$')]),
          estado: new FormControl(this.transaccion?.estado || '',[Validators.required, Validators.pattern('^[0-9]+$')]),
          recibe20d: new FormControl(this.transaccion?.recibe20d || '', [Validators.required, Validators.pattern('^[0-9]+$')]),
          recibe10d: new FormControl(this.transaccion?.recibe10d || '', [Validators.required, Validators.pattern('^[0-9]+$')]),
          recibe5d: new FormControl(this.transaccion?.recibe5d || '', [Validators.required, Validators.pattern('^[0-9]+$')]),
          recibe1d: new FormControl(this.transaccion?.recibe1d || '', [Validators.required, Validators.pattern('^[0-9]+$')]),
          recibe50c: new FormControl(this.transaccion?.recibe50c || '', [Validators.required, Validators.pattern('^[0-9]+$')]),
          recibe25c: new FormControl(this.transaccion?.recibe25c || '', [Validators.required, Validators.pattern('^[0-9]+$')]),
          recibe10c: new FormControl(this.transaccion?.recibe10c || '', [Validators.required, Validators.pattern('^[0-9]+$')]),
          recibe5c: new FormControl(this.transaccion?.recibe5c || '', [Validators.required, Validators.pattern('^[0-9]+$')]),
          recibe1c: new FormControl(this.transaccion?.recibe1c || '', [Validators.required, Validators.pattern('^[0-9]+$')]),
          entrega20d: new FormControl(this.transaccion?.entrega20d || '', [Validators.required, Validators.pattern('^[0-9]+$')]),
          entrega10d: new FormControl(this.transaccion?.entrega10d || '', [Validators.required, Validators.pattern('^[0-9]+$')]),
          entrega5d: new FormControl(this.transaccion?.entrega5d || '', [Validators.required, Validators.pattern('^[0-9]+$')]),
          entrega1d: new FormControl(this.transaccion?.entrega1d || '', [Validators.required, Validators.pattern('^[0-9]+$')]),
          entrega50c: new FormControl(this.transaccion?.entrega50c || '', [Validators.required, Validators.pattern('^[0-9]+$')]),
          entrega25c: new FormControl(this.transaccion?.entrega25c || '', [Validators.required, Validators.pattern('^[0-9]+$')]),
          entrega10c: new FormControl(this.transaccion?.entrega10c || '', [Validators.required, Validators.pattern('^[0-9]+$')]),
          entrega5c: new FormControl(this.transaccion?.entrega5c || '', [Validators.required, Validators.pattern('^[0-9]+$')]),
          entrega1c: new FormControl(this.transaccion?.entrega1c || '', [Validators.required, Validators.pattern('^[0-9]+$')]),
        });
      }
    
  validateForm(){

  }

  ngOnInit() {
    this.initForm();
  }
}
