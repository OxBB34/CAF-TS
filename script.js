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

  if (!data.date || !data.type || !data.hommes || !data.femmes) {
    alert("Veuillez remplir tous les champs obligatoires !");
    return;
  }

  try {
    const response = await fetch(
      "https://script.google.com/macros/s/AKfycbz7SxeVcbD9JpqYx6_rHgRYVIpNtsv_G9AIz_VcPbySkF5ACcxWMcqfzNKtav18yEosmQ/exec",
      {
        method: "POST",
        body: JSON.stringify(data),
        headers: { "Content-Type": "application/json" },
      }
    );

    if (!response.ok) {
      console.error("Erreur HTTP :", response.status, response.statusText);
      alert("Erreur lors de l'envoi : " + response.statusText);
      return;
    }

    const result = await response.json();
    if (result.success) {
      alert("Données envoyées avec succès !");
      document.getElementById("form").reset();
    } else {
      alert("Erreur du serveur : " + result.error);
    }
  } catch (error) {
    console.error("Erreur réseau :", error);
    alert("Erreur lors de l'envoi des données. Vérifiez votre connexion.");
  }
});
