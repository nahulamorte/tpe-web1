"use strict";

document.addEventListener('DOMContentLoaded', () => {
    //declaracion de variables y asignacion de eventos
    const url = 'https://66733e326ca902ae11b39729.mockapi.io/api/drivers';

    let filas = [];
    let idPut = "";

    const tablaDinamica = document.querySelector("#tablaPilotos");

    let btn_agregar = document.querySelector("#btn-agregar");
    let btn_modificar = document.querySelector("#btn-modificar");
    let formTabla = document.querySelector("#FormPilotos");

    formTabla.addEventListener("submit", e => e.preventDefault());
    btn_agregar.addEventListener("click", enviarDatos);
    btn_modificar.addEventListener("click", () => modificarDato(idPut)); //funcion anonima que llama a modificar dato

    btn_modificar.disabled = true;


    obtenerDatos();

    //función para obtener y mostrar los datos provenientes de la mockAPI
    async function obtenerDatos() {
        try {
            let response = await fetch(url);

            if (!response.ok)
                throw new Error(response.statusText);

            filas = await response.json();

            tablaDinamica.innerHTML = ""; // Limpiar la tabla

            let tbody = document.createElement("tbody");

            filas.forEach(fila => {
                let nuevaFila = document.createElement("tr");

                nuevaFila.innerHTML = `
                    <td>${fila.id}</td>
                    <td>${fila.nombre}</td>
                    <td>${fila.escuderia}</td>
                    <td>${fila.puntos}</td>
                    <td><button class="btnEditar" data-id="${fila.id}">EDITAR</button></td>  
                    <td><button class="btnEliminar" data-id="${fila.id}">ELIMINAR</button></td>
                    `;
                //cada boton editar y eliminar tiene el atributo data-id que toma el id de su fila
                tbody.appendChild(nuevaFila);
            });
            tablaDinamica.appendChild(tbody);

            let botonesEliminar = document.querySelectorAll(".btnEliminar");
            botonesEliminar.forEach(btnElim => {
                btnElim.addEventListener("click", (e) => {
                    let id = e.target.getAttribute("data-id");
                    borrarDato(id);
                });
            });

            let botonesEditar = document.querySelectorAll(".btnEditar");
            botonesEditar.forEach(btnEdit => {
                btnEdit.addEventListener("click", (e) => {
                    let id = e.target.getAttribute("data-id");
                    editarDato(id);
                    window.location.href = "#FormPilotos";
                    btn_modificar.disabled = false;
                });
            });
        } catch (error) {
            console.error("Error al obtener los datos: ", error);
        }
    }



    async function enviarDatos() {
        let formData = new FormData(formTabla);
        let datos = {
            "nombre": formData.get("nombre"),
            "escuderia": formData.get("escuderia"),
            "puntos": Number(formData.get("puntos"))
        };
        try {
            let response = await fetch(url, {
                "method": "POST",
                "headers": {
                    "Content-Type": "application/json"
                },
                "body": JSON.stringify(datos),
            });

            if (!response.ok) {
                throw new Error(response.statusText);//fuerzo error para ir al catch
            }
            obtenerDatos();
        } catch (error) {
            console.log(error);
        }
    }



    async function borrarDato(id) {
        try {
            let response = await fetch(`${url}/${id}`, {   //le asigno el id a la url de la API
                "method": "DELETE",                         //permite eliminar la propiedad de un objeto
            });

            if (response.ok) {
                console.log("Se Elimino con Exito!");  //muestro por consola que fue exitosa la eliminación
                obtenerDatos();                 //espero a la función mostrar tabla, para que se muestre ek contenido
            }
            else {
                console.log("fallo DELETE")
            }
        } catch (error) {
            console.log("Error: " + error); //detecto errores de tipo conección u otros.
        }
    }

    async function editarDato(id) {
        console.log("funcion editar");
        try {
            let response = await fetch(url + "/" + id);

            if (!response.ok)
                throw new Error(response.statusText);

            let piloto = await response.json();

            formTabla.elements["nombre"].value = piloto.nombre;
            formTabla.elements["escuderia"].value = piloto.escuderia;
            formTabla.elements["puntos"].value = piloto.puntos;

            idPut = id;
            console.log("entre aca")


        } catch (error) {
            console.log(error)
        }
    }

    async function modificarDato(id) {
        let formData = new FormData(formTabla);
        let datos = {
            "nombre": formData.get("nombre"),
            "escuderia": formData.get("escuderia"),
            "puntos": Number(formData.get("puntos"))
        };
        try {
            let response = await fetch(url + "/" + id, {
                "method": "PUT",
                "headers": {
                    "Content-Type": "application/json"
                },
                "body": JSON.stringify(datos),
            });
            if (!response.ok) {
                throw new Error(response.statusText);//fuerzo error para ir al catch
            }
            btn_modificar.disabled = true;
            obtenerDatos();
        } catch (error) {
            console.log(error);
        }
    }
});












