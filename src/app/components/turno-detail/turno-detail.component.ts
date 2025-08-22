import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgbActiveModal, NgbModalModule } from '@ng-bootstrap/ng-bootstrap';
import { TablerIconComponent, TablerIconsModule } from 'angular-tabler-icons';
import { ToastrService } from 'ngx-toastr';
import { navItems } from 'src/app/layouts/full/sidebar/sidebar-data';
import { TurnoMapper } from 'src/app/mappers/model.mapper';
import { ITurno } from 'src/app/models/turno';
import { RoutesService } from 'src/app/services/routes/routes.service';
import { TurnoService } from 'src/app/services/turno/turno.service';

@Component({
  selector: 'app-turno-detail',
  imports: [
    CommonModule,
    ReactiveFormsModule,
    NgbModalModule,
    TablerIconsModule
  ],
  templateUrl: './turno-detail.component.html',
})
export class TurnoDetailComponent implements OnInit {
    @Input() turno: ITurno;
    @Input() estados: any[];
    @Output() turnoGuardado = new EventEmitter<void>();
    
    formturnoDetail!: FormGroup;
    constructor(
      public modal: NgbActiveModal,
      private turnoService: TurnoService,
      public toastr: ToastrService, 
      private router: Router,
    ) {}

    ngOnInit(): void {
      this.initForm();
    }

    private initForm(){
      this.formturnoDetail = new FormGroup({
        via: new FormControl(this.turno?.via || '', Validators.required),
        turno: new FormControl(this.turno?.turno || '', Validators.required),
        estado: new FormControl(this.turno?.estado || '', Validators.required),
      });
    }
  
    validateForm(){
      if (this.formturnoDetail.valid) {
        const updatedTurno: ITurno = {
          ...this.turno,
          ...this.formturnoDetail.value
        };
        this.updateTurno(TurnoMapper.toDto(updatedTurno));
      }else{
        this.formturnoDetail.markAllAsTouched();
      }
    }

    private updateTurno(turno:any){
      this.turnoService.updateTurno(turno).subscribe({
        next: (response) => this.handleSuccess(),
        error: (error) => {
          console.error('Error updating turno:', error);
        }
      });
    }
    
    private handleSuccess(){
      this.modal.close(this.turno);
      this.toastr.success('Turno actualizado con éxito', 'Éxito', { timeOut: 3000 });
      this.router.navigate([RoutesService.ROUTES.SETTINGS.APP_SETTINGS]);
      this.turnoGuardado.emit();
    }
} 
