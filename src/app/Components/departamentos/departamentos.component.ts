import { Component, ElementRef, EventEmitter, HostListener, OnInit, Output } from '@angular/core';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
import { ToastrService } from 'ngx-toastr';
import { ServicioScrService } from 'src/app/servicioScr.service';
import { LoginService } from '../login/login.service';
import { Producto } from 'src/app/modelo/producto.module';
import { CategoriasService } from 'src/app/servicios/categorias.service';
import { User } from 'src/app/modelo/user.module';
import { ActivatedRoute, Router } from '@angular/router';
import { CartService } from 'src/app/servicios/cart.service';
import { Template } from '@angular/compiler/src/render3/r3_ast';

@Component({
  selector: 'app-departamentos',
  templateUrl: './departamentos.component.html',
  styleUrls: ['./departamentos.component.css'],
  
})
export class DepartamentosComponent implements OnInit {

  @Output() scrollPositon = new EventEmitter
  
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
              private _departaCateg: CategoriasService,
              private cartService: CartService,
              private router: Router,
              public el: ElementRef
              ) {
                
   }

   @HostListener('scroll', ['$event'])

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
    /*this.mastotal = 4;
    this.mas8 += this.mastotal
    console.log(this.mas8);*/

    this._producService.cargarMas();
    this.router.navigate(['/loading']);
    setTimeout(() => {
      this.router.navigate(['/departamento']);
  }, 0.001);
    
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

 
/*
  eliminarProducto(id:string){
    this._producService.eliminarProducto(id).then(() => {

      this.toastr.success('El Producto fue Eliminado', 'Elimininado');
      
    }).catch(error =>{
      this.toastr.error('El Producto no fue Eliminado correctamente', 'Error');
        console.log(error)
      })
  }*/


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


  buscar(){
    
    if(this.nombre){
      this._producService.buscarProducto(this.nombre).subscribe(
        (prod: Producto[]) => {
         
          this.productos = prod;
        }
      )
    }
  }


  buscarPrecio(){
    
    console.log(this.operador, this.precio);

      this._producService.buscarPrecio(this.operador, this.precio).subscribe(
        (prod: Producto[]) => {
         
          this.productos = prod;
        }
      )
    
  }


scroll: boolean = false;

onScrollDown():void{
 // this.scroll = true;
  //console.log('Down!!');
 

}





























  /*Categorias del departamento*/

  depAutomotriz(){
    this._departaCateg.depAutomotriz().subscribe(
      (prod: Producto[]) => {
       
        this.productos = prod;
      }
    )
  }


  depConstruccion(){
    this._departaCateg.depConstruccion().subscribe(
      (prod: Producto[]) => {
       
        this.productos = prod;
      }
    )
  }

  depHerramientas(){
    this._departaCateg.depHerramientas().subscribe(
      (prod: Producto[]) => {
       
        this.productos = prod;
      }
    )
  }

  depMaquinarias(){
    this._departaCateg.depMaquinarias().subscribe(
      (prod: Producto[]) => {
       
        this.productos = prod;
      }
    )
  }

  depPinturas(){
    this._departaCateg.depPinturas().subscribe(
      (prod: Producto[]) => {
       
        this.productos = prod;
      }
    )
  }
  depCerrajeria(){
    this._departaCateg.depCerrajeria().subscribe(
      (prod: Producto[]) => {
       
        this.productos = prod;
      }
    )
  }

  depPlomeria(){
    this._departaCateg.depPlomeria().subscribe(
      (prod: Producto[]) => {
       
        this.productos = prod;
      }
    )
  }

  depElectricidad(){
    this._departaCateg.depElectricidad().subscribe(
      (prod: Producto[]) => {
       
        this.productos = prod;
      }
    )
  }
  
}
