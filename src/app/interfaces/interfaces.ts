export interface Usuario {
    id?:String;
    permission?: String;
    usuario?:String;
    password?:String;
    privilegios?:String;
}

export interface Token {
    sesion?: String;
}

export interface Respuesta {
    mensaje?: String;
    cliente?: {};
    materiales?:[];
    direcciones?:[];
    direccion?: Direccion;
    usuarios?: Usuario[];
}

export interface Direccion {
    id?: String;
    calle: String;
    ciudad: String;
    estado: String;
    cp: String;
}

export interface Material {
    id?: String;
    nombre: String;
    costo_unitario?: number;
}