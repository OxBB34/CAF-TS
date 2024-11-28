const databaseUrl = 'https://raw.githubusercontent.com/<USERNAME>/<REPO>/main/database.json';
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
    // Récupérer les données existantes
    const response = await fetch(databaseUrl);
    const existingData = await response.json();

    // Ajouter les nouvelles données
    existingData.push(data);

    // Afficher les données (test local, pas d'écriture dans GitHub directement ici)
    displayData(existingData);

    alert("Données ajoutées localement. Synchronisation manuelle requise pour GitHub.");
  } catch (error) {
    console.error("Erreur :", error);
    alert("Erreur lors de la mise à jour des données.");
  }
});

// Affiche les données dans la liste
function displayData(data) {
  dataList.innerHTML = "";
  data.forEach((item) => {
    const listItem = document.createElement("li");
    listItem.textContent = `${item.date} - ${item.type} - Hommes: ${item.hommes}, Femmes: ${item.femmes}`;
    dataList.appendChild(listItem);
  });
}

// Charger et afficher les données à l'ouverture
(async function loadData() {
  try {
    const response = await fetch(databaseUrl);
    const data = await response.json();
    displayData(data);
  } catch (error) {
    console.error("Erreur lors du chargement des données :", error);
  }
})();
