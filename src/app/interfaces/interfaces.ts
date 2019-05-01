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
    materiales?:[];
    direcciones?:[];
    direccion?: Direccion;
    usuarios?: Usuario[];
    empleados?:[];
    empleado?: Empleado;
    clientes?:[];
    cliente?:Cliente;
    tareas?:Tarea[]
    tarea?: Tarea
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
    cantidad?: number;
}

export interface Empleado {
    id?: String;
    nombre:String;
    ap_paterno:String;
    ap_materno:String;
    direccion:String;
    id_direccion?:String;
}

export interface Cliente {
    id?: String;
    nombre: String;
    ap_paterno: String;
    ap_materno: String;
    direccion:String;
    id_direccion?:String;
    email?:String;
}

export interface Tarea{
    id?: String;
    nombre: String;
    tarifa_hora: number;
    estimado_horas: number;
    estado: String;
    fecha_termino?:String;
    estimado?: any;
    tarifa?: any;
}

export interface Orden {
    id?:String;
    cliente?:String;
    fecha_creacion:Date;
    fecha_requerida?:Date;
    fecha_termino?:Date;
    empleado?:String;
    direccion?:String;
    serie_tareas?:String[];
    lista_materiales?:MaterialesParaOrden[];
    tareas:String[];
}

export interface MaterialesParaOrden  {
    id:String;
    cantidad:number
}