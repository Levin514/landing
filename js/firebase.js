// Importa las funciones principales de Firebase desde el CDN (v11.9.1)
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.9.1/firebase-app.js";
import { getDatabase, ref, set, push, get, child } from "https://www.gstatic.com/firebasejs/11.9.1/firebase-database.js";

// Configuración usando variables de entorno de Vite
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID
};

// Inicializa la app de Firebase con el objeto de configuración importado desde las variables de entorno
const app = initializeApp(firebaseConfig);

// Obtiene la referencia a la base de datos en tiempo real
const db = getDatabase(app);

/**
 * Guarda un voto en la colección 'votes' de la base de datos.
 * @param {string} productID - ID del producto votado.
 * @returns {Promise<{success: boolean, message: string}>}
 */
export function saveVote(productID) {
  const votesRef = ref(db, 'votes');
  const newVoteRef = push(votesRef);
  const data = {
    productID,
    createdAt: new Date().toISOString()
  };

  return set(newVoteRef, data)
    .then(() => ({
      success: true,
      message: 'Voto guardado correctamente.'
    }))
    .catch((error) => ({
      success: false,
      message: `Error al guardar el voto: ${error.message}`
    }));
}

/**
 * Obtiene todos los votos de la colección 'votes' de la base de datos.
 * @returns {Promise<any>} Los votos almacenados o un objeto de error.
 */
export async function getVotes() {
  const votesRef = ref(db, 'votes');
  try {
    const snapshot = await get(votesRef);
    if (snapshot.exists()) {
      return snapshot.val();
    } else {
      return {};
    }
  } catch (error) {
    return { error: true, message: `Error al obtener los votos: ${error.message}` };
  }
}

