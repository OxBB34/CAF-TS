document.getElementById("submit-btn").addEventListener("click", async () => {
  const data = {
    date: document.getElementById("date").value,
    type: document.getElementById("type").value,
    encadrant1: document.getElementById("encadrant1").value,
    encadrant2: document.getElementById("encadrant2").value,
    encadrant3: document.getElementById("encadrant3").value,
    hommes: document.getElementById("hommes").value,
    femmes: document.getElementById("femmes").value,
  };

  const response = await fetch("https://script.google.com/macros/s/AKfycbzSwJi53KDtGwsKvu3KNQFbvaFXYsxNiN5RRfVv2aP3Fk8B7NNk0Z5RHtRDY7PIvzZGBQ/exec", { // Remplacez par votre URL
    method: "POST",
    body: JSON.stringify(data),
    headers: { "Content-Type": "application/json" },
  });

  if (response.ok) {
    alert("Données envoyées avec succès !");
    document.getElementById("form").reset();
  } else {
    alert("Erreur lors de l'envoi des données.");
  }
});
