"use strict"

const btnForm = document.querySelector("#btn-form");
const captcha = document.querySelector("#captcha");
let captchaValor = generarCaptcha(5);
captcha.innerHTML = captchaValor;

//para formularios:
const form = document.querySelector("#form");
form.addEventListener('submit', agregar);
btnForm.addEventListener('click', validarCaptcha);

function agregar(e){
    e.preventDefault();
}

function generarCaptcha(cant) {
    let valores = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
    let resultado = "";

    for (let i = 0; i < cant; i++) {
        let indice = Math.floor(Math.random() * valores.length);
        resultado += valores.charAt(indice);
    }

    return resultado;
}

function validarCaptcha(){
    let avisoOk = document.querySelector("#avisoOk");
    let avisoError = document.querySelector("#avisoError");
    let captchaIngresado = document.querySelector("#captchaIngresado").value;
    if (captchaValor === captchaIngresado){
        avisoOk.innerHTML = "Captcha correcto";
        avisoError.innerHTML = "";
        limpiar();
    } else {
        avisoOk.innerHTML = "";
        avisoError.innerHTML = "Captcha incorrecto";
    }
}

function limpiar(){
    document.querySelector("#nombre").value = "";
    document.querySelector("apellido").value = "";
    document.querySelector("#email").value = "";
}