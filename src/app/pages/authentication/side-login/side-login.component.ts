import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { RouterModule } from '@angular/router';
import { MaterialModule } from 'src/app/material.module';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { UsuarioService } from 'src/app/services/usuario/usuario.service';

@Component({
  selector: 'app-side-login',
  imports: [RouterModule, CommonModule,MaterialModule, FormsModule, ReactiveFormsModule],
  templateUrl: './side-login.component.html',
})
export class AppSideLoginComponent implements OnInit {

  constructor( private router: Router,private service:UsuarioService) {}

  images = [
    './assets/images/svgs/fondo-login1.jpg',
    './assets/images/svgs/fondo-login2.webp',
    './assets/images/svgs/fondo-login3.jpeg',
    './assets/images/svgs/fondo-login4.jpeg',
    './assets/images/svgs/fondo-login5.jpg',
    './assets/images/svgs/fondo-login6.webp'

  ];
  currentIndex = 0;
  formLogin: FormGroup;

  hasErrors(controlName: string, errorName: string) {
    return this.formLogin.get(controlName)?.hasError(errorName) && this.formLogin.get(controlName)?.touched;
  }

 f() {
    return this.formLogin.controls;
  }

  submit() {
    if (this.formLogin.valid) {
      const usuario = this.formLogin.get('usuario')?.value;
      const contraseña = this.formLogin.get('contraseña')?.value;
      this.service.login(usuario, contraseña).subscribe((response) => {
        console.log(response);
        if (response) {
          console.log('Inicio de sesión exitoso');

          this.router.navigate(['/']);
        } else {
          console.log('Error en el inicio de sesión');
        }
      });
      
    } else {
      console.log(this.formLogin.value);
      this.formLogin.markAllAsTouched();
    }
  }


  ngOnInit() {

    this.formLogin = new FormGroup({
        usuario:new FormControl('',[Validators.required]),
        contraseña:new FormControl('',[Validators.required])
      });


   setInterval(() => {
      this.currentIndex = (this.currentIndex + 1) % this.images.length;
    }, 4000); 
  }
}
