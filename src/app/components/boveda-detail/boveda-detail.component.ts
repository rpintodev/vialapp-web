import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Form, FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { NgbActiveModal, NgbModalModule } from '@ng-bootstrap/ng-bootstrap';
import { TablerIconsModule } from 'angular-tabler-icons';
import { IBoveda } from 'src/app/models/boveda';
import { ToastrService } from 'ngx-toastr';
import { BovedaService } from 'src/app/services/boveda/boveda.service';

@Component({
  selector: 'app-boveda-detail',
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    NgbModalModule,
    TablerIconsModule,
  ],
  templateUrl: './boveda-detail.component.html',
})
export class BovedaDetailComponent implements OnInit {
  @Input() boveda: IBoveda;
  FormBovedaModify!: FormGroup
  @Output() bovedaActualizada = new EventEmitter<void>();

  constructor(
    public modal: NgbActiveModal, 
    public toastr: ToastrService, 
    public bovedaService: BovedaService,
    
  ) { }

  initForm(){
    this.FormBovedaModify = new FormGroup({
      billete20: new FormControl(this.boveda.billete20,[Validators.required,Validators.min(0), Validators.pattern('^[0-9]+$')]),
      billete10: new FormControl(this.boveda.billete10,[Validators.required,Validators.min(0), Validators.pattern('^[0-9]+$')]),
      billete5: new FormControl(this.boveda.billete5,[Validators.required,Validators.min(0), Validators.pattern('^[0-9]+$')]),
      moneda1d: new FormControl(this.boveda.moneda1,[Validators.required,Validators.min(0), Validators.pattern('^[0-9]+$')]),
      moneda05: new FormControl(this.boveda.moneda05,[Validators.required,Validators.min(0), Validators.pattern('^[0-9]+$')]),
      moneda025: new FormControl(this.boveda.moneda025,[Validators.required,Validators.min(0), Validators.pattern('^[0-9]+$')]),
      moneda01: new FormControl(this.boveda.moneda01,[Validators.required,Validators.min(0), Validators.pattern('^[0-9]+$')]),
      moneda005: new FormControl(this.boveda.moneda005,[Validators.required,Validators.min(0), Validators.pattern('^[0-9]+$')]),
      moneda001: new FormControl(this.boveda.moneda001,[Validators.required,Validators.min(0), Validators.pattern('^[0-9]+$')]),
      observacion: new FormControl(this.boveda.observacion,[]),
    });
  }

  hasErrors(controlName: string, errorName: string){
    const control = this.FormBovedaModify.get(controlName);
    return control?.hasError(errorName) && control?.touched;
  }

  submit() {
    if (this.FormBovedaModify.valid) {
      const updatedBoveda: IBoveda = {
        ...this.boveda,
        ...this.FormBovedaModify.value
      };
      this.updateBoveda(updatedBoveda);
    }else{
      this.FormBovedaModify.markAllAsTouched();
    }
  }

  private updateBoveda(boveda:IBoveda){
    this.bovedaService.updateBoveda(boveda).subscribe({
      next:()=>{ this.handleUpdateSucess(); },
      error:(error)=>{ console.error('Error updating boveda details:', error)}
    });
  }

  private handleUpdateSucess(){
    this.toastr.success('Boveda actualiazada con éxito');
    this.modal.close('updated');
    this.bovedaActualizada.emit();

  }

  ngOnInit() {
    this.initForm();
  }
}
