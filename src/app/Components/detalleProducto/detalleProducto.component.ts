import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Pedido, Producto } from 'src/app/modelo/producto.module';
import { ServicioScrService } from 'src/app/servicioScr.service';

@Component({
  selector: 'app-detalleProducto',
  templateUrl: './detalleProducto.component.html',
  styleUrls: ['./detalleProducto.component.css']
})
export class DetalleProductoComponent implements OnInit {

  productos: any[] = []; 
  id:string | null;

  constructor(
    private aRoute: ActivatedRoute,
    private _producService: ServicioScrService ) {
      this.id = this.aRoute.snapshot.paramMap.get('id');
     }

  ngOnInit() {
    
    this.getDetallesProducto();
  }
  producto: any = {
    codigo: '',
    partamento: '',
    producto: '',
    img: '',
    precio: '',
    descuento: '',
    existencia: '',
    descripcion:'',
  } 

  refresh(): void {
    window.location.reload();
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

  getDetallesProducto(){
    if(this.id !== null){
    this._producService.getOneProducto(this.id).subscribe(data =>{
      
      this.producto = ({
        departamento: data.payload.data()['departamento'],
        codigo: data.payload.data()['codigo'],
        producto: data.payload.data()['producto'],
        precio: data.payload.data()['precio'],
        descuento: data.payload.data()['descuento'],
        existencia: data.payload.data()['existencia'],
        descripcion: data.payload.data()['descripcion'],
        img: data.payload.data()['img']
      });

     });
     console.log();
     console.log();
  }
}




}
