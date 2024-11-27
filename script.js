// Ajout d'un écouteur d'événement au bouton "Envoyer"
document.getElementById("submit-btn").addEventListener("click", async () => {
  // Récupération des données du formulaire
  const data = {
    date: document.getElementById("date").value,
    type: document.getElementById("type").value,
    encadrant1: document.getElementById("encadrant1").value,
    encadrant2: document.getElementById("encadrant2").value,
    encadrant3: document.getElementById("encadrant3").value,
    hommes: document.getElementById("hommes").value,
    femmes: document.getElementById("femmes").value,
  };

  // Vérification que tous les champs obligatoires sont remplis
  if (!data.date || !data.type || !data.hommes || !data.femmes) {
    alert("Veuillez remplir tous les champs obligatoires !");
    return;
  }

  try {
    // Envoi des données au script Google Apps Script
    const response = await fetch(
    `https://corsproxy.io/?${encodeURIComponent
      "https://script.google.com/macros/s/AKfycbzSwJi53KDtGwsKvu3KNQFbvaFXYsxNiN5RRfVv2aP3Fk8B7NNk0Z5RHtRDY7PIvzZGBQ/exec" 
       )}`,
      method: "POST",
      body: JSON.stringify(data),
      headers: { "Content-Type": "application/json" },
    });

    // Vérification de la réponse brute pour déboguer
    const textResult = await response.text();
    console.log("Réponse brute :", textResult);

    // Parsing de la réponse JSON
    const result = JSON.parse(textResult);

    if (result.success) {
      alert("Données envoyées avec succès !");
      document.getElementById("form").reset();
    } else {
      alert("Erreur du serveur : " + result.error);
    }
  } catch (error) {
    console.error("Erreur lors de l'envoi :", error);
    alert("Erreur lors de l'envoi des données. Vérifiez votre connexion et réessayez.");
  }
});
