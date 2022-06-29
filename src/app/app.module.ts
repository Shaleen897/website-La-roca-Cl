import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './Components/navbar/navbar.component';

//Modulos Firebase
import { AngularFireModule } from '@angular/fire';
import {AngularFirestoreModule } from '@angular/fire/firestore';
import { environment } from 'src/environments/environment';


//toast
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';

import { FooterComponent } from './Components/footer/footer.component';
import { NosotrosComponent } from './Components/Nosotros/Nosotros.component';
import { BienvenidosComponent } from './Components/bienvenidos/bienvenidos.component';
import { ServicioScrService } from './servicioScr.service';
import { ContactanosComponent } from './Components/contactanos/contactanos.component';
import { LoginComponent } from './Components/login/login.component';
import { RegistroComponent } from './Components/registro/registro.component';
import { ConfiguracionService } from './servicios/configuracion.service';
import { LoginService } from './Components/login/login.service';
import { AuthGuard } from './Components/guardian/auth.guard';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { FlashMessagesModule } from 'angular2-flash-messages';
import { DepartamentosComponent } from './Components/departamentos/departamentos.component';
import { CarritoComponent } from './Components/carrito/carrito.component';
import { ProductoSlideComponent } from './Components/productoSlide/productoSlide.component';
import { PerfilClienteComponent } from './Components/perfil-cliente/perfil-cliente.component';
import { VentasComponent } from './Components/ventas/ventas.component';
import { FormuserComponent } from './Components/formuser/formuser.component';
import { CategoriasService } from './servicios/categorias.service';
import { DetalleProductoComponent } from './Components/detalleProducto/detalleProducto.component';
import { FormPaymentComponent } from './Components/formPayment/formPayment.component';

import { CarouselModule } from 'ngx-owl-carousel-o';
import { HttpClientModule } from '@angular/common/http';


import { AuthService } from './servicios/auth.service';
import { CartService } from './servicios/cart.service';
import { GraciasporcomprarComponent } from './Components/graciasporcomprar/graciasporcomprar.component';
import { OfertasproductoComponent } from './Components/ofertasproducto/ofertasproducto.component';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';
import { LoadingpageComponent } from './Components/loadingpage/loadingpage.component';



@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    FooterComponent,
    NosotrosComponent,
    BienvenidosComponent,
    ContactanosComponent,
    LoginComponent,
    RegistroComponent,
   DepartamentosComponent,
   CarritoComponent,
   ProductoSlideComponent,
   PerfilClienteComponent,
   VentasComponent,
   FormuserComponent,
   DetalleProductoComponent,
   FormPaymentComponent,
   GraciasporcomprarComponent,
   OfertasproductoComponent,
   LoadingpageComponent
   
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule,
    AngularFireAuthModule,
    ReactiveFormsModule,
    FormsModule,
    FlashMessagesModule.forRoot(),
    BrowserAnimationsModule,
    ToastrModule.forRoot({timeOut: 3000,
      positionClass: 'toast-bottom-right',
      preventDuplicates: true,
    }),
    CarouselModule,
    HttpClientModule,
    InfiniteScrollModule
  ],
  providers: [
    ServicioScrService,
    ConfiguracionService,
    LoginService,
    AuthGuard,
    CategoriasService,
    AuthService,
    CartService
    
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
