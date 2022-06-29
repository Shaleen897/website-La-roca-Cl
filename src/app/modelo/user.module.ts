export class User{
    uid?:string;
    id?: string;
    email?: string;
    imgUrl?: string;
    nombre?: string;
    apellido?: string;
    telefono?:number;
    direccion?: string;
    roles: Roles;
}


export class Roles{
    admin?:boolean;
    cliente?: boolean;
    
    
}




















