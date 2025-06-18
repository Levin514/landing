"use strict";

import { saveVote } from "./firebase.js";

function enableForm() {
  const form = document.getElementById('form_voting');
  form.addEventListener('submit', function(event) {
    event.preventDefault();
    const formData = new FormData(form);
    const data = Object.fromEntries(formData.entries());
    saveVote(data);
    form.reset();
  });
}

(() => {
    enableForm();
})();