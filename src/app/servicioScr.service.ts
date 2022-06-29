import { Injectable } from '@angular/core';
import { AngularFirestore,AngularFirestoreDocument  } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { LoginService } from './Components/login/login.service';
import { Producto } from './modelo/producto.module';

@Injectable({
  providedIn: 'root'
})
export class ServicioScrService {

  uid:string;

constructor(private fireStore: AngularFirestore,
            private _loginService: LoginService) {
  this._loginService.getAuth().subscribe( auth => {
    if(auth){
      this.uid = auth.uid;
    }else{
    }
   
  })
}

agregarProducto(producto: any): Promise<any>{
  return this.fireStore.collection('productos').add(producto);
}


mas:number = 8;
cargarMas(){
  let mas4:number = 4;
  this.mas += mas4
 // console.log(this.mas);
}
getProductos(): Observable<any>{

  return this.fireStore.collection('productos', ref => ref.orderBy('producto')
                                                   .startAt('a')
                                                   .limit(this.mas)
                                                   .startAfter(this.mas)
                                                   .endAt('z') ).snapshotChanges();
}

eliminarProducto(id:string): Promise <any>{
  return this.fireStore.collection('productos').doc(id).delete();
}

getProducto(id:string): Observable<any>{
  return this.fireStore.collection('productos').doc(id).snapshotChanges();
}

actualizarProductos(id:string, data: string): Promise<any>{
  return this.fireStore.collection('productos').doc(id).update(data);
}

agregarContacto(contacto: any): Promise<any>{
  return this.fireStore.collection('contactos').add(contacto);
}

getContactos(): Observable<any>{
  return this.fireStore.collection('contactos', ref => ref.orderBy('fechaCreacion', 'desc')).snapshotChanges();
}


eliminarContacto(id:string): Promise <any>{
  return this.fireStore.collection('contactos').doc(id).delete();
}


agregarCliente(cliente: any): Promise<any>{
  return this.fireStore.collection(`users/${this.uid}/clientes`).add(cliente);
}

getCliente(): Observable<any>{
  return this.fireStore.collection(`users/${this.uid}/clientes`, ref => ref.orderBy('fechaCreacion', 'desc')).snapshotChanges();
}

agregarClienteAdm(cliente: any): Promise<any>{
  return this.fireStore.collection(`clientes`).add(cliente);
}

getClienteAdm(): Observable<any>{
  return this.fireStore.collection(`clientes`, ref => ref.orderBy('fechaCreacion', 'desc')).snapshotChanges();
}

buscarProducto(nombre: string){
     return this.fireStore.collection('productos',ref => ref.where('producto','==', nombre)).valueChanges();

  
  }

  buscarPrecio(operador: '<' | '>' | '==', precio: number){
    return this.fireStore.collection('productos',ref => ref.where('precio', operador, precio)).valueChanges();

 
 }
  departamentos(nombreDepart: string){
    return this.fireStore.collection('productos',ref => ref.where('departamento','==', nombreDepart)).valueChanges();

 
 }

 buscarEmail(emails: string){
  return this.fireStore.collection('clientes',ref => ref.where('email','==', emails)).valueChanges();


}

getOneProducto(id:string): Observable<any>{
  return this.fireStore.collection('productos').doc(id).snapshotChanges();
}


getOneCliente(id:string): Observable<any>{
  return this.fireStore.collection('pedidoAdmin').doc(id).snapshotChanges();
}

OrdenPagoOnlineAdmin(orden: any): Promise<any>{
  return this.fireStore.collection('ordenPagoOnline').add(orden);
}

OrdenPagoOnline(orden: any): Promise<any>{
  return this.fireStore.collection(`users/${this.uid}/ordenPagoOnline`).add(orden);
}



/**/

}
