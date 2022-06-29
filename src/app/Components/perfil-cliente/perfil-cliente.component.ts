import { ThrowStmt } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { EmailValidator, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { User } from 'src/app/modelo/user.module';
import { ServicioScrService } from 'src/app/servicioScr.service';
import { LoginService } from '../login/login.service';

@Component({
  selector: 'app-perfil-cliente',
  templateUrl: './perfil-cliente.component.html',
  styleUrls: ['./perfil-cliente.component.css']
})
export class PerfilClienteComponent implements OnInit {

  clientes: any[] = [];
  usersAdm: any[] = [];
  isloggedIn: boolean;
  loggedInUser: string;
  isloggedInAdm: boolean;
  crearCliente: FormGroup;
  uidUser: string = null;
  mostrar: boolean = false;

  emails:string;

  constructor(private _producService: ServicioScrService,
              private loginService: LoginService,
              private fireStore: AngularFirestore,
              private router: Router,
              private fb: FormBuilder,
              private toastr: ToastrService,
              ) { 
                const uid = this.loginService.getUid();
                this.crearCliente = this.fb.group({
                  uid: [''],
                  nombre: ['', Validators.required],
                  apellido: ['', Validators.required],
                  email: ['', Validators.required],
                  telefono: ['', Validators.required],
                  direccion: ['', Validators.required]
                })
              }

  async ngOnInit() {
    this.getperfil();

    this.loginService.getAuth().subscribe( auth => {
      if(auth){
        this.uidUser = auth.uid;
        this.loggedInUser = auth.email;
      }else{
        this.isloggedIn = false;
      }
      if(this.loggedInUser == 'BlockIndustrialSPM@outlook.com' || 'blockindustrialspm@outlook.com'){
        this.isloggedInAdm = true;
      }else{
        this.isloggedInAdm = false;
      }
    })

   /* const uid = await this.loginService.getUid();
    console.log(uid);
    this.fireStore.collection("clientes").add({
      uid: uid
    })*/

  }


  buscarEmail(){
    
    if(this.emails){
      this._producService.buscarEmail(this.emails).subscribe(
        (prod: User[]) => {
         
          this.usersAdm = prod;
        }
      )
    }
  }

  getperfil(){
    this._producService.getCliente().subscribe( data=> {
      this.clientes = [];
      data.forEach(element => {
        this.clientes.push({
          id: element.payload.doc.id,
          ...element.payload.doc.data()
        })
      });
        console.log();
    });
  }


  goForm(){
    this.router.navigate(['/formuser']);
  }



  
  clienteInfo(){
    const cliente: any ={
      uid:this.crearCliente.value.uid,
      nombre: this.crearCliente.value.nombre,
      apellido: this.crearCliente.value.apellido,
      email: this.crearCliente.value.email,
      telefono: this.crearCliente.value.telefono,
      direccion: this.crearCliente.value.direccion,
      fechaCreacion: new Date(),
    
    }

   

    if(cliente.nombre == ''|| cliente.apellido == '' || cliente.email == '' || cliente.telefono == '' || cliente.direccion == ''){

      this.toastr.error('Complete todos los datos', 'Error');


    }else{

    
      /*informacion cliente*/

      this._producService.agregarCliente(cliente).then(() =>{
        this.crearCliente.reset();
        this.toastr.success('Informacion Enviada','Info');
        
        this.mostrar = false;
        
        this.router.navigate(['/']);

      }).catch(error =>{
        this.toastr.error(error,'Error');
      })

      
    }
  }



mostrarOcurtar(){
  if(this.mostrar){
    this.mostrar = false;
  }else{
    this.mostrar = true;
  }
}




}