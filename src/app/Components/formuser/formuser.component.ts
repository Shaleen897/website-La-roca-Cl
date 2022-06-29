import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { User } from 'src/app/modelo/user.module';
import { ServicioScrService } from 'src/app/servicioScr.service';
import { LoginService } from '../login/login.service';

@Component({
  selector: 'app-formuser',
  templateUrl: './formuser.component.html',
  styleUrls: ['./formuser.component.css']
})
export class FormuserComponent implements OnInit {

 
  clientes: any[] = [];
  isloggedIn: boolean;
  loggedInUser: string;
  isloggedInAdm: boolean;
  crearCliente: FormGroup;
  uidUser: string = null;

  constructor(private _producService: ServicioScrService,
              private loginService: LoginService,
              private fireStore: AngularFirestore,
              private router: Router,
              private fb: FormBuilder,
              private toastr: ToastrService,
              ) { 
                const uid = this.loginService.getUid();
                this.crearCliente = this.fb.group({
                  uid: ['', Validators.required],
                  nombre: ['', Validators.required],
                  apellido: ['', Validators.required],
                  email: ['', Validators.required],
                  telefono: ['', Validators.required],
                  direccion: ['', Validators.required]
                })
              }

  async ngOnInit() {
   

    this.loginService.getAuth().subscribe( auth => {
      if(auth){
        this.uidUser = auth.uid;
        this.loggedInUser = auth.email;
      }else{
        this.isloggedIn = false;
      }

    
    })

   /* const uid = await this.loginService.getUid();
    console.log(uid);
    this.fireStore.collection("clientes").add({
      uid: uid
    })*/

  
  }






  
  async clienteInfo(){

    const uid = await this.loginService.getUid();
    /*console.log(uid);*/

    const infoCliente: any ={
      uid:this.crearCliente.value.uid,
      nombre: this.crearCliente.value.nombre,
      apellido: this.crearCliente.value.apellido,
      email: this.crearCliente.value.email,
      telefono: this.crearCliente.value.telefono,
      direccion: this.crearCliente.value.direccion,
      fechaCreacion: new Date(),
    
    }

   

    if(infoCliente.uid == '' || infoCliente.nombre == ''|| infoCliente.apellido == '' || infoCliente.email == '' || infoCliente.telefono == '' || infoCliente.direccion == ''){

        this.toastr.error('Complete todos los datos', 'Error');

    }else{

    
      /*informacion cliente*/

      this._producService.agregarCliente(infoCliente).then(() =>{
        this.crearCliente.reset();
        this.toastr.success('Informacion Enviada','Info');
        
        this.crearCliente.value.uid = this.uidUser
        
        this.router.navigate(['/']);

      }).catch(error =>{
        this.toastr.error(error,'Error');
      })

      this._producService.agregarClienteAdm(infoCliente).then(() =>{
        this.crearCliente.reset();
        this.toastr.success('Informacion Enviada','Info');
        
        this.router.navigate(['/']);

      }).catch(error =>{
        this.toastr.error(error,'Error');
      })

      
    }
  }
}