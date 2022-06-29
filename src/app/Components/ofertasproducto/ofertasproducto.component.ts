import { Component, Input, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { CartService } from 'src/app/servicios/cart.service';
import { CategoriasService } from 'src/app/servicios/categorias.service';
import { ServicioScrService } from 'src/app/servicioScr.service';
import { LoginService } from '../login/login.service';

@Component({
  selector: 'app-ofertasproducto',
  templateUrl: './ofertasproducto.component.html',
  styleUrls: ['./ofertasproducto.component.css']
})
export class OfertasproductoComponent implements OnInit {

   
  productos: any[] = [];  
  clientes: any[] = []; 

  isloggedIn: boolean;
  loggedInUser: string;
  isloggedInAdm: boolean;

  nombre: string;
  nombreDepart: string;
  precio: number;
  operador:any;
  
 id:string;
  cliente: any = null;
  ids:string;

  add: number = -1;


  disponible: string = 'Disponible';
  noDisponible: string = 'No disponible';

  constructor(private _producService: ServicioScrService,
              private toastr: ToastrService,
              private loginService: LoginService,
              private aRoute: ActivatedRoute,
              private fireStore: AngularFirestore,
              private cartService: CartService,
              private router: Router
              ) {
              
   }

  ngOnInit(): void {
    this.getProductos();
    this.getclientes();

    this.loginService.getAuth().subscribe( auth => {
      if(auth){
        this.loggedInUser = auth.email;
        this.ids = auth.uid;
      }else{
        this.isloggedIn = false;
      }

      if(this.loggedInUser == 'shaleen15@live.com'){
        this.isloggedInAdm = true;
      }else{
        this.isloggedInAdm = false;
      }
    })
  

  }

  getclientes(){
    this._producService.getCliente().subscribe( data=> {
      this.clientes = [];
      data.forEach(element => {
        this.clientes.push({
          id: element.payload.doc.id,
          ...element.payload.doc.data()
        })
      });
       console.log()
    });
  }

  mas8:number = 4;
  mastotal:number;
  cargarMas(){
    this.mastotal = 4;
    this.mas8 += this.mastotal
    console.log(this.mas8);
  }
  
  getProductos(){

    this._producService.getProductos().subscribe( data=> {
      this.productos = [];
      data.forEach(element => {
        this.productos.push({
          id: element.payload.doc.id,
          ...element.payload.doc.data()
        })
      });
       console.log()
    });
  }

 


  addToCart(index:number){
    this.add = +index;
  /*  console.log(index);*/

  }

  buy(cantidad:number){

    let selectProducto = this.productos[this.add]
    let data = {
      producto: selectProducto,
      cantidad: +cantidad,
      subTotal: selectProducto.precio * +cantidad,
      email: this.loggedInUser,
      fecha: new Date
    }

    if(!this.loggedInUser){
      this.router.navigate(['./login'])
    }else{
     this.cartService.addToCart(data).then(() =>{
      this.add = -1;
      this.toastr.success('Añadido al Carrito', 'Carrito');
      //this.router.navigate(['./productos'])
    }).catch(error =>{
      this.toastr.error('Entre a su cuenta', 'Error');
    })
   }
    
  }


 

}
