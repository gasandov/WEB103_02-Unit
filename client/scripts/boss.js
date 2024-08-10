const fetchBoss = async (id) => await (await fetch(`/bosses/${id}`)).json();

const main = async () => {
  const id = window.location.pathname.split("/").pop();
  const response = await fetchBoss(id);

  document.querySelector("#banner").innerHTML = `
    <div class="nav-container">
        <h1>Elden Ring</h1>
        <p>For those who are tired of being repeatedly defeated by the bosses 💀</p>
        <a href="/pages" role="button">All Bosses</a>
    </div>
  `;

  const mainContent = document.getElementById("main-content");

  if (!response) {
    const heading = document.createElement("h2");
    heading.textContent = "Boss was not found";

    return mainContent.appendChild(heading);
  }

  const boss = response;

  document.querySelector("#main-content").innerHTML = `
    <div class="boss-info">
      <div class="boss-health-location">
        <h2>${boss.name}</h2>
        <p><strong><span class="fa-solid fa-heart info-icon"></span> Health:</strong>${boss.healthPoints}</p>
        <p><strong><span class="fa-solid fa-map-location-dot info-icon"></span>${boss.location}</p>
        <p class="boss-info-description">${boss.description}</p>
      </div>

      <img src=${boss.image} />
    </div>
  `;
};

main();
