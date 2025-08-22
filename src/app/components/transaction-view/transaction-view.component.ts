import { ModalDismissReasons, NgbActiveModal, NgbDatepickerModule, NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { Component, inject, Input, OnInit, signal, TemplateRef, WritableSignal } from '@angular/core';
import { IMovimiento } from 'src/app/models/movimiento';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-transaction-view',
  imports: [NgbDatepickerModule,CommonModule],
  templateUrl: './transaction-view.component.html',
})

export class TransactionViewComponent {

  	private modalService = inject(NgbModal);
	closeResult: WritableSignal<string> = signal('');
	@Input() detalle!: any;
	showMoreDenominations = false;	
	constructor(public modal: NgbActiveModal) {}

	

}
