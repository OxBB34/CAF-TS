document.getElementById("submit-btn").addEventListener("click", async () => {
const queryParams = new URLSearchParams({
  date: data.date,
  type: data.type,
  encadrant1: data.encadrant1,
  encadrant2: data.encadrant2,
  encadrant3: data.encadrant3,
  hommes: data.hommes,
  femmes: data.femmes,
});

const response = await fetch(
  `https://script.google.com/macros/s/AKfycbzSwJi53KDtGwsKvu3KNQFbvaFXYsxNiN5RRfVv2aP3Fk8B7NNk0Z5RHtRDY7PIvzZGBQ/exec?${queryParams.toString()}`,
  {
    method: "GET",
  }
);
