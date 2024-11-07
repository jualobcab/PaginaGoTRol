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
let estadisticasTotales; // Resultado de total

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

// JSON de situacion por parametro
const situacionDefensa = {
    "0":"Region arrasada y arruinada, desolada por la guerra o simplemente abandonada. Carece de estructuras defensa, y no dispone de infraestructuras para el desplazamiento de tropas. No tenéis ningún tipo de fortificación",
    "1-10":"Cultivos escasos, abundancia de tierras salvajes con algunos reductos desprotegidos de civilización, uno o dos caminos y tal vez una fortaleza menor",
    "11-20":"Varias tierras de cultivo, dispone de una fortaleza o baluarte menor y de algunos caminos, ríos o puertos",
    "21-30":"Posibilidad de cierta defensa; dispone de al menos una ciudad amurallada o castillo fortificado. Existen calzadas y caminos, y posiblemente tenga acceso a ríos o puertos",
    "31-40":"Buenas defensas, muy probablemente haya un castillo y algunas plazas fuertes más. Posee caminos y canales perfectamente transitables. Opcionalmente, podría contar con elementos naturales como montañas o pantanos que proporcionen fortificación adicional",
    "41-50":"Defensas excelentes, fortificaciones construidas por el hombre combinadas con un terreno accidentado que dificulta la invasión",
    "51-60":"Defensas extraordinarias; numerosas murallas y características del terreno que, combinadas, protegen a la región de todo ataque procedente del exterior",
    "61-70":"De las mejores defensas del mundo. Algunos ejemplos de este nivel de Defensa serían el Nido de Águilas y el valle de Arryn",
}
const situacionInfluencia = {
    "0":"El nombre y la historia de vuestra casa ha desaparecido de todos los anales; ya nadie habla de ella.",
    "1-10":"Caballero con tierras menor (o equivalente). Un ejemplo sería Craster",
    "11-20":"Caballero con tierras mayor (o equivalente). Algunas casas de ejemplo serían los Knott y Liddle del Norte",
    "21-30":"Una casa menor no demasiado grande. Algunos ejemplos serían la casa Mormont y la casa Westerling",
    "31-40":"Una casa menor. Entre los ejemplos pueden incluirse la casa Clegane, la casa Payne y la casa Karstark",
    "41-50":"Una casa menor de gran poder y con una historia pintoresca. Por ejemplo, las casas Florrent y Frey",
    "51-60":"Una de las grandes casa. Algunos ejemplos son la casa Tully y la casa Martell",
    "61-70":"La familia del Rey, la Mano del Rey, los Guardianes del Oriente, Occidente, Norte o Sur. Entre los ejemplos podríamos incluir las casas Arryn, Stark, Baratheon y Lannister",
}
const situacionTierras = {
    "0":"Sin tierras; la casa ha sido completamente despojada de todas sus heredades",
    "1-10":"Una pequeña extensión de terreno de tamaño no superior al de un pueblo",
    "11-20":"Unpequeño territorio insular, del tamaño de una isla pequeña o parte de una isla más grande, o bien una ciudad y sus alrededores (como la de la casa Mormont)",
    "21-30":"Una modesta extensión de terreno o una isla de tamaño medio, como la casa Frey",
    "31-40":"Una región que contiene varios terrenos, islas o archipiélagos; la casa Greyjoy, por ejemplo",
    "41-50":"Una heredad considerable que se extiende a gran distancia, y que posiblemente abarque distintos tipos de terreno. El control que ejerce la casa Martell sobre Dorne es representativo de este nivel de recursos",
    "51-60":"Una superficie inmensa del terreno que abarca una considerable porción de la geografía de Poniente. Los dominos de la casa Stark en el Norte son un buen ejemplo",
    "61-70":"La inmensa mayoría de los Siete Reinos (si no todos), como son las tierras del rey Robert y el linaje real de la casa Baratheon",
}
const situacionLey = {
    "0":"Región anárquica e incivilizada. No ejercéis ningún tipo de autoridad en ella; un ejemplo de este tipo de territorios serían los que hay más allá del Muro",
    "1-10":"Bandidos, salteadores y demás criminales campean a sus anchas por vuestras tierras, cometiendo fechorías y causando un sinnúmero de problemas",
    "11-20":"La anarquía y el bandidaje son un problema constante en los confines de vuestro territorio",
    "21-30":"Nivel medio en la mayor parte de Poniente. El crimen es habitual, pero no está fuera de control",
    "31-40":"Ejercéis un control considerable sobre vuestras tierras, y la tasa de criminalidad es reducida",
    "41-50":"Vuestra influencia y devoción a la hora de mantener la paz es tal que los crímenes son pocos e infrecuentes",
    "51-60":"Prácticamente no hay crímenes en vuestras tierras",
    "61-70":"No existe el crimen en vuestras tierras",
}
const situacionPoder = {
    "0":"Sin autoridad alguna; carecéis de tropas y soldados. Nadie profesa lealtad a vuestra familia",
    "1-10":"Guardia personal, uno o dos espadas juramentadas y una pequeña banda de guerreros plebeyos (en el mejor de los casos)",
    "11-20":"Un pequeño contingente de soldados compuesto en su mayoría por plebeyos",
    "21-30":"Un contingente modesto de soldados que incluye algunas tropas entrenadas",
    "31-40":"Contingente entrenado de soldados que incluye caballería y posiblemente navíos. Es posible que contéis con el servicio de una casa banderiza",
    "41-50":"Un ejército numeroso de soldados variados, entrenados y competentes. Probablemente tengáis a vuestro servicio una pequeña armada. Varias casas banderizas han jurado lealtad a vuestra familia",
    "51-60":"Podéis reunir un inmenso ejército de infantería compuesto por vuestros soldados y los de vuestras casas banderizas",
    "61-70":"Os respaldan los brazos armados de la mayoría de los Siete Reinos",
}
const situacionPoblacion = {
    "0":"Yelmo baldío. Nadie vive bajo vuestro gobierno",
    "1-10":"Población escasa. Hay varios asentamientos minúsculos dispersos por vuestras tierras",
    "11-20":"Pequeños población, ninguna comunidad mayor que una aldea",
    "21-30":"Población normal. La mayor parte de los plebeyos vive en granjas o aldeas, pero es posible que haya un par de pueblos y una comunidad de viviendas construidas en torno a vuestra fortaleza principal",
    "31-40":"Población moderada. Al menos un pueblo y varias aldeas de menor tamaño",
    "41-50":"Población numerosa. Mucha gente vive en vuestras tierras; la mayoría en alguna ciudad de gran tamaño o diseminada por varios pueblos más pequeños",
    "51-60":"Población inmensa. Una enorme cantidad de personas viven bajo la protección de vuestra familia",
    "61-70":"Toda o casi toda Poniente",
}
const situacionFortuna = {
    "0":"Indigente. Vuestra familia no tiene ni un mísero penique",
    "1-10":"Paupérrima. Vuestra familia carece de los recursos más esenciales y pasa muchas penurias para llegar a final de temporada",
    "11-20":"Pobre. Vuestra familia tiene pocos excesos. Aunque tiene lo suficiente para subsistir y abastecer sus heredades, no vivís rodeados de lujos",
    "21-30":"Normal. Vuestra familia tiene lo suficiente para ir tirando",
    "31-40":"Próspera. Vuestra familia tiene fondos suficientes para vivir de acuerdo con sun condición social",
    "41-50":"Acaudalada. Vuestra familia tiene más dinero del que necesita y vive cómodamente",
    "51-60":"Opulenta. A vuestra familia nunca le falta de nada",
    "61-70":"Decadente. Vuestra familia es tan rica que puede permitirse celebrar banquetes de setenta y siete platos",
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
    estadisticasTotales = new Region();
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

    pintarSituacion();
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
function pasarNumeroARango(numero) {
    let res="0";
    if (numero<=0){res = "0";}
    else if (numero<=10){res = "1-10";}
    else if (numero<=20){res = "11-20";}
    else if (numero<=30){res = "21-30";}
    else if (numero<=40){res = "31-40";}
    else if (numero<=50){res = "41-50";}
    else if (numero<=60){res = "51-60";}
    else {res = "61-70";}

    return res;
}

function pintarSituacion(){
    let listaHTML = '';
    listaHTML += '<ul>';
    listaHTML += '<li><strong>Defensa:</strong> '+situacionDefensa[pasarNumeroARango(estadisticasTotales.defensa)]+'</li>';
    listaHTML += '<li><strong>Influencia:</strong> '+situacionInfluencia[pasarNumeroARango(estadisticasTotales.influencia)]+'</li>';
    listaHTML += '<li><strong>Tierras:</strong> '+situacionTierras[pasarNumeroARango(estadisticasTotales.tierras)]+'</li>';
    listaHTML += '<li><strong>Ley:</strong> '+situacionLey[pasarNumeroARango(estadisticasTotales.ley)]+'</li>';
    listaHTML += '<li><strong>Población:</strong> '+situacionPoblacion[pasarNumeroARango(estadisticasTotales.poblacion)]+'</li>';
    listaHTML += '<li><strong>Poder:</strong> '+situacionPoder[pasarNumeroARango(estadisticasTotales.poder)]+'</li>';
    listaHTML += '<li><strong>Fortuna:</strong> '+situacionFortuna[pasarNumeroARango(estadisticasTotales.fortuna)]+'</li>';
    listaHTML += '</ul>';
    document.getElementById('situacionActual').innerHTML = listaHTML;
}