"use strict";
import { fetchFakerData } from './functions.js';

// Función para renderizar las cards en el contenedor
const renderCards = (items) => {
    const container = document.getElementById("skeleton-container");
    if (!container) return;

    // Limpiar el contenedor antes de renderizar
    container.innerHTML = "";

    // Iterar sobre los primeros 3 elementos
    items.slice(0, 3).forEach(item => {
        const card = `
            <div class="bg-white dark:bg-gray-800 p-4 rounded-2xl shadow space-y-4">
                <div class="h-40 bg-gray-200 dark:bg-gray-700 rounded-lg flex items-center justify-center">
                    <span class="text-xl font-bold text-gray-700 dark:text-gray-200">${item.title}</span>
                </div>
                <div class="h-auto">
                    <p class="text-gray-900 dark:text-white font-semibold">Autor: ${item.author}</p>
                    <p class="text-gray-700 dark:text-gray-300">Género: ${item.genre}</p>
                </div>
                <div class="h-auto">
                    <p class="text-gray-600 dark:text-gray-400 text-sm">${item.content}</p>
                </div>
            </div>
        `;
        container.innerHTML += card;
    });
};

const loadData = async () => {
    const url = 'https://fakerapi.it/api/v2/texts?_quantity=10&_characters=120';
    try {
        const result = await fetchFakerData(url);
        if (result.success) {
            console.log('Datos obtenidos con éxito:', result.body);
            renderCards(result.body.data);
        } else {
            console.error('Error al obtener los datos:', result.error);
        }
    } catch (error) {
        console.error('Ocurrió un error inesperado:', error);
    }
}

const showToast = () => {
    const toast = document.getElementById("toast-interactive");
    if (toast) {
        toast.classList.add("md:block");
        setTimeout(()=>{toast.classList.add("md:block");},20)
    }
};

const showVideo = () => {
    const demo = document.getElementById("demo");
    if (demo) {
        demo.addEventListener("click", () => {
            window.open("https://www.youtube.com/watch?v=9ocAWu_yNb4", "_blank");
        });
    }
};

(() => {
    showToast();
    showVideo();
    loadData();
})();