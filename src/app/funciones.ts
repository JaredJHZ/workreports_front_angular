export let arreglarId = (id:String):String => {
    if(id.length < 5) {
        let size = id.length;
        let blankSpaces = 5 - size;
        let newId = '';
        for(let i = 0; i < blankSpaces ; i++) {
            newId+='0';
        }
        newId+=id;
        return newId;
    } else {
        return id;
    }
}

export let comprobarDatosQueNoEstenVacios = (objeto): String[] => {
    let camposVacios:String[] = [];
    Object.keys(objeto).map(
        (llave) => {
            if(objeto[llave] === '' || objeto[llave] === 0 || objeto[llave] === '00000' || objeto[llave]===null) {
                camposVacios.push(llave);
            }
        } 
    )

    return camposVacios;
}