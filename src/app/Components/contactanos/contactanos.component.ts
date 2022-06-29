import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ServicioScrService } from 'src/app/servicioScr.service';

@Component({
  selector: 'app-contactanos',
  templateUrl: './contactanos.component.html',
  styleUrls: ['./contactanos.component.css']
})
export class ContactanosComponent implements OnInit {


  crearContacto: FormGroup;
  submitted = false;
  btnDisabled: boolean = false;

  constructor(private fb: FormBuilder,
    private _proService: ServicioScrService,
    private router: Router,
    private aRoute: ActivatedRoute,
    private toastr: ToastrService ) {
this.crearContacto = this.fb.group({
  nombre: ['', Validators.required],
  email: ['', Validators.required],
  telefono: ['', Validators.required],
  mensaje: ['', Validators.required]
}) }

  ngOnInit() {
  }

  agregarContacto(){
    this.submitted = true;

    const contacto: any ={
      nombre: this.crearContacto.value.nombre,
      email: this.crearContacto.value.email,
      telefono: this.crearContacto.value.telefono,
      mensaje: this.crearContacto.value.mensaje,
      fechaCreacion: new Date()
    }
    if(contacto.nombre == '' || contacto.email == '' || contacto.mensaje == '' || contacto.telefono == ''){
      this.btnDisabled = false;
      this.toastr.error("Por favor rellene correctamente el formulario",'Error');
    }else{
      this.btnDisabled = true;
    this._proService.agregarContacto(contacto).then(() =>{
      this.toastr.success('Enviada Correctamente','Informacion')
      this.crearContacto.reset();
      this.router.navigate(['./']);
    }).catch(error =>{
      this.toastr.error(error,'Error');
      console.log(error)
    })
  }
 }
}
