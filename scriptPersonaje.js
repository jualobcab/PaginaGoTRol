"use strict";

////////////////////////////////////////////////////////
//////////       FUNTIONS      /////////////////////////
////////////////////////////////////////////////////////
// Definir variables
let personaje;

// JSONS
const edades = {
    "Ninyo":new Edad(120,40,4,7),
    "Adolescente":new Edad(150,40,4,6),
    "Joven":new Edad(180,60,5,5),
    "Adulto":new Edad(210,80,7,4),
    "Mediana Edad":new Edad(240,100,6,3),
    "Anciano":new Edad(270,160,5,2),
    "Muy Anciano":new Edad(330,200,5,1),
    "Venerable":new Edad(360,240,5,0)
}

const especialidadesPorHabilidad = {
    "acrobacia":"agilidad",
    "contorsionismo":"agilidad",
    "equilibrio":"agilidad",
    "esquivar":"agilidad",
    "rapidez":"agilidad",

    "arrojar":"brio",
    "correr":"brio",
    "fuerza":"brio",
    "nadar":"brio",
    "saltar":"brio",
    "trepar":"brio",

    "contundente":"combate",
    "asta":"combate",
    "hojaCorta":"combate",
    "hojaLarga":"combate",
    "escudo":"combate",
    "esgrima":"combate",
    "hacha":"combate",
    "lanza":"combate",
    "pelea":"combate",

    "callejeo":"conocimiento",
    "educacion":"conocimiento",
    "investigacion":"conocimiento",

    "diagnosticar":"curacion",
    "tratarDolencia":"curacion",
    "tratarHerida":"curacion",

    "recuperacion":"constitucion",
    "resistencia":"constitucion",

    "pasarInadvertido":"discrecion",
    "sigilo":"discrecion",

    "actuar":"enganyo",
    "disfrazarse":"enganyo",
    "fulleria":"enganyo",
    "mentir":"enganyo",

    "administracion":"estatus",
    "etiqueta":"estatus",
    "reputacion":"estatus",
    "torneos":"estatus",

    "estrategia":"guerra",
    "mando":"guerra",
    "tactica":"guerra",

    //"":"idioma",

    "descifrar":"ingenio",
    "logica":"ingenio",
    "memoria":"ingenio",

    "empatia":"percepcion",
    "observacion":"percepcion",
    
    "cautivar":"persuasion",
    "convencer":"persuasion",
    "incitar":"persuasion",
    "intimidar":"persuasion",
    "negociar":"persuasion",
    "provocar":"persuasion",
    "seducir":"persuasion",

    "forzarCerraduras":"picaresca",
    "juegoDeManos":"picaresca",
    "robar":"picaresca",

    "armasArrojadizas":"punteria",
    "arcos":"punteria",
    "asedio":"punteria",
    "ballestas":"punteria",

    "cazar":"supervivencia",
    "forrajear":"supervivencia",
    "orientarse":"supervivencia",
    "rastrear":"supervivencia",

    "adiestrar":"tratoAnimal",
    "cautivarAnimal":"tratoAnimal",
    "conducir":"tratoAnimal",
    "montar":"tratoAnimal",

    "coordinacion":"voluntad",
    "coraje":"voluntad",
    "dedicacion":"voluntad",
}

// Constructores
function Personaje(edad){
    this.nombre = ""; // Hacer que sea el nombre indicado
    this.edad = edades[edad];
    
    this.agilidad = new Agilidad(2);
    this.brio = new Brio(2);
    this.combate = new Combate(2);
    this.conocimiento = new Conocimiento(2);
    this.constitucion = new Constitucion(2);
    this.curacion = new Curacion(2);
    this.discrecion = new Discrecion(2);
    this.enganyo = new Enganyo(2);
    this.estatus = new Estatus(2);
    this.guerra = new Guerra(2);
    this.idioma = new Idioma(2);
    this.ingenio = new Ingenio(2);
    this.percepcion = new Percepcion(2);
    this.persuasion = new Persuasion(2);
    this.picaresca = new Picaresca(2);
    this.punteria = new Punteria(2);
    this.supervivencia = new Supervivencia(2);
    this.tratoAnimal = new TratoAnimal(2);
    this.voluntad = new Voluntad(2);

    this.cualidades = {
        "Beneficios":[],
        "Desventajas":[],
    };
}
Personaje.prototype.cambiarAgilidad = function(cambio){
    if (cambio==1 && this.edad.maxHabilidad>this.agilidad.rango){
        this.agilidad.rango += cambio;
        if (this.agilidad.rango==3){
            this.edad.cambiarXpHabilidades(-10);
        }
        else {
            this.edad.cambiarXpHabilidades(-30);
        }
    }
    else if (cambio==-1 && this.agilidad.rango>Math.abs(cambio)){
        this.agilidad.rango += cambio;
        if (this.agilidad.rango==2){
            this.edad.cambiarXpHabilidades(10);
        }
        else if(this.agilidad.rango==1){
            this.edad.cambiarXpHabilidades(50);
        }
        else if(this.agilidad.rango>2){
            this.edad.cambiarXpHabilidades(30);
        }
    }
}
Personaje.prototype.cambiarBrio = function(cambio){
    if (cambio==1 && this.edad.maxHabilidad>this.brio.rango){
        this.brio.rango += cambio;
        if (this.brio.rango==3){
            this.edad.cambiarXpHabilidades(-10);
        }
        else {
            this.edad.cambiarXpHabilidades(-30);
        }
    }
    else if (cambio==-1 && this.brio.rango>Math.abs(cambio)){
        this.brio.rango += cambio;
        if (this.brio.rango==2){
            this.edad.cambiarXpHabilidades(10);
        }
        else if(this.brio.rango==1){
            this.edad.cambiarXpHabilidades(50);
        }
        else if(this.brio.rango>2){
            this.edad.cambiarXpHabilidades(30);
        }
    }
}
Personaje.prototype.cambiarCombate = function(cambio){
    if (cambio==1 && this.edad.maxHabilidad>this.combate.rango){
        this.combate.rango += cambio;
        if (this.combate.rango==3){
            this.edad.cambiarXpHabilidades(-10);
        }
        else {
            this.edad.cambiarXpHabilidades(-30);
        }
    }
    else if (cambio==-1 && this.combate.rango>Math.abs(cambio)){
        this.combate.rango += cambio;
        if (this.combate.rango==2){
            this.edad.cambiarXpHabilidades(10);
        }
        else if(this.combate.rango==1){
            this.edad.cambiarXpHabilidades(50);
        }
        else if(this.combate.rango>2){
            this.edad.cambiarXpHabilidades(30);
        }
    }
}
Personaje.prototype.cambiarConocimiento = function(cambio){
    if (cambio==1 && this.edad.maxHabilidad>this.conocimiento.rango){
        this.conocimiento.rango += cambio;
        if (this.conocimiento.rango==3){
            this.edad.cambiarXpHabilidades(-10);
        }
        else {
            this.edad.cambiarXpHabilidades(-30);
        }
    }
    else if (cambio==-1 && this.conocimiento.rango>Math.abs(cambio)){
        this.conocimiento.rango += cambio;
        if (this.conocimiento.rango==2){
            this.edad.cambiarXpHabilidades(10);
        }
        else if(this.conocimiento.rango==1){
            this.edad.cambiarXpHabilidades(50);
        }
        else if(this.conocimiento.rango>2){
            this.edad.cambiarXpHabilidades(30);
        }
    }
}
Personaje.prototype.cambiarConstitucion = function(cambio){
    if (cambio==1 && this.edad.maxHabilidad>this.constitucion.rango){
        this.constitucion.rango += cambio;
        if (this.constitucion.rango==3){
            this.edad.cambiarXpHabilidades(-10);
        }
        else {
            this.edad.cambiarXpHabilidades(-30);
        }
    }
    else if (cambio==-1 && this.constitucion.rango>Math.abs(cambio)){
        this.constitucion.rango += cambio;
        if (this.constitucion.rango==2){
            this.edad.cambiarXpHabilidades(10);
        }
        else if(this.constitucion.rango==1){
            this.edad.cambiarXpHabilidades(50);
        }
        else if(this.constitucion.rango>2){
            this.edad.cambiarXpHabilidades(30);
        }
    }
}
Personaje.prototype.cambiarCuracion = function(cambio){
    if (cambio==1 && this.edad.maxHabilidad>this.curacion.rango){
        this.curacion.rango += cambio;
        if (this.curacion.rango==3){
            this.edad.cambiarXpHabilidades(-10);
        }
        else {
            this.edad.cambiarXpHabilidades(-30);
        }
    }
    else if (cambio==-1 && this.curacion.rango>Math.abs(cambio)){
        this.curacion.rango += cambio;
        if (this.curacion.rango==2){
            this.edad.cambiarXpHabilidades(10);
        }
        else if(this.curacion.rango==1){
            this.edad.cambiarXpHabilidades(50);
        }
        else if(this.curacion.rango>2){
            this.edad.cambiarXpHabilidades(30);
        }
    }
}
Personaje.prototype.cambiarDiscrecion = function(cambio){
    if (cambio==1 && this.edad.maxHabilidad>this.discrecion.rango){
        this.discrecion.rango += cambio;
        if (this.discrecion.rango==3){
            this.edad.cambiarXpHabilidades(-10);
        }
        else {
            this.edad.cambiarXpHabilidades(-30);
        }
    }
    else if (cambio==-1 && this.discrecion.rango>Math.abs(cambio)){
        this.discrecion.rango += cambio;
        if (this.discrecion.rango==2){
            this.edad.cambiarXpHabilidades(10);
        }
        else if(this.discrecion.rango==1){
            this.edad.cambiarXpHabilidades(50);
        }
        else if(this.discrecion.rango>2){
            this.edad.cambiarXpHabilidades(30);
        }
    }
}
Personaje.prototype.cambiarEnganyo = function(cambio){
    if (cambio==1 && this.edad.maxHabilidad>this.enganyo.rango){
        this.enganyo.rango += cambio;
        if (this.enganyo.rango==3){
            this.edad.cambiarXpHabilidades(-10);
        }
        else {
            this.edad.cambiarXpHabilidades(-30);
        }
    }
    else if (cambio==-1 && this.enganyo.rango>Math.abs(cambio)){
        this.enganyo.rango += cambio;
        if (this.enganyo.rango==2){
            this.edad.cambiarXpHabilidades(10);
        }
        else if(this.enganyo.rango==1){
            this.edad.cambiarXpHabilidades(50);
        }
        else if(this.enganyo.rango>2){
            this.edad.cambiarXpHabilidades(30);
        }
    }
}
Personaje.prototype.cambiarEstatus = function(cambio){
    if (cambio==1 && this.edad.maxHabilidad>this.estatus.rango){
        this.estatus.rango += cambio;
        if (this.estatus.rango==3){
            this.edad.cambiarXpHabilidades(-10);
        }
        else {
            this.edad.cambiarXpHabilidades(-30);
        }
    }
    else if (cambio==-1 && this.estatus.rango>Math.abs(cambio)){
        this.estatus.rango += cambio;
        if (this.estatus.rango==2){
            this.edad.cambiarXpHabilidades(10);
        }
        else if(this.estatus.rango==1){
            this.edad.cambiarXpHabilidades(50);
        }
        else if(this.estatus.rango>2){
            this.edad.cambiarXpHabilidades(30);
        }
    }
}
Personaje.prototype.cambiarGuerra = function(cambio){
    if (cambio==1 && this.edad.maxHabilidad>this.guerra.rango){
        this.guerra.rango += cambio;
        if (this.guerra.rango==3){
            this.edad.cambiarXpHabilidades(-10);
        }
        else {
            this.edad.cambiarXpHabilidades(-30);
        }
    }
    else if (cambio==-1 && this.guerra.rango>Math.abs(cambio)){
        this.guerra.rango += cambio;
        if (this.guerra.rango==2){
            this.edad.cambiarXpHabilidades(10);
        }
        else if(this.guerra.rango==1){
            this.edad.cambiarXpHabilidades(50);
        }
        else if(this.guerra.rango>2){
            this.edad.cambiarXpHabilidades(30);
        }
    }
}
Personaje.prototype.cambiarIdioma = function(cambio){
    if (cambio==1 && this.edad.maxHabilidad>this.idioma.rango){
        this.idioma.rango += cambio;
        if (this.idioma.rango==3){
            this.edad.cambiarXpHabilidades(-10);
        }
        else {
            this.edad.cambiarXpHabilidades(-30);
        }
    }
    else if (cambio==-1 && this.idioma.rango>Math.abs(cambio)){
        this.idioma.rango += cambio;
        if (this.idioma.rango==2){
            this.edad.cambiarXpHabilidades(10);
        }
        else if(this.idioma.rango==1){
            this.edad.cambiarXpHabilidades(50);
        }
        else if(this.idioma.rango>2){
            this.edad.cambiarXpHabilidades(30);
        }
    }
}
Personaje.prototype.cambiarIngenio = function(cambio){
    if (cambio==1 && this.edad.maxHabilidad>this.ingenio.rango){
        this.ingenio.rango += cambio;
        if (this.ingenio.rango==3){
            this.edad.cambiarXpHabilidades(-10);
        }
        else {
            this.edad.cambiarXpHabilidades(-30);
        }
    }
    else if (cambio==-1 && this.ingenio.rango>Math.abs(cambio)){
        this.ingenio.rango += cambio;
        if (this.ingenio.rango==2){
            this.edad.cambiarXpHabilidades(10);
        }
        else if(this.ingenio.rango==1){
            this.edad.cambiarXpHabilidades(50);
        }
        else if(this.ingenio.rango>2){
            this.edad.cambiarXpHabilidades(30);
        }
    }
}
Personaje.prototype.cambiarPercepcion = function(cambio){
    if (cambio==1 && this.edad.maxHabilidad>this.percepcion.rango){
        this.percepcion.rango += cambio;
        if (this.percepcion.rango==3){
            this.edad.cambiarXpHabilidades(-10);
        }
        else {
            this.edad.cambiarXpHabilidades(-30);
        }
    }
    else if (cambio==-1 && this.percepcion.rango>Math.abs(cambio)){
        this.percepcion.rango += cambio;
        if (this.percepcion.rango==2){
            this.edad.cambiarXpHabilidades(10);
        }
        else if(this.percepcion.rango==1){
            this.edad.cambiarXpHabilidades(50);
        }
        else if(this.percepcion.rango>2){
            this.edad.cambiarXpHabilidades(30);
        }
    }
}
Personaje.prototype.cambiarPersuasion = function(cambio){
    if (cambio==1 && this.edad.maxHabilidad>this.persuasion.rango){
        this.persuasion.rango += cambio;
        if (this.persuasion.rango==3){
            this.edad.cambiarXpHabilidades(-10);
        }
        else {
            this.edad.cambiarXpHabilidades(-30);
        }
    }
    else if (cambio==-1 && this.persuasion.rango>Math.abs(cambio)){
        this.persuasion.rango += cambio;
        if (this.persuasion.rango==2){
            this.edad.cambiarXpHabilidades(10);
        }
        else if(this.persuasion.rango==1){
            this.edad.cambiarXpHabilidades(50);
        }
        else if(this.persuasion.rango>2){
            this.edad.cambiarXpHabilidades(30);
        }
    }
}
Personaje.prototype.cambiarPicaresca = function(cambio){
    if (cambio==1 && this.edad.maxHabilidad>this.picaresca.rango){
        this.picaresca.rango += cambio;
        if (this.picaresca.rango==3){
            this.edad.cambiarXpHabilidades(-10);
        }
        else {
            this.edad.cambiarXpHabilidades(-30);
        }
    }
    else if (cambio==-1 && this.picaresca.rango>Math.abs(cambio)){
        this.picaresca.rango += cambio;
        if (this.picaresca.rango==2){
            this.edad.cambiarXpHabilidades(10);
        }
        else if(this.picaresca.rango==1){
            this.edad.cambiarXpHabilidades(50);
        }
        else if(this.picaresca.rango>2){
            this.edad.cambiarXpHabilidades(30);
        }
    }
}
Personaje.prototype.cambiarPunteria = function(cambio){
    if (cambio==1 && this.edad.maxHabilidad>this.punteria.rango){
        this.punteria.rango += cambio;
        if (this.punteria.rango==3){
            this.edad.cambiarXpHabilidades(-10);
        }
        else {
            this.edad.cambiarXpHabilidades(-30);
        }
    }
    else if (cambio==-1 && this.punteria.rango>Math.abs(cambio)){
        this.punteria.rango += cambio;
        if (this.punteria.rango==2){
            this.edad.cambiarXpHabilidades(10);
        }
        else if(this.punteria.rango==1){
            this.edad.cambiarXpHabilidades(50);
        }
        else if(this.punteria.rango>2){
            this.edad.cambiarXpHabilidades(30);
        }
    }
}
Personaje.prototype.cambiarSupervivencia = function(cambio){
    if (cambio==1 && this.edad.maxHabilidad>this.supervivencia.rango){
        this.supervivencia.rango += cambio;
        if (this.supervivencia.rango==3){
            this.edad.cambiarXpHabilidades(-10);
        }
        else {
            this.edad.cambiarXpHabilidades(-30);
        }
    }
    else if (cambio==-1 && this.supervivencia.rango>Math.abs(cambio)){
        this.supervivencia.rango += cambio;
        if (this.supervivencia.rango==2){
            this.edad.cambiarXpHabilidades(10);
        }
        else if(this.supervivencia.rango==1){
            this.edad.cambiarXpHabilidades(50);
        }
        else if(this.supervivencia.rango>2){
            this.edad.cambiarXpHabilidades(30);
        }
    }
}
Personaje.prototype.cambiarTratoAnimal = function(cambio){
    if (cambio==1 && this.edad.maxHabilidad>this.tratoAnimal.rango){
        this.tratoAnimal.rango += cambio;
        if (this.tratoAnimal.rango==3){
            this.edad.cambiarXpHabilidades(-10);
        }
        else {
            this.edad.cambiarXpHabilidades(-30);
        }
    }
    else if (cambio==-1 && this.tratoAnimal.rango>Math.abs(cambio)){
        this.tratoAnimal.rango += cambio;
        if (this.tratoAnimal.rango==2){
            this.edad.cambiarXpHabilidades(10);
        }
        else if(this.tratoAnimal.rango==1){
            this.edad.cambiarXpHabilidades(50);
        }
        else if(this.tratoAnimal.rango>2){
            this.edad.cambiarXpHabilidades(30);
        }
    }
}
Personaje.prototype.cambiarVoluntad = function(cambio){
    if (cambio==1 && this.edad.maxHabilidad>this.voluntad.rango){
        this.voluntad.rango += cambio;
        if (this.voluntad.rango==3){
            this.edad.cambiarXpHabilidades(-10);
        }
        else {
            this.edad.cambiarXpHabilidades(-30);
        }
    }
    else if (cambio==-1 && this.voluntad.rango>Math.abs(cambio)){
        this.voluntad.rango += cambio;
        if (this.voluntad.rango==2){
            this.edad.cambiarXpHabilidades(10);
        }
        else if(this.voluntad.rango==1){
            this.edad.cambiarXpHabilidades(50);
        }
        else if(this.voluntad.rango>2){
            this.edad.cambiarXpHabilidades(30);
        }
    }
}

function Cualidad(){
    this.nombre = "";
    this.requisitos = "";
    this.efectos = "";
}
function Edad(xpHabilidades,xpEspecialidades,maxHabilidad,puntosDestino){
    this.xpHabilidades=xpHabilidades;
    this.xpEspecialidades=xpEspecialidades;
    this.maxHabilidad=maxHabilidad;
    this.puntosDestino=puntosDestino;
}
Edad.prototype.cambiarXpHabilidades = function(cambio){
    if (this.xpHabilidades >= Math.abs(cambio)){
        this.xpHabilidades += cambio;
    }
}
Edad.prototype.cambiarXpEspecialidades = function(cambio){
    if (this.xpEspecialidades >= Math.abs(cambio)){
        this.xpEspecialidades += cambio;
    }
}
Edad.prototype.cambiarPuntosDestinos = function(cambio){
    if (this.puntosDestino >= Math.abs(cambio)){
        this.puntosDestino += cambio;
    }
}

// Habilidades mas especialidades
function Agilidad(habilidad){
    this.rango = habilidad;
    this.acrobacia = 0;
    this.contorsionismo = 0;
    this.equilibrio = 0;
    this.equilibrio = 0;
    this.esquivar = 0;
    this.rapidez = 0;
}
function Brio(habilidad){
    this.rango = habilidad;
    this.arrojar = 0;
    this.correr = 0;
    this.fuerza = 0;
    this.nadar = 0;
    this.saltar = 0;
    this.trepar = 0;
}
function Combate(habilidad){
    this.rango = habilidad;
    this.contundente = 0;
    this.asta = 0;
    this.hojaCorta = 0;
    this.hojaLarga = 0;
    this.escudo = 0;
    this.esgrima = 0;
    this.hacha = 0;
    this.lanza = 0;
    this.pelea = 0;
}
function Conocimiento(habilidad){
    this.rango = habilidad;
    this.callejeo = 0;
    this.educacion = 0;
    this.investigacion = 0;
}
function Constitucion(habilidad){
    this.rango = habilidad;
    this.recuperacion = 0;
    this.resistencia = 0;
}
function Curacion(habilidad){
    this.rango = habilidad;
    this.diagnosticar = 0;
    this.tratarDolencia = 0;
    this.tratarHerida = 0;
}
function Discrecion(habilidad){
    this.rango = habilidad;
    this.pasarInadvertido = 0;
    this.sigilo = 0;
}
function Enganyo(habilidad){
    this.rango = habilidad;
    this.actuar = 0;
    this.disfrazarse = 0;
    this.fulleria = 0;
    this.mentir = 0;
}
function Estatus(habilidad){
    this.rango = habilidad;
    this.administracion = 0;
    this.etiqueta = 0;
    this.reputacion = 0;
    this.torneos = 0;
}
function Guerra(habilidad){
    this.rango = habilidad;
    this.estrategia = 0;
    this.mando = 0;
    this.tactica = 0;
}
function Idioma(habilidad){
    this.rango = habilidad;
}
function Ingenio(habilidad){
    this.rango = habilidad;
    this.descifrar = 0;
    this.logica = 0;
    this.memoria = 0;
}
function Percepcion(habilidad){
    this.rango = habilidad;
    this.empatia = 0;
    this.observacion = 0;
}
function Persuasion(habilidad){
    this.rango = habilidad;
    this.cautivar = 0;
    this.convencer = 0;
    this.incitar = 0;
    this.intimidar = 0;
    this.negociar = 0;
    this.provocar = 0;
    this.seducir = 0;
}
function Picaresca(habilidad){
    this.rango = habilidad;
    this.forzarCerraduras = 0;
    this.juegoDeManos = 0;
    this.robar = 0;
}
function Punteria(habilidad){
    this.rango = habilidad;
    this.armasArrojadizas = 0;
    this.arcos = 0;
    this.asedio = 0;
    this.ballestas = 0;
}
function Supervivencia(habilidad){
    this.rango = habilidad;
    this.cazar = 0;
    this.forrajear = 0;
    this.orientarse = 0;
    this.rastrear = 0;
}
function TratoAnimal(habilidad){
    this.rango = habilidad;
    this.adiestrar = 0;
    this.cautivarAnimal = 0;
    this.conducir = 0;
    this.montar = 0;
}
function Voluntad(habilidad){
    this.rango = habilidad;
    this.coordinacion = 0;
    this.coraje = 0;
    this.dedicacion = 0;
}

// ALGO RARO PARA QUE SE DEJEN DE VER LAS ESPECIALIDADES
// Show an element
var show = function (elem) {
    elem.style.display = 'table-row';
};

// Hide an element
var hide = function (elem) {
    elem.style.display = 'none';
};

// Toggle element visibility
var toggle = function (elem) {

    // If the element is visible, hide it
    if (window.getComputedStyle(elem).display === 'table-row') {
        hide(elem);
        return;
    }

    // Otherwise, show it
    show(elem);
};

// Funciones para los botones de cambiar una stat
function botonHabilidad(cambio, habilidad) {
    personaje[`cambiar${habilidad}`](cambio); // Llama al método de cambio correspondiente, ej: cambiarAgilidad(cambio)
    document.getElementById(`rango${habilidad}`).innerHTML = personaje[habilidad.charAt(0).toLowerCase()+habilidad.slice(1)].rango; // Actualiza el rango
    document.getElementById('marcadorXpHabilidades').innerHTML = personaje.edad.xpHabilidades;
}
function botonEspecialidad(cambio,especialidad) {
    if (personaje[especialidadesPorHabilidad[especialidad]][especialidad]+cambio<=personaje[especialidadesPorHabilidad[especialidad]].rango && personaje[especialidadesPorHabilidad[especialidad]][especialidad]+cambio>=0){
        personaje[especialidadesPorHabilidad[especialidad]][especialidad] += cambio;

        if (cambio==1){
            personaje.edad.xpEspecialidades += -10;
        }
        else if(cambio==-1){
            personaje.edad.xpEspecialidades += 10;
        }
    }
    document.getElementById(`nivel${especialidad.charAt(0).toUpperCase()+especialidad.slice(1)}`).innerHTML = personaje[especialidadesPorHabilidad[especialidad]][especialidad];

    document.getElementById('marcadorXpEspecialidades').innerHTML = personaje.edad.xpEspecialidades;
}



// Funciones para mostrar
function mostrarNiveles() {
    let edad = document.getElementById('edad').value;
    personaje = new Personaje(edad);

    document.getElementById('rangoAgilidad').innerHTML = personaje.agilidad.rango ;
        botonEspecialidad(0,'acrobacia');
        botonEspecialidad(0,'contorsionismo');
        botonEspecialidad(0,'equilibrio');
        botonEspecialidad(0,'esquivar');
        botonEspecialidad(0,'rapidez');
    document.getElementById('rangoBrio').innerHTML = personaje.brio.rango ;
        botonEspecialidad(0,'arrojar');
        botonEspecialidad(0,'correr');
        botonEspecialidad(0,'fuerza');
        botonEspecialidad(0,'nadar');
        botonEspecialidad(0,'saltar');
        botonEspecialidad(0,'trepar');
    document.getElementById('rangoCombate').innerHTML = personaje.combate.rango ;
        botonEspecialidad(0,'contundente');
        botonEspecialidad(0,'asta');
        botonEspecialidad(0,'hojaCorta');
        botonEspecialidad(0,'hojaLarga');
        botonEspecialidad(0,'escudo');
        botonEspecialidad(0,'esgrima');
        botonEspecialidad(0,'hacha');
        botonEspecialidad(0,'lanza');
        botonEspecialidad(0,'pelea');
    document.getElementById('rangoConocimiento').innerHTML = personaje.conocimiento.rango ;
        botonEspecialidad(0,'callejeo');
        botonEspecialidad(0,'educacion');
        botonEspecialidad(0,'investigacion');
    document.getElementById('rangoConstitucion').innerHTML = personaje.constitucion.rango ;
        botonEspecialidad(0,'recuperacion');
        botonEspecialidad(0,'resistencia');
    document.getElementById('rangoCuracion').innerHTML = personaje.curacion.rango ;
        botonEspecialidad(0,'diagnosticar');
        botonEspecialidad(0,'tratarDolencia');
        botonEspecialidad(0,'tratarHerida');
    document.getElementById('rangoDiscrecion').innerHTML = personaje.discrecion.rango ;
        botonEspecialidad(0,'pasarInadvertido');
        botonEspecialidad(0,'sigilo');
    document.getElementById('rangoEnganyo').innerHTML = personaje.enganyo.rango ;
        botonEspecialidad(0,'actuar');
        botonEspecialidad(0,'disfrazarse');
        botonEspecialidad(0,'fulleria');
        botonEspecialidad(0,'mentir');
    document.getElementById('rangoEstatus').innerHTML = personaje.estatus.rango ;
        botonEspecialidad(0,'administracion');
        botonEspecialidad(0,'etiqueta');
        botonEspecialidad(0,'reputacion');
        botonEspecialidad(0,'torneos');
    document.getElementById('rangoGuerra').innerHTML = personaje.guerra.rango ;
        botonEspecialidad(0,'estrategia');
        botonEspecialidad(0,'mando');
        botonEspecialidad(0,'tactica');
    document.getElementById('rangoIdioma').innerHTML = personaje.idioma.rango ;
    document.getElementById('rangoIngenio').innerHTML = personaje.ingenio.rango ;
        botonEspecialidad(0,'descifrar');
        botonEspecialidad(0,'logica');
        botonEspecialidad(0,'memoria');
    document.getElementById('rangoPercepcion').innerHTML = personaje.percepcion.rango ;
        botonEspecialidad(0,'empatia');
        botonEspecialidad(0,'observacion');
    document.getElementById('rangoPersuasion').innerHTML = personaje.persuasion.rango ;
        botonEspecialidad(0,'cautivar');
        botonEspecialidad(0,'convencer');
        botonEspecialidad(0,'incitar');
        botonEspecialidad(0,'intimidar');
        botonEspecialidad(0,'negociar');
        botonEspecialidad(0,'provocar');
        botonEspecialidad(0,'seducir');
    document.getElementById('rangoPicaresca').innerHTML = personaje.picaresca.rango ;
        botonEspecialidad(0,'forzarCerraduras');
        botonEspecialidad(0,'juegoDeManos');
        botonEspecialidad(0,'robar');
    document.getElementById('rangoPunteria').innerHTML = personaje.punteria.rango ;
        botonEspecialidad(0,'armasArrojadizas');
        botonEspecialidad(0,'arcos');
        botonEspecialidad(0,'asedio');
        botonEspecialidad(0,'ballestas');
    document.getElementById('rangoSupervivencia').innerHTML = personaje.supervivencia.rango ;
        botonEspecialidad(0,'cazar');
        botonEspecialidad(0,'forrajear');
        botonEspecialidad(0,'orientarse');
        botonEspecialidad(0,'rastrear');
    document.getElementById('rangoTratoAnimal').innerHTML = personaje.tratoAnimal.rango ;
        botonEspecialidad(0,'adiestrar');
        botonEspecialidad(0,'cautivarAnimal');
        botonEspecialidad(0,'conducir');
        botonEspecialidad(0,'montar');
    document.getElementById('rangoVoluntad').innerHTML = personaje.voluntad.rango ;
        botonEspecialidad(0,'coordinacion');
        botonEspecialidad(0,'coraje');
        botonEspecialidad(0,'dedicacion');

    document.getElementById('rangoInformar').innerHTML = 'Rango (Máx. '+personaje.edad.maxHabilidad+')';
    document.getElementById('marcadorXpHabilidades').innerHTML = personaje.edad.xpHabilidades;
    document.getElementById('marcadorPuntosDestino').innerHTML = personaje.edad.puntosDestino;
}



////////////////////////////////////////////////////////
//////////        MAIN         /////////////////////////
////////////////////////////////////////////////////////
