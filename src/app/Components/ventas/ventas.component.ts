import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { User } from 'src/app/modelo/user.module';
import { CartService } from 'src/app/servicios/cart.service';
import { ServicioScrService } from 'src/app/servicioScr.service';
import { LoginService } from '../login/login.service';

@Component({
  selector: 'app-ventas',
  templateUrl: './ventas.component.html',
  styleUrls: ['./ventas.component.css']
})
export class VentasComponent implements OnInit {

  isloggedIn: boolean;
  loggedInUser: string;
  isloggedInAdm: boolean;

  clientes: any[] = [];
  pedido: any[] = [];
  pedidoadm: any[] = [];
  pagosOnline: any[] = [];
  
  admin: string = 'Listado de Ventas';
  user: string = 'Pre-ordenes';

  POnline:boolean = true;
  
  estadoE:string = 'Enviado'

  id:string;
   
  constructor(private _producService: ServicioScrService,
              private cartService: CartService,
             private loginService: LoginService,
             private aRoute: ActivatedRoute,) {
              
              }

  ngOnInit() {

    this.getPedido();
    this.getPagosOnline();
    
    this.loginService.getAuth().subscribe( auth => {
      if(auth){
        this.loggedInUser = auth.email;
      }else{
        this.isloggedIn = false;
      }

    })

    

  }

  preOrdenesUser(){
    this.POnline = true;
    this.user = 'Pre-ordenes';
  }
  
  onlineOrdenesUser(){
    this.POnline = false;
    this.user = 'Oredenes Online'; 
  }

  getPedido(){

    this.cartService.getPedido().subscribe( data => {
      this.pedido = [];
      data.forEach(shopping => {
        this.pedido.push({
          id: shopping.payload.doc.id,
          ...shopping.payload.doc.data()
        })
      });
       console.log();

    });

  }

  getPagosOnline(){

    this.cartService.getPagosOnline().subscribe( data => {
      this.pagosOnline = [];
      data.forEach(shopping => {
        this.pagosOnline.push({
          id: shopping.payload.doc.id,
          ...shopping.payload.doc.data()
        })
      });
       console.log();

    });

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
       /* console.log();*/
    });
  }




}



















































































