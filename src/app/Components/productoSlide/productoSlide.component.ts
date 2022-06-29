import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { User } from 'src/app/modelo/user.module';
import { CartService } from 'src/app/servicios/cart.service';
import { ServicioScrService } from 'src/app/servicioScr.service';
import { LoginService } from '../login/login.service';


@Component({
  selector: 'app-productoSlide',
  templateUrl: './productoSlide.component.html',
  styleUrls: ['./productoSlide.component.css']
})
export class ProductoSlideComponent implements OnInit {

  @Input()  productos: any[] = []; 
  clientes: User[] = []; 
 
  isloggedIn: boolean;
  loggedInUser: string;
  isloggedInAdm: boolean;
  nombre: string;

  ids:string;

  add: number = -1;

  disponible: string = 'Disponible';
  noDisponible: string = 'No disponible';

    constructor(private _producService: ServicioScrService,
      private toastr: ToastrService,
      private loginService: LoginService,
      private cartService: CartService,
      private router: Router) { }


  ngOnInit() {
    
    this.getclientes();

    this.loginService.getAuth().subscribe( auth => {
      if(auth){
        this.loggedInUser = auth.email;
        this.ids = auth.uid
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


  customOptions: any = {
    loop: true,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: false,
    dots: false,
    autoplay: true ,
    navSpeed: 600,
    navText: ['', ''],
    responsive: {
      0: {
        items: 1
      },
      400: {
        items: 2
      },
      740: {
        items: 3
      },
      940: {
        items: 4
      }
    },
    nav: true
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

  addToCart(index:number){
    this.add = +index;
  /*  console.log(index);*/

  }

  buy(cantidad:number){

    let selectProducto = this.productos[this.add];
    
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
      this.toastr.error('Entre a su cuenta'+error, 'Error');
    })
   }
  }

/*
  addToCart(index:number){
    this.add = +index;

  }

  buy(cantidad:number){

    let selectProducto = this.productos[this.add]
    let data = {
      producto: selectProducto.producto,
      cantidad: +cantidad,
      precio: selectProducto.precio,
      img: selectProducto.img,
      descuento: selectProducto.descuento,
      codigo: selectProducto.codigo,
      email: this.loggedInUser,
      uids: this.ids,
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
    
  }*/
}
