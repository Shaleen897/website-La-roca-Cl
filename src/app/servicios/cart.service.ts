import { Injectable, Input } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { LoginService } from '../Components/login/login.service';
import { Pedido, Producto } from '../modelo/producto.module';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  
  uid: string;

constructor(private firestore: AngularFirestore,
            private loginService: LoginService) {

              this.loginService.getAuth().subscribe( auth => {
                
                  this.uid = auth.uid;
               
              })

              
             }





addToCart(data: Pedido): Promise<any>{
  return  this.firestore.collection(`users/${this.uid}/cart`).add(data);
}

getCart():Observable<any>{
  return this.firestore.collection(`users/${this.uid}/cart`, ref => ref.orderBy('fecha', 'desc')).snapshotChanges();
 }

 getCartLimpiar(){
 return this.firestore.collection(`users/${this.uid}/cart`).doc().delete();
 }

 eliminarProdCart(id:string): Promise <any>{
  return this.firestore.collection(`users/${this.uid}/cart`).doc(id).delete();
}

enviarPedido(data: Pedido): Promise<any>{
  return  this.firestore.collection(`users/${this.uid}/pedido`).add(data);
 }

 getPedido():Observable<any>{

  return this.firestore.collection(`users/${this.uid}/pedido/`, ref => ref.orderBy('fecha', 'desc')).snapshotChanges();
 }

 getOnePedido(id:string):Observable<any>{

  return this.firestore.collection(`users/${this.uid}/pedido/`).doc(id).snapshotChanges();
 }
 
 enviarPedidoAdmin(data: Pedido): Promise<any>{
  return  this.firestore.collection(`pedidoAdmin`).add(data);
 }

 getPedidoAdmin():Observable<any>{

  return this.firestore.collection(`pedidoAdmin`, ref => ref.orderBy('fecha', 'desc')).snapshotChanges();
 }



 getPagosOnline():Observable<any>{

  return this.firestore.collection(`users/${this.uid}/ordenPagoOnline`, ref => ref.orderBy('fechaCreacion', 'desc')).snapshotChanges();
 }



}
