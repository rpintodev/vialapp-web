import { CommonModule } from '@angular/common';
import { TablerIconsModule } from 'angular-tabler-icons';
import { FormGroup, FormControl, Validators,FormsModule, ReactiveFormsModule, ValidatorFn, AbstractControl } from '@angular/forms';
import { Component, signal,Input, inject, WritableSignal, OnInit, Output, EventEmitter } from '@angular/core';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { IUsuario } from 'src/app/models/usuario';
import { IRol } from 'src/app/models/rol';
import { IPeaje } from 'src/app/models/peaje';
import { MaterialModule } from 'src/app/material.module';
import {ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { UsuarioService } from 'src/app/services/usuario/usuario.service';
import { RoutesService } from 'src/app/services/routes/routes.service';


@Component({
  selector: 'app-user-datail',
  imports: [
    CommonModule,
    TablerIconsModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  templateUrl: './user-datail.component.html',
})
export class UserDatailComponent implements OnInit{

  formUserDetail!: FormGroup;
  closeResult: WritableSignal<string>=signal('');
  usuario: any;
  @Input() detalle?:IUsuario;
  @Input() roles: IRol[];
  @Input() peajes: IPeaje[];
  @Input() grupos: any[];
  @Output() usuarioGuardado = new EventEmitter<void>();

  constructor(
    public modal: NgbActiveModal, 
    public toastr: ToastrService, 
    private router: Router,
    private userService: UsuarioService,
  ){}

  ngOnInit() {
    this.initForm();
    this.isNewUser();
  }

  private initForm() {
    const isNew = this.isNewUser();
      this.formUserDetail = new FormGroup({
        nombre: new FormControl(this.detalle?.Nombre || '', [Validators.required]),
        apellido: new FormControl(this.detalle?.Apellido || '', [Validators.required]),
        telefono: new FormControl(this.detalle?.Telefono || '', [Validators.required, Validators.pattern(/^\d{10}$/)]),
        rol: new FormControl(this.detalle?.IdRol || '', [Validators.required]),
        peaje: new FormControl(this.detalle?.IdPeaje || '', [Validators.required]),
        grupo: new FormControl(this.detalle?.Grupo || '', [Validators.required]),
        password: new FormControl(this.detalle?.Password || '',isNew ? [Validators.required, Validators.minLength(3)] : []),
        confirmPassword: new FormControl('',isNew ? [Validators.required] : []),
        usuario: new FormControl('',isNew ? [Validators.required] : []),
      }, { validators: isNew ? this.passwordMatchValidator : null });
  }

  passwordMatchValidator: ValidatorFn = (control: AbstractControl) => {
  const group = control as FormGroup;
  const password = group.get('password')?.value;
  const confirmPassword = group.get('confirmPassword')?.value;
  return password === confirmPassword ? null : { mismatch: true };
};

  hasErrors(controlName: string, errorName: string){
    const control = this.formUserDetail.get(controlName);
    return control?.hasError(errorName) && control?.touched;
  }

  get controls() {
    return this.formUserDetail.controls;
  }

  private buildUsuarioFromForm(): any {
    return {
      Id: this.detalle?.Id,
      Nombre: this.formUserDetail.get('nombre')?.value,
      Apellido: this.formUserDetail.get('apellido')?.value,
      Telefono: this.formUserDetail.get('telefono')?.value,
      IdRol: this.formUserDetail.get('rol')?.value,
      IdPeaje: this.formUserDetail.get('peaje')?.value,
      Grupo: this.formUserDetail.get('grupo')?.value,
      Password: this.formUserDetail.get('password')?.value,
      Usuario: this.formUserDetail.get('usuario')?.value,
    };
  }

  public isNewUser():boolean{
    return !this.detalle || !this.detalle.Id; 
  }

  private navigateToUserList(){
    this.router.navigate([RoutesService.ROUTES.RECAUDACION_VIAL.USUARIOS]);
  }

  private showSuccess() {
    this.toastr.success('Usuario actualizado con éxito', 'Éxito', { timeOut: 3000 });
  }

  private showError() {
    this.toastr.error('Por favor verifique los datos ingresados', 'Error', { timeOut: 3000 });
  }

  private handleError(){
    this.showError();
  }

  private handleSuccess(){
    this.usuarioGuardado.emit();  
    this.modal.close();
    this.showSuccess();
    this.navigateToUserList();
  }

  private createUser(user:any){
    this.userService.createUsuario(user).subscribe({
      next: () => this.handleSuccess(),
      error: ()=> this.handleError(),
    })
  }

  private updateUser(user:any){
    this.userService.updateUsuario(user).subscribe({
      next: ()=> this.handleSuccess(),
      error: ()=> this.handleError(),
    })
  }

  validateForm(){
    this.formUserDetail.valid?
      this.submit():this.handleError()
    
  }

  submit(){
    this.usuario = this.buildUsuarioFromForm();
    if(this.isNewUser()){
      this.createUser(this.usuario);
    }else{
      this.updateUser(this.usuario);
    }
  }

  
}
