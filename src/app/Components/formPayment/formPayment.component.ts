import { hostViewClassName } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, MinLengthValidator, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { CartService } from 'src/app/servicios/cart.service';
import { ServicioScrService } from 'src/app/servicioScr.service';
import { LoginService } from '../login/login.service';

@Component({
  selector: 'app-formPayment',
  templateUrl: './formPayment.component.html',
  styleUrls: ['./formPayment.component.css']
})
export class FormPaymentComponent implements OnInit {


  isloggedIn: boolean;
  loggedInUser: string;

  addPayment: FormGroup;
  pedido: any[] = [];
  idOrden:string | null;
  uidUser: string = null;
  btnDisabled: boolean = false;
  
  constructor(private loginService: LoginService,
              private fb: FormBuilder,
              private _producService: ServicioScrService,
              private router: Router,
              private toastr: ToastrService,
              private aRoute: ActivatedRoute,
              private cartService: CartService) {
                
       this.idOrden = this.aRoute.snapshot.paramMap.get('id');
                 
    this.addPayment = this.fb.group({
      uids: ['', Validators.required],
      nombre: ['', Validators.required],
      email: ['', Validators.required],
      direccion: ['', Validators.required],
      pueblo: ['', Validators.required],
      codigozip: ['', Validators.required],
      ciudad: ['', Validators.required],
      namecard: ['', Validators.required],
      cardnumber: ['', Validators.required,Validators.minLength(16), Validators.maxLength(16)],
      mescard: ['', Validators.required,Validators.minLength(1), Validators.maxLength(2)],
      añocard: ['', Validators.required, Validators.minLength(2), Validators.maxLength(4)],
      cvv: ['', Validators.required,Validators.minLength(3), Validators.maxLength(3)],
    })
   }

  ngOnInit() {
    this.getPedido();
    this.getOrdenOnline();

    this.loginService.getAuth().subscribe( auth => {
      if(auth){
        this.uidUser = auth.uid;
        this.loggedInUser = auth.email;
      }else{
        this.isloggedIn = false;
      }

  });
}


getPedido(){

  this.cartService.getPedido().subscribe( data => {
    this.pedido = [];
    data.forEach(shopping => {
      this.pedido.push({
        id: shopping.payload.doc.id,
        ...shopping.payload.doc.data()
      })
    });
     console.log();

  });

}


OrdenOnline: any = {
  estado: '',
  total: '',
  orden: '',
  ordenNum: ''
  
} 

getOrdenOnline(){
  if(this.idOrden !== null){
  this.cartService.getOnePedido(this.idOrden).subscribe(data =>{
    
    this.OrdenOnline = ({
      orden:data.payload.data()['orden'],
      estado:data.payload.data()['estado'],
      ordenNum:data.payload.data()['ordenNum'],
      total: data.payload.data()['total']
    });
   });
   console.log();
   console.log()
 }

}


  paymentInfo(){

    const infoPayment: any ={
      orden: this.OrdenOnline,
      uids:this.addPayment.value.uids,
      nombre: this.addPayment.value.nombre,
      email: this.addPayment.value.email,
      ciudad: this.addPayment.value.ciudad,
      pueblo: this.addPayment.value.pueblo,
      direccion: this.addPayment.value.direccion,
      codigozip: this.addPayment.value.codigozip,
      yearcard: this.addPayment.value.añocard,
      namecard: this.addPayment.value.namecard,
      cardnumber: this.addPayment.value.cardnumber,
      mescard: this.addPayment.value.mescard,
      cvv: this.addPayment.value.cvv,
      fechaCreacion: new Date(),
    
    }

    if(infoPayment.nombre == '' || infoPayment.email == '' || infoPayment.ciudad == '' || infoPayment.pueblo == '' ||infoPayment.direccion == '' 
     ||infoPayment.codigozip == '' ||infoPayment.yearcard == '' || infoPayment.namecard == ''
     ||infoPayment.cardnumber == '' ||infoPayment.mescard == '' ||infoPayment.cvv == ''){
      this.btnDisabled = false;
      this.toastr.error("Por favor rellene correctamente el formulario",'Error');
    }else{

    this._producService.OrdenPagoOnline(infoPayment).then(() =>{
      this.addPayment.reset();
      this.addPayment.value.uid = this.uidUser
      
      //this.router.navigate(['/departamento']);

    }).catch(error =>{
      this.toastr.error(error,'Error');
    })

    this._producService.OrdenPagoOnlineAdmin(infoPayment).then(() =>{
      this.addPayment.reset();
      this.toastr.success('Gracias Por su Compra','');
      
      this.addPayment.value.uid = this.uidUser
      
      this.router.navigate(['/graciasporcomprar']);

    }).catch(error =>{
      this.toastr.error(error,'Error');
    })

  }



  }










}






