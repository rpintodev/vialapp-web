import { ModalDismissReasons, NgbActiveModal, NgbDatepickerModule, NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { Component, inject, Input, signal, TemplateRef, WritableSignal } from '@angular/core';
import { I } from '@angular/cdk/a11y-module.d-DBHGyKoh';
import { IMovimiento } from 'src/app/models/movimiento';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-transaction-detail',
  imports: [NgbDatepickerModule,CommonModule],
  templateUrl: './transaction-detail.component.html',
})

export class TransactionDetailComponent {

  	private modalService = inject(NgbModal);
	closeResult: WritableSignal<string> = signal('');
	@Input() detalle!: any;
	showMoreDenominations = false;	
	constructor(public modal: NgbActiveModal) {}

	getDetalle():IMovimiento {
		return this.detalle;
	}

}
