

import { Injectable } from "@angular/core";
import { AngularFireAuth } from "@angular/fire/auth";
import { CanActivate, Router } from "@angular/router";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";

@Injectable()

export class AuthGuard implements CanActivate{

    loggedInUser: string;
  isloggedInAdm: boolean;
  admUser:string = 'shaleen15@live.com';

    constructor(
        private router: Router,
        private afAuth: AngularFireAuth
    ){}

    canActivate(): Observable<boolean>{
        return this.afAuth.authState.pipe(
            map( auth => {
                if(!auth){
                    this.router.navigate(['/login']);
                    return false;
                }else{
                    return true;
                }
            })
        )
    }
   


    
}
/*
export class AuthGuardd implements CanActivate{


    loggedInUser: string;
    isloggedInAdm: boolean;
    admUser:string = 'shaleen15@live.com';
  
      constructor(
          private router: Router,
          private afAuth: AngularFireAuth
      ){}
  
      canActivate(): Observable<boolean>{
          return this.afAuth.authState.pipe(
              map( auth => {
                  if(!auth){
                      this.router.navigate(['/login']);
                      return false;
                  }if(auth && this.loggedInUser !== this.admUser){
                    this.router.navigate(['/bienvenido']);
                      return false;
                  }else{
                      return true;
                  }
              })
          )
      }
      

}*/