import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ServicioScrService } from 'src/app/servicioScr.service';
import { LoginService } from '../login/login.service';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css']
})
export class RegistroComponent implements OnInit {

  email:string;
  password:string;
  /*crearCliente: FormGroup;*/
  btnDisabled: boolean = true;
 uid: any;

  constructor(
    private router: Router,
    private fb: FormBuilder,
    private loginService: LoginService,
    private toastr: ToastrService,
    private _proService: ServicioScrService,
    private fireStore: AngularFirestore
  ) {
   
/*
    this.crearCliente = this.fb.group({
      nombre: ['', Validators.required],
      apellido: ['', Validators.required],
      email: ['', Validators.required],
      contraseña: ['', Validators.required],
      telefono: ['', Validators.required],
      direccion: ['', Validators.required]
    })*/
   }

  ngOnInit() {
    this.loginService.getAuth().subscribe(auth =>{
      if(auth){
        this.router.navigate(['/formuser']);
      }
    })
  }

  registraryagregarperfil(){
    this.loginService.registrarse(this.email, this.password)
    .then( async res => {
      const uid = await this.loginService.getUid();
      /*console.log(uid);*/
      this.toastr.success('Bienvenido te has Registrado','Registro completado')
    })
    .catch(error => {
      this.toastr.error(error, 'Error');
    });

    this.registro();
    /*this.registrarUser();*/
    /*this.agregarPerfil();*/
  }

  
  async registro(){
/*
    const uid = this.loginService.getUid();
    console.log(uid);
    this.fireStore.collection("clientes").add({
      uid: uid
    })

    const cliente: any ={
      nombre: this.crearCliente.value.nombre,
      apellido: this.crearCliente.value.apellido,
      email: this.crearCliente.value.email,
      contraseña: this.crearCliente.value.contraseña,
      telefono: this.crearCliente.value.telefono,
      direccion: this.crearCliente.value.direccion,
      fechaCreacion: new Date(),*/
      
    }

   
/*
    if(cliente.nombre == ''|| cliente.apellido == '' || cliente.telefono == '' || cliente.direccion == ''){

      this.toastr.error('Complete todos los datos', 'Error');

    }else{*/

      /*registro de usuario

      this.loginService.registrarse(this.email, this.password)
      .then( async res => {
        
        this.toastr.success('Bienvenido te has Registrado','Registro completado')
      })
      .catch(error => {
        this.toastr.error(error, 'Error');
      });
*/
      /*informacion cliente*/
/*
      this._proService.agregarCliente(cliente).then(async () =>{

      }).catch(error =>{
        this.toastr.error(error,'Error');
      })

      
    }*/
  }


  /*async registrarUser(){

 
        
  const cliente: any ={
    nombre: this.crearCliente.value.nombre,
    apellido: this.crearCliente.value.apellido,
    email: this.crearCliente.value.email,
    contraseña: this.crearCliente.value.contraseña,
    telefono: this.crearCliente.value.telefono,
    direccion: this.crearCliente.value.direccion,
    fechaCreacion: new Date()
  }

  const path = 'clientes';
  this.fireStore.createDoc(this.crearCliente, path, this.crearCliente.uid).then(res => {

  }).catch(error => {

  });

  
   }


  
}*/
