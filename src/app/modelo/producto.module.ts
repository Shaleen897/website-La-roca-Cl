import { DocumentReference } from '@angular/fire/firestore';
import { User } from './user.module';


export class Producto{
    departamento?:string;
    producto?: string;
    img?: string;
    precio?: number;
    descuento?:number;
    existencia?: number;
    descripcion?:string;
    id?: string;
    fecha: Date;
    fechaActualizacion: Date;
}

export class Pedidodd{
    id?: string;
    uid?:string;
    cliente?: User;
    productos: ProductoPedido[];
    precioTotal: number;
    estado: EstadoPedido[];
    fecha: Date;
    cantidad: number;
}

export class ProductoPedido{
    producto?:Producto[];
    cantidad?: number;
   
}

export class Pedido{

    email?:string;
    codigo?:string;
    id?: string;
    producto?:string;
    cantidad?: number;
    precio?: number;
    img?:string;
    descuento?:number;
   
}

export type EstadoPedido = 'enviado' | 'visto' | 'camino' | 'entregado';

