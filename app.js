// Reemplaza con tu configuración. La obtenés en la consola Firebase -> Configuración del proyecto -> tus apps.
const firebaseConfig = {
  apiKey: "TU_API_KEY",
  authDomain: "TU_PROYECTO.firebaseapp.com",
  projectId: "TU_PROYECTO",
  storageBucket: "TU_PROYECTO.appspot.com",
  messagingSenderId: "TU_MESSAGING_SENDER_ID",
  appId: "TU_APP_ID"
};

// Inicializar Firebase (compat)
firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();

const form = document.getElementById('contactForm');
const statusEl = document.getElementById('status');

form.addEventListener('submit', async (e) => {
  e.preventDefault();
  const name = document.getElementById('name').value.trim();
  const email = document.getElementById('email').value.trim();
  const message = document.getElementById('message').value.trim();

  if (!name || !email || !message) {
    statusEl.textContent = "Complete todos los campos.";
    statusEl.style.color = "red";
    return;
  }

  try {
    await db.collection('contact_messages').add({
      name,
      email,
      message,
      createdAt: firebase.firestore.FieldValue.serverTimestamp()
    });
    statusEl.textContent = "Mensaje enviado. ¡Gracias!";
    statusEl.style.color = "green";
    form.reset();
  } catch (err) {
    console.error(err);
    statusEl.textContent = "Error al enviar. Ver consola.";
    statusEl.style.color = "red";
  }
});
