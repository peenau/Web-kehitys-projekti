document.addEventListener("DOMContentLoaded", async () => {
  // Napit navigointiin
  document.getElementById("alkuBtn")?.addEventListener("click", () => {
    window.location.href = "index.html";
  });

  document.getElementById("opasBtn")?.addEventListener("click", () => {
    window.location.href = "aloittelijan_opas.html";
  });

  document.getElementById("tankitBtn")?.addEventListener("click", () => {
    window.location.href = "tankit.html";
  });

  document.getElementById("lentokoneetBtn")?.addEventListener("click", () => {
    window.location.href = "lentokoneet.html";
  });

  document.getElementById("laivatBtn")?.addEventListener("click", () => {
    window.location.href = "laivat.html";
  });

  // Tarkista mikä sivu on kyseessä ja lataa ajoneuvot tarvittaessa
  const path = window.location.pathname;

  if (path.includes("tankit.html") || path.includes("lentokoneet.html") || path.includes("laivat.html")) {
    try {
      const res = await fetch("vehicles.json");
      const data = await res.json();

      let category = "";
      if (path.includes("tankit.html")) category = "tanks";
      else if (path.includes("lentokoneet.html")) category = "planes";
      else if (path.includes("laivat.html")) category = "ships";

      const filtered = data.filter(item => item.type === category);
      showVehicles(filtered);
    } catch (err) {
      console.error("Virhe tietojen latauksessa:", err);
    }
  }
});

// Ajoneuvojen näyttöfunktio
function showVehicles(vehicles) {
  const container = document.getElementById("vehicle-container");
  if (!container) return;

  container.innerHTML = "";

  vehicles.forEach(vehicle => {
    const card = document.createElement("div");
    card.className = "vehicle-card";
    card.innerHTML = `
      <img src="images/${vehicle.image}" alt="${vehicle.name}">
      <div class="vehicle-info">
        <h3>${vehicle.name}</h3>
        <p><strong>Tyyppi:</strong> ${vehicle.type}</p>
        <p>${vehicle.description}</p>
      </div>
    `;
    container.appendChild(card);
  });
}
