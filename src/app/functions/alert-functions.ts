export const hiddeMensajeInX = (x: number, mensaje:String): void => {
    setTimeout(() => {
        return mensaje = '';
    }, x);
}