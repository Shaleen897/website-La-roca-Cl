import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class CategoriasService {

  automotriz:string = 'automotriz';
  construccion: string = 'construccion';
  Herramientas: string = 'herramientas';
  Maquinarias: string = 'maquinarias';
  Pinturas: string = 'pinturas';
  Plomeria: string = 'plomeria';
  Cerrajería: string = 'cerrajeria';
  Electricidad: string = 'electricidad';

constructor(private fireStore: AngularFirestore) { }


depAutomotriz(){
  return this.fireStore.collection('productos',ref => ref.where('departamento','==', this.automotriz)).valueChanges();
}

depConstruccion(){
  return this.fireStore.collection('productos',ref => ref.where('departamento','==', this.construccion)).valueChanges();
}
depHerramientas(){
  return this.fireStore.collection('productos',ref => ref.where('departamento','==', this.Herramientas)).valueChanges();
}
depPlomeria(){
  return this.fireStore.collection('productos',ref => ref.where('departamento','==', this.Plomeria)).valueChanges();
}
depMaquinarias(){
  return this.fireStore.collection('productos',ref => ref.where('departamento','==', this.Maquinarias)).valueChanges();
}
depPinturas(){
  return this.fireStore.collection('productos',ref => ref.where('departamento','==', this.Pinturas)).valueChanges();
}

depCerrajeria(){
  return this.fireStore.collection('productos',ref => ref.where('departamento','==', this.Cerrajería)).valueChanges();
}

depElectricidad(){
  return this.fireStore.collection('productos',ref => ref.where('departamento','==', this.Electricidad)).valueChanges();
}





}
