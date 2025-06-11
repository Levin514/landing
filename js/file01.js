"use strict";

import { fetchFakerData } from "./functions.js";
import { saveVote, getVotes } from "./firebase.js";

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

/**
 * Habilita el formulario de votación y gestiona el envío.
 */
const enableForm = () => {
    const form = document.getElementById('form_voting');
    if (!form) return;

    form.addEventListener('submit', async (e) => {
        e.preventDefault();

        const input = document.getElementById('select_product');
        if (!input) return;

        const productID = input.value;

        const result = await saveVote(productID);

        // Mostrar mensaje de éxito o error por consola
        if (result && result.message) {
            if (result.success) {
                console.log("✅", result.message);
            } else {
                console.error("❌", result.message);
            }
        }

        form.reset();
        displayVotes(); // Invocar después de guardar un voto
    });
};

function displayVotes() {
    getVotes().then(votes => {
        const container = document.getElementById('results');
        if (!container) return;

        // Limpiar contenido previo
        container.innerHTML = "";

        // Procesar votos para contar por producto
        const voteCounts = {};
        if (votes && typeof votes === 'object') {
            Object.values(votes).forEach(vote => {
                if (vote.productID) {
                    voteCounts[vote.productID] = (voteCounts[vote.productID] || 0) + 1;
                }
            });
        }

        // Crear tabla
        const table = document.createElement('table');
        table.className = "min-w-full text-left text-sm font-light";
        table.innerHTML = `
            <thead>
                <tr>
                    <th class="px-4 py-2">Producto</th>
                    <th class="px-4 py-2">Total de votos</th>
                </tr>
            </thead>
            <tbody>
                ${
                    Object.entries(voteCounts).map(([product, count]) => `
                        <tr>
                            <td class="border px-4 py-2">${product}</td>
                            <td class="border px-4 py-2">${count}</td>
                        </tr>
                    `).join('')
                }
            </tbody>
        `;

        container.appendChild(table);
    });
}

(() => {
    showToast();
    showVideo();
    loadData();
    enableForm();
    displayVotes(); // Invocar al cargar la página
})();

