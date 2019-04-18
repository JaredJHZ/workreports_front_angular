export interface Usuario {
    permission?: String;
    usuario?:String;
    password?:String;
}

export interface Token {
    sesion?: String;
}

export interface Respuesta {
    mensaje?: String;
    cliente?: {};
    materiales?:[];
    direcciones?:[];
}
