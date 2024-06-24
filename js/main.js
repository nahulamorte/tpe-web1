"use strict"

const abrir = document.querySelector("#btn-abrirMenu");
abrir.addEventListener('click', desplegarMenu);

function desplegarMenu() {
    document.querySelector("#menu-responsive").classList.toggle('mostrar-navlist');
}

let toggleButton = document.getElementById('toggleButton');

toggleButton.addEventListener('click', function() {
    let body = document.body;

    if (body.classList.contains('dark-mode')) {
        body.classList.remove('dark-mode');
    } else {
        body.classList.add('dark-mode');
    }
});
