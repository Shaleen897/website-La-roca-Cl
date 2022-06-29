import { Component, Input, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { CartService } from 'src/app/servicios/cart.service';
import { CategoriasService } from 'src/app/servicios/categorias.service';
import { ServicioScrService } from 'src/app/servicioScr.service';
import { LoginService } from '../login/login.service';

@Component({
  selector: 'app-carrito',
  templateUrl: './carrito.component.html',
  styleUrls: ['./carrito.component.css']
})
export class CarritoComponent implements OnInit {

  cart: any[] = [];

  
  @Input()  productos: any[] = [];  
  clientes: any[] = [];

  isloggedIn: boolean;
  loggedInUser: string;
  isloggedInAdm: boolean;
  nombre: string;

  uid:string;
  total:number;

  add: number = -1;

 constructor(private cartService: CartService,
             private toastr: ToastrService,
             private loginService: LoginService,
             private _producService: ServicioScrService,
              private aRoute: ActivatedRoute,
              private firestore: AngularFirestore,
              private _departaCateg: CategoriasService,
              private router: Router){

 }

  ngOnInit() {
   
    this.getCart();
    this.getclientes();
    
    
    this.loginService.getAuth().subscribe( auth => {
      if(auth){
        this.loggedInUser = auth.email;
        this.uid = auth.uid
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
      // console.log()
    });
  }

suma: number = 0;
  getCart(){

    this.cartService.getCart().subscribe( data => {
      this.cart = [];
      data.forEach(shopping => {
        this.cart.push({
          id: shopping.payload.doc.id,
          ...shopping.payload.doc.data()
        })
      });

      this.cart.forEach(producto =>{
        this.total = 0;
        for ( this.total = producto.subTotal; this.total <= producto.subTotal; this.total += producto.subTotal ) {
          this.suma += this.total; 
       }
      
      })
      console.log();

    });

  }


  refresh(): void {
    window.location.reload();
}

  deletecart(id:string){
    this.cartService.eliminarProdCart(id).then(() => {
       this.refresh();
      this.toastr.success('El Producto fue Eliminado', 'Elimininado');
      
    }).catch(error =>{
      this.toastr.error(error, 'Error');
      })
    

  }



  addPedido(index:number){
    this.add = +index;
  /*  console.log(index);*/

  }
 
  /*
  enviarPedido(cantidad:number){

      const idg = Math.random().toString(36).substring(2);
      let selectProducto = this.cart[this.add]
      let data = {
        numerodeOrden: idg,
        orden: selectProducto,
        cantidad: +cantidad,
        total: this.suma,
        fecha: new Date
      }
  
  
       this.cartService.enviarPedido(data).then(() =>{
        this.add = -1;
        this.toastr.success('Pedido Enviado', '');
        //this.router.navigate(['./productos'])
      }).catch(error =>{
        this.toastr.error(error, 'Error');
      })

      this.cartService.enviarPedidoAdmin(data).then(() =>{
        this.add = -1;
      }).catch(error =>{
        this.toastr.error(error, 'Error');
      })
      
    
  }*/

  

ordennum: string;
  sendPedido(cantidad:number){

    const idg = Math.random().toString(36).substring(2);
    this.ordennum = idg;
    let data = {
      ordenNum: this.ordennum,
      cliente:this.clientes,
      orden: this.cart,
      total: this.suma,
      cantidad: +cantidad,
      estado: 'En Proceso',
      fecha: new Date
    }

    //pedido usuario

     this.cartService.enviarPedido(data).then(() =>{
      this.toastr.success('Pedido Enviado', '');
     this.router.navigate(['/ventas']);
    }).catch(error =>{
      this.toastr.error(error, 'Error');
    })

    //Pedido Admin
    this.cartService.enviarPedidoAdmin(data).then(() =>{
      this.add = -1;
    }).catch(error =>{
      this.toastr.error(error, 'Error');
    })

    //Eliminar Pedido
    this.clearCart();



  }

productoid:any;
  
  clearCart(){
    this.cart.forEach(producid =>{
      this.productoid = producid.id
     this.cartService.eliminarProdCart(this.productoid).then(() => {
    }).catch(error =>{
      this.toastr.error(error, 'Error');
      })
    })
  
 }






    

}