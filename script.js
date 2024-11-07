"use strict";

////////////////////////////////////////////////////////
//////////       FUNTIONS      /////////////////////////
////////////////////////////////////////////////////////
// Definir variables
let region = new Region();
let sucesosRegion = []; // Array de sucesos
let cambiosSucesos= new Region();
let zonaElegida = ''; // Nombre del reino
let epocaFundacion = ''; // Edad en la que se fundo la casa
let regionFinal = new Region(); // Resultado de total

// Variables auxiliares
let tirada;

// JSON de zonas
const zonas = {
    "Desembarco del Rey": new Region(5, -5, -5, 20, 5, -5, -5),
    "Rocadragón": new Region(20, -5, -5, 5, 0, 0, -5),
    "El Norte": new Region(5, 10, 20, -10, -5, -5, -5),
    "Las Islas del Hierro": new Region(10, -5, -5, 0, 0, 10, 0),
    "Las Tierras del los Ríos": new Region(-5, -5, 5, 0, 10, 0, 5),
    "Montañas de la Luna": new Region(20, 10, -5, -10, -5, 0, 0),
    "Las Tierras de Occidente": new Region(-5, 10, -5, -5, -5, 0, 20),
    "El Dominio": new Region(-5, 10, 0, -5, 5, 0, 5),
    "Las Tierras de la Tormenta": new Region(5, 0, -5, 10, -5, 5, 0),
    "Dorne": new Region(0, -5, 10, -5, 0, 10, 0)
};
const zonas_resultado = {
    3:"Desembarco del Rey",
    4:"Rocadragón",
    5:"El Norte",
    6:"El Norte",
    7:"Las Islas del Hierro",
    8:"Las Tierras del los Ríos",
    9:"Las Tierras del los Ríos",
    10:"Montañas de la Luna",
    11:"Montañas de la Luna",
    12:"Las Tierras de Occidente",
    13:"Las Tierras de Occidente",
    14:"El Dominio",
    15:"El Dominio",
    16:"Las Tierras de la Tormenta",
    17:"Las Tierras de la Tormenta",
    18:"Dorne",
};

// JSON de localización de las imagenes
const fotosReinos = {
    "Desembarco del Rey": "images/Tierras_de_la_Corona.webp",
    "Rocadragón": "images/Rocadragon.webp",
    "El Norte": "images/El_Norte.webp",
    "Las Islas del Hierro": "images/Islas_del_Hierro.webp",
    "Las Tierras del los Ríos": "images/Tierras_de_los_rios.webp",
    "Montañas de la Luna": "images/Valle_de_Arryn.webp",
    "Las Tierras de Occidente": "images/El_Occidente.webp",
    "El Dominio": "images/El_Dominio.webp",
    "Las Tierras de la Tormenta": "images/Tierras_de_Tormentas.webp",
    "Dorne": "images/Dorne.webp"
};

// JSON de fundación
const fundacion_resultado = {
    1:"Ancestral",
    2:"Muy Antigua",
    3:"Antigua",
    4:"Arraigada",
    5:"Reciente",
    6:"Nueva"
}
const fundacion = {
    "Ancestral":"1d6+3",
    "Muy Antigua":"1d6+2",
    "Antigua":"1d6+1",
    "Arraigada":"1d6",
    "Reciente":"1d6-1",
    "Nueva":"1d6-2"
}

// JSON de sucesos
const sucesos_resultado = {
    3:"Calamidad",
    4:"Derrota",
    5:"Catástrofe",
    6:"Locura",
    7:"Invasión/Revelión",
    8:"Escándalo",
    9:"Traición",
    10:"Declive",
    11:"Infraestructura",
    12:"Auge",
    13:"Favor",
    14:"Victoria",
    15:"Villano",
    16:"Gloria",
    17:"Conquista",
    18:"Ventura",
}
const sucesos = {
    "Calamidad":new Region("-2d6","-2d6","-2d6","-2d6","-2d6","-2d6","-2d6"),
    "Derrota":new Region("-1d6","-1d6","-1d6","","-1d6","-1d6","-1d6"),
    "Catástrofe":new Region("","","","-1d6","-1d6","-1d6","-1d6"),
    "Locura":new Region("+6-2d6","+6-2d6","+6-2d6","+6-2d6","+6-2d6","+6-2d6","+6-2d6"),
    "Invasión/Revelión":new Region("","","","-2d6","-1d6","-1d6","-1d6"),
    "Escándalo":new Region("","-1d6","-1d6","","","-1d6",""),
    "Traición":new Region("","-1d6","","-1d6","","+1d6",""),
    "Declive":new Region("","-1d6","-1d6","-1d6","","-1d6","-1d6"),
    "Infraestructura": new Region("special","","","","","",""),
    "Auge":new Region("","+1d6","+1d6","","","+1d6","+1d6"),
    "Favor":new Region("","+1d6","+1d6","+1d6","","+1d6",""),
    "Victoria":new Region("+1d6","+1d6","","","","+1d6",""),
    "Villano":new Region("","+1d6","","-1d6","-1d6","+1d6",""),
    "Gloria":new Region("+1d6","+1d6","","+1d6","","+1d6",""),
    "Conquista":new Region("-1d6","+1d6","+1d6","-1d6","+1d6","","+1d6"),
    "Ventura":new Region("+1d6","+2d6","+1d6","+1d6","+2d6","","+2d6"),
}

// Constructor
function Region(){
    this.defensa = 0;
    this.influencia = 0;
    this.tierras = 0;
    this.ley = 0;
    this.poblacion = 0;
    this.poder = 0;
    this.fortuna = 0;
}
function Region(defensa,influencia,tierras,ley,poblacion,poder,fortuna) {
    this.defensa = defensa;
    this.influencia = influencia;
    this.tierras = tierras;
    this.ley = ley;
    this.poblacion = poblacion;
    this.poder = poder;
    this.fortuna = fortuna;
}

// Funciones para las estadísticas
function tirarDados(cantidad=1,caras=6){
    let sum = 0;
    for (var i = 0; i<cantidad; i++){
        sum+= (Math.floor(Math.random()*(caras)+1));
    };
    return sum
}
Region.prototype.generarEstadistica = function(bono=0){return this.tirarDados(cantidad=7+bono)};
Region.prototype.mostrarSuceso = function(){return `Defensa: ${this.defensa}, Influencia: ${this.influencia}, Tierras: ${this.tierras}, Ley: ${this.ley}, Poblacion: ${this.poblacion}, Poder: ${this.poder}, Fortuna: ${this.fortuna}`};

// Funciones grandes
function generarReino(){
    tirada = tirarDados(3);
    zonaElegida = zonas_resultado[tirada];

    document.getElementById('reino').innerHTML = zonas_resultado[tirada];
    document.getElementById('defensaReino').innerHTML = zonas[zonas_resultado[tirada]].defensa;
    document.getElementById('influenciaReino').innerHTML = zonas[zonas_resultado[tirada]].influencia;
    document.getElementById('tierrasReino').innerHTML = zonas[zonas_resultado[tirada]].tierras;
    document.getElementById('leyReino').innerHTML = zonas[zonas_resultado[tirada]].ley;
    document.getElementById('poblacionReino').innerHTML = zonas[zonas_resultado[tirada]].poblacion;
    document.getElementById('poderReino').innerHTML = zonas[zonas_resultado[tirada]].poder;
    document.getElementById('fortunaReino').innerHTML = zonas[zonas_resultado[tirada]].fortuna;

    // Poner la imagen del reino correspondiente
    document.getElementById('fotoRegion').innerHTML = `<img src='${fotosReinos[zonaElegida]}' alt='Mapa de ${zonaElegida}'>`;
}

function generarTiradasIniciales(){
    region = new Region(tirarDados(7),tirarDados(7),tirarDados(7),tirarDados(7),tirarDados(7),tirarDados(7),tirarDados(8));

    document.getElementById('defensa').innerHTML = region.defensa;
    document.getElementById('influencia').innerHTML = region.influencia;
    document.getElementById('tierras').innerHTML = region.tierras;
    document.getElementById('ley').innerHTML = region.ley;
    document.getElementById('poblacion').innerHTML = region.poblacion;
    document.getElementById('poder').innerHTML = region.poder;
    document.getElementById('fortuna').innerHTML = region.fortuna;
}

function generarSucesos(){
    // Generar un array de sucesos, que sean "Reinos" y los almacene
    tirada = tirarDados();
    sucesosRegion=[];
    epocaFundacion = fundacion_resultado[tirada];

    let numSucesos = parsearTiradasFundacion(fundacion[epocaFundacion]);
    //console.log(`Fundación: ${epocaFundacion}, Número de Sucesos: ${numSucesos}`);

    for (var i = 0; i<numSucesos; i++){
        tirada = tirarDados(3);
        let suceso = sucesos_resultado[tirada];
        let modificadorSuceso = parseoSuceso(sucesos[suceso]);
        let s = [suceso, modificadorSuceso];
        sucesosRegion.push(s);
    }
    
    let listaHTML = '';
    listaHTML+='<ul>';
    sucesosRegion.forEach(s => {
        listaHTML += '<li><strong>'+s[0]+':</strong> '+s[1].mostrarSuceso()+'</li>'
    });
    listaHTML += '</ul>';
    document.getElementById('sucesosHistoricos').innerHTML = listaHTML;

    pintarSucesos();
}

function recuentoSucesos(array){
    let defensaSuceso=0;
    let influenciaSuceso=0;
    let tierrasSuceso=0;
    let leySuceso=0;
    let poblacionSuceso=0;
    let poderSuceso=0;
    let fortunaSuceso=0;

    array.forEach(s => {
        defensaSuceso += s[1].defensa;
        influenciaSuceso += s[1].influencia;
        tierrasSuceso += s[1].tierras;
        leySuceso += s[1].ley;
        poblacionSuceso += s[1].poblacion;
        poderSuceso += s[1].poder;
        fortunaSuceso += s[1].fortuna;
    });

    let res = new Region(defensaSuceso, influenciaSuceso, tierrasSuceso, leySuceso, poblacionSuceso, poderSuceso, fortunaSuceso);
    return res;
}

function pintarSucesos(){
    let sucesosModificaciones = recuentoSucesos(sucesosRegion);

    document.getElementById('defensaSucesos').innerHTML = sucesosModificaciones.defensa;
    document.getElementById('influenciaSucesos').innerHTML = sucesosModificaciones.influencia;
    document.getElementById('tierrasSucesos').innerHTML = sucesosModificaciones.tierras;
    document.getElementById('leySucesos').innerHTML = sucesosModificaciones.ley;
    document.getElementById('poblacionSucesos').innerHTML = sucesosModificaciones.poblacion;
    document.getElementById('poderSucesos').innerHTML = sucesosModificaciones.poder;
    document.getElementById('fortunaSucesos').innerHTML = sucesosModificaciones.fortuna;
}

function pintarTotal(){
    let sucesosTotal = recuentoSucesos(sucesosRegion);
    let estadisticasTotales=new Region();
    let modificadoresReino = zonas[zonaElegida];

    estadisticasTotales = new Region(
        (sucesosTotal.defensa+region.defensa+modificadoresReino.defensa),
        (sucesosTotal.influencia+region.influencia+modificadoresReino.influencia),
        (sucesosTotal.tierras+region.tierras+modificadoresReino.tierras),
        (sucesosTotal.ley+region.ley+modificadoresReino.ley),
        (sucesosTotal.poblacion+region.poblacion+modificadoresReino.poblacion),
        (sucesosTotal.poder+region.poder+modificadoresReino.poder),
        (sucesosTotal.fortuna+region.fortuna+modificadoresReino.fortuna),
    );

    document.getElementById('defensaTotal').innerHTML = estadisticasTotales.defensa;
    document.getElementById('influenciaTotal').innerHTML = estadisticasTotales.influencia;
    document.getElementById('tierrasTotal').innerHTML = estadisticasTotales.tierras;
    document.getElementById('leyTotal').innerHTML = estadisticasTotales.ley;
    document.getElementById('poblacionTotal').innerHTML = estadisticasTotales.poblacion;
    document.getElementById('poderTotal').innerHTML = estadisticasTotales.poder;
    document.getElementById('fortunaTotal').innerHTML = estadisticasTotales.fortuna;
}

// Parsers
function parsearTiradasSucesos(texto){
    let res = 0;
    
    if (texto.length===0){
        res = 0;
    }
    else if (texto.charAt(0)=="-") {
        texto = texto.slice(1).split("d");
        res = -tirarDados(parseInt(texto[0]),parseInt(texto[1]));
    }
    else if (texto.charAt(0)=="+") {
        if (texto=="+6-2d6"){
            texto = texto.slice(1).split("-");
            res = parseInt(texto[0])-tirarDados(parseInt(texto[1].charAt(0)))
        }
        else {
            texto = texto.slice(1).split("d");
            res = tirarDados(parseInt(texto[0]),parseInt(texto[1]));
        }
    }
    return res;
}
function parsearTiradasFundacion(texto){
    if (texto.length==3){
        texto = tirarDados();
    }
    else {
        if (texto.charAt(3)=="+"){
            texto = texto.split("+");
            texto = tirarDados()+parseInt(texto[1]);
        }
        else if (texto.charAt(3)=="-"){
            texto = texto.split("-")
            texto = tirarDados()-parseInt(texto[1]);
        }
    }
    return texto
}
function parseoSuceso(modificadores){
    let res = new Region();
    res.defensa = parsearTiradasSucesos(modificadores.defensa);
    res.influencia = parsearTiradasSucesos(modificadores.influencia);
    res.tierras = parsearTiradasSucesos(modificadores.tierras);
    res.ley = parsearTiradasSucesos(modificadores.ley);
    res.poblacion = parsearTiradasSucesos(modificadores.poblacion);
    res.poder = parsearTiradasSucesos(modificadores.poder);
    res.fortuna = parsearTiradasSucesos(modificadores.fortuna);

    return res;
}