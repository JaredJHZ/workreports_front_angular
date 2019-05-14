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
    usuarios?: Usuario[];
    empleados?:[];
    empleado?: Empleado;
    clientes?:[];
    cliente?:Cliente;
    tareas?:Tarea[];
    tarea?: Tarea;
    orden?:Orden;
    ordenes?:Orden[];
    usuario?:Usuario;
    error?:any;
    material?:Material;
}


export interface Material {
    id?: String;
    nombre: String;
    costo?:number;
    costo_unitario?: number;
    cantidad_estimada?:number;
    cantidad_utilizada?:number
}

export interface Empleado {
    id?: String;
    nombre:String;
    ap_paterno:String;
    ap_materno:String;
}

export interface Cliente {
    id?: String;
    nombre: String;
    ap_paterno: String;
    ap_materno: String;
    id_direccion?:String;
    email?:String;
    calle?:string;
    ciudad?:string;
    estado?:string;
    cp?:string;
}

export interface Tarea{
    id?: String;
    nombre: String;
    tarifa_hora: number;
    estimado_horas: number;
    estado: String;
    fecha_termino?:any;
    estimado?: any;
    tarifa?: any;
    horas_reales?:number;
    real_horas:any;
}

export interface Orden {
    id?:String;
    cliente?:String;
    fecha_creacion:Date;
    fecha_requerida?:Date;
    fecha_termino?:Date;
    empleado?:String;
    calle?:String;
    ciudad?:String;
    estado?:String;
    cp?:String;
    serie_de_tareas?:any;
    materiales?:MaterialesParaOrden[];
    tareas:String[];
    lista_de_materiales?:any;
}

export interface MaterialesParaOrden  {
    id:String;
    cantidad_estimada:number;
    cantidad_utilizada:number
}