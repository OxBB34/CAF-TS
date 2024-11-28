const databaseUrl = 'https://raw.githubusercontent.com/oxbb34/CAF-TS/main/database.json';
const submitButton = document.getElementById("submit-btn");
const dataList = document.getElementById("data-list");

submitButton.addEventListener("click", async () => {
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
    alert("Veuillez remplir les champs obligatoires !");
    return;
  }

  try {
    console.log("Données soumises :", data);

    // Étape 1 : Récupérer les données existantes
    const response = await fetch(databaseUrl);
    console.log("Statut de la réponse :", response.status);
    if (!response.ok) {
      throw new Error("Erreur HTTP : " + response.status);
    }
    const existingData = await response.json();
    console.log("Données existantes :", existingData);

    // Étape 2 : Ajouter les nouvelles données
    existingData.push(data);
    console.log("Nouvelles données :", existingData);

    // Étape 3 : Afficher les données localement (en attendant la synchronisation avec GitHub)
    displayData(existingData);

    alert("Données ajoutées localement. Synchronisation GitHub manuelle nécessaire.");
  } catch (error) {
    console.error("Erreur lors de l'envoi :", error);
    alert("Erreur lors de l'envoi des données. Vérifiez votre connexion.");
  }
});

// Fonction pour afficher les données dans la liste HTML
function displayData(data) {
  dataList.innerHTML = ""; // Vide la liste
  data.forEach((item) => {
    const listItem = document.createElement("li");
    listItem.textContent = `${item.date} - ${item.type} - Hommes : ${item.hommes}, Femmes : ${item.femmes}`;
    dataList.appendChild(listItem);
  });
}

// Charger les données à l'ouverture
(async function loadData() {
  try {
    const response = await fetch(databaseUrl);
    const data = await response.json();
    console.log("Données chargées au démarrage :", data);
    displayData(data);
  } catch (error) {
    console.error("Erreur lors du chargement des données :", error);
  }
})();
