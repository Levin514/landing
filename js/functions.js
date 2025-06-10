'use strict';

/**
 * Realiza una petición HTTP a la URL proporcionada y devuelve un objeto con el resultado.
 * 
 * @param {string} url - URL de la API a la que se realizará la petición.
 * @returns {Promise<{success: boolean, body?: any, error?: string}>} 
 * Un objeto con la clave success (true si la petición fue exitosa, false si hubo error).
 * Si success es true, incluye la clave body con la respuesta en formato JSON.
 * Si success es false, incluye la clave error con el mensaje descriptivo del error.
 */
let fetchFakerData =  (url) => {
    return fetch(url)
        .then(response => {
            // Verificar si la respuesta es exitosa (status 200-299)
            if (!response.ok) {
                throw new Error(`Error HTTP: ${response.status}`);
            }
            return response.json();
        })
        .then(data => {
            // Respuesta exitosa
            return {
                success: true,
                body: data
            };
        })
        .catch(error => {
            return {
                success: false,
                error: `Error en la petición: ${error.message}`
            };
        });
}

export { fetchFakerData }