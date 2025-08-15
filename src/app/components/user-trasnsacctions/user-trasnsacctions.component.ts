import { Component, Input, OnInit } from '@angular/core';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { IMovimiento } from 'src/app/models/movimiento';
import { MatCard } from "@angular/material/card";
import { CommonModule } from '@angular/common';
import { MaterialModule } from "src/app/material.module";
import { TablerIconsModule } from "angular-tabler-icons";
import { trigger, state, style, transition, animate } from '@angular/animations';


@Component({
  selector: 'app-user-trasnsacctions',
  imports: [CommonModule, MatCard, MaterialModule, TablerIconsModule],
  templateUrl: './user-trasnsacctions.component.html',
  animations: [
    trigger('expandCollapse', [
      state('collapsed', style({
        height: '0px',
        paddingTop: '0',
        paddingBottom: '0',
        opacity: '0'
      })),
      state('expanded', style({
        height: '*',
        paddingTop: '16px',
        paddingBottom: '16px',
        opacity: '1'
      })),
      transition('expanded <=> collapsed', animate('200ms ease-in-out'))
    ])
  ]
})
export class UserTrasnsacctionsComponent implements OnInit{
    @Input() movimiento: any[] = [];

    constructor(public modal: NgbActiveModal) {}


  getTransactionType(id: string): string {
    const types: Record<string, string> = {
      '1': 'Apertura',
      '2': 'Retiro Parcial',
      '3': 'Canje',
      '4': 'Liquidación'
    };
    return types[id] || 'Desconocido';
  }

  getIconByType(id: string): string {
    const icons: Record<string, string> = {
      '1': 'box',          // Apertura
      '2': 'arrow-left',   // Retiro
      '3': 'repeat',       // Canje
      '4': 'check'         // Liquidación
    };
    return icons[id] || 'question-mark';
  }

  toggleDetails(transaction: any) {
    transaction.expanded = !transaction.expanded;
    if (!transaction.expanded && transaction.editing) {
      transaction.editing = false;
    }
  }

  editTransaction(transaction: any) {
    transaction.expanded = true; 
    transaction.editing = !transaction.editing;
  }

  ngOnInit() {
    console.log(this.movimiento);
  }

}
