import { Component, Input, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Observable, Subject } from 'rxjs';
import { CategoriasService } from 'src/app/servicios/categorias.service';
import { ServicioScrService } from 'src/app/servicioScr.service';
import { LoginService } from '../login/login.service';
import { Producto } from 'src/app/modelo/producto.module';
import { CartService } from 'src/app/servicios/cart.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  
  productos: any[] = [];  
  cart: any[] =[];
  clientes: any[] = [];

  numerodeCart:number = 0;
  isloggedIn: boolean;
  loggedInUser: string;
  isloggedInAdm: boolean;
  nombre:string;

  usernombre:string;
  cantidadcart:number;
  user: string = 'Pre-ordenes';
  
  constructor(private loginService: LoginService,
              private _producService: ServicioScrService,
              private router: Router,
              private toastr: ToastrService,
              private cartService: CartService,
              private afs: AngularFirestore,
              private _departaCateg: CategoriasService) { 
  

  }

  ngOnInit() {;

    this.loginService.getAuth().subscribe( auth => {
       this.getperfil();
       this.getCart()
      if(auth){
        this.isloggedIn = true;
        this.loggedInUser = auth.email;
       
      }else{
        this.isloggedIn = false;
      }

    });

  }
  

  logout(){
    this.loginService.logout();
    this.isloggedIn = false;
    this.router.navigate(['/login'])
    this.toastr.success('A Salido De Su Cuenta ','Log Out')
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
      this.clientes.forEach(username => {
        this.usernombre = `${username.nombre} ${username.apellido}`
        });
        console.log();
    });
  }


  getCart(){

    this.cartService.getCart().subscribe( data => {
      this.cart = [];
      data.forEach(shopping => {
        this.cart.push({
          id: shopping.payload.doc.id,
          ...shopping.payload.doc.data()
        })
      });
      console.log();

    });

  }






}






