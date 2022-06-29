import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BienvenidosComponent } from './Components/bienvenidos/bienvenidos.component';
import { NosotrosComponent } from './Components/Nosotros/Nosotros.component';
import { ContactanosComponent } from './Components/contactanos/contactanos.component';
import { LoginComponent } from './Components/login/login.component';
import { RegistroComponent } from './Components/registro/registro.component';
import { AuthGuard} from './Components/guardian/auth.guard';
import { DepartamentosComponent } from './Components/departamentos/departamentos.component';
import { CarritoComponent } from './Components/carrito/carrito.component';
import { ProductoSlideComponent } from './Components/productoSlide/productoSlide.component';
import { PerfilClienteComponent } from './Components/perfil-cliente/perfil-cliente.component';
import { VentasComponent } from './Components/ventas/ventas.component';
import { FormuserComponent } from './Components/formuser/formuser.component';
import { DetalleProductoComponent } from './Components/detalleProducto/detalleProducto.component';
import { FormPaymentComponent } from './Components/formPayment/formPayment.component';
import { GraciasporcomprarComponent } from './Components/graciasporcomprar/graciasporcomprar.component';
import { OfertasproductoComponent } from './Components/ofertasproducto/ofertasproducto.component';
import { LoadingpageComponent } from './Components/loadingpage/loadingpage.component';

const routes: Routes = [
  { path: 'bienvenido', component: BienvenidosComponent },
  { path: 'nosotros', component: NosotrosComponent},
  { path: 'contactanos', component: ContactanosComponent },
  { path: 'login', component: LoginComponent },
  { path: 'registro', component: RegistroComponent },
  { path: 'departamento', component: DepartamentosComponent },
  { path: 'carrito', component: CarritoComponent, canActivate: [AuthGuard] },
  { path: 'infocarrito/:id', component: CarritoComponent, canActivate: [AuthGuard] },
  { path: 'productoSlider', component: ProductoSlideComponent },
  { path: 'infoperfil', component: PerfilClienteComponent, canActivate: [AuthGuard] },
  { path: 'ventas', component: VentasComponent, canActivate: [AuthGuard]  },
  { path: 'formuser', component:  FormuserComponent, canActivate: [AuthGuard]  },
  { path: 'detalle/:id', component: DetalleProductoComponent },
  { path: 'payment/:id', component: FormPaymentComponent, canActivate: [AuthGuard]  },
  { path: 'graciasporcomprar', component: GraciasporcomprarComponent, canActivate: [AuthGuard]  },
  { path: 'oferta', component: OfertasproductoComponent },
  { path: 'loading', component: LoadingpageComponent },
  { path: '**', redirectTo: 'bienvenido', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
