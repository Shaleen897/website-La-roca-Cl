import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { Pedido } from '../modelo/producto.module';
import { User } from '../modelo/user.module';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  clientes: string[] = [];

constructor(private fireStore: AngularFirestore) { }

private updateUserData(user) {
  const userRef = this.fireStore.doc(`users/${user.uid}`);
  const data: User = {
    id: user.uid,
    email: user.email,

    roles: {
      cliente: true
    }
  }
  return userRef.set(data, { merge: true })
}



isUserAdmin(userUid) {
  return this.fireStore.doc<User>(`users/${userUid}`).valueChanges();
}

/*
addToCart(data: Pedido): Promise<any>{

  return  this.fireStore.collection(`users/${this.uid}/cart`).add(data);
 }
 
 getCart():Observable<any>{
 
   /*return  this.firestore.collection(`users/${this.uid}/cart`).snapshotChanges();
  }
 */


}
