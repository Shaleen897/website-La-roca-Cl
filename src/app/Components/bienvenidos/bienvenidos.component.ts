import { Component, Input, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { ServicioScrService } from 'src/app/servicioScr.service';
import { LoginService } from '../login/login.service';

@Component({
  selector: 'app-bienvenidos',
  templateUrl: './bienvenidos.component.html',
  styleUrls: ['./bienvenidos.component.css']
})
export class BienvenidosComponent implements OnInit {

  productos: any[] = [];  

  isloggedIn: boolean;
  loggedInUser: string;
  isloggedInAdm: boolean;

    constructor(private _producService: ServicioScrService,
      private toastr: ToastrService,
      private loginService: LoginService) { }


  ngOnInit() {

  this.getProductos()

    this.loginService.getAuth().subscribe( auth => {
      if(auth){
        this.loggedInUser = auth.email;
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


  getProductos(){
    this._producService.getProductos().subscribe( data=> {
      this.productos = [];
      data.forEach(element => {
        this.productos.push({
          id: element.payload.doc.id,
          ...element.payload.doc.data()
        })
      });
      // console.log()
    });
  }

  eliminarProducto(id:string){
    this._producService.eliminarProducto(id).then(() => {

      this.toastr.success('El Producto fue Eliminado', 'Elimininado');
      
    }).catch(error =>{
      this.toastr.error('El Producto no fue Eliminado correctamente', 'Error');
        console.log(error)
      })
  }
}





