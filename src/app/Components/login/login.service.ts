import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
import { map } from 'rxjs/internal/operators/map';
import { User } from 'src/app/modelo/user.module';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

constructor( private authService: AngularFireAuth,
             private fireStore: AngularFirestore) { }

login( email:string, password:string){

  return new Promise((resolve, reject) =>{
    this.authService.signInWithEmailAndPassword(email, password)
    .then(datos => resolve(datos),
    
    error => reject(error))
  })

}

getAuth(){
  return this.authService.authState.pipe(
    map( auth => auth)
  );
}

logout(){
  this.authService.signOut();
  
}

registrarse( email: string, password: string){

  return new Promise((resolve, reject) =>{
    this.authService.createUserWithEmailAndPassword(email, password)
    .then(userData => {
      resolve(userData),
        this.updateUserData(userData.user)
    }).catch(err => console.log(reject(err)))
});
}




  async getUid(){
 const user = await this.authService.currentUser;
   if(user === null){
     return null;
   }else{
     return user.uid;
   }
}


private updateUserData(user) {
  const userRef: AngularFirestoreDocument<any> = this.fireStore.doc(`users/${user.uid}`);
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


}
