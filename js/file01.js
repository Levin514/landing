"use strict";

import { fetchFakerData } from "./functions.js";

const showToast = () => {
    const toast = document.getElementById("toast-interactive");
    if (toast) {
        toast.classList.add("md:block");
    }
};

/**
 * Agrega un evento click al botón con id "demo" para abrir un video en una nueva pestaña.
 * @returns {void}
 */
const showVideo = () => {
    const demo = document.getElementById("demo");
    if (demo) {
        demo.addEventListener("click", () => {
            window.open("https://www.youtube.com/watch?v=9ocAWu_yNb4", "_blank");
        });
    }
};

const renderCards = (items) => {
    const container = document.getElementById("skeleton-container");
    if (!container) return;

    container.innerHTML = ""; // Limpiar contenido previo

    items.slice(0, 3).forEach(item => {
        const card = document.createElement("div");
        card.className = "bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 flex flex-col";

        card.innerHTML = `
            <h3 class="text-xl font-bold mb-2 dark:text-white">${item.title}</h3>
            <p class="text-sm text-gray-500 mb-1">Autor: <span class="font-medium">${item.author}</span></p>
            <p class="text-sm text-gray-500 mb-3">Género: <span class="font-medium">${item.genre}</span></p>
            <p class="text-gray-700 dark:text-gray-300">${item.content}</p>
        `;

        container.appendChild(card);
    });
};

const loadData = async () => {

    const url = 'https://fakerapi.it/api/v2/texts?_quantity=10&_characters=120';

    try {
        const result = await fetchFakerData(url);

        if (result.success) {
            console.log('Datos obtenidos con éxito:', result.body);
            renderCards(result.body.data); // Llamar a renderCards con los datos obtenidos
        } else {
            console.error('Error al obtener los datos:', result.error);
        }

    } catch (error) {

        console.error('Ocurrió un error inesperado:', error);

    }

};



(() => {
    showToast();
    showVideo();
    loadData();

})();

