const fetchBosses = async () => await (await fetch("/bosses")).json();

const createBossCard = (boss) => `
  <article style="background: url(${boss.image}); background-repeat: no-repeat; background-size: cover; background-position: center center">
    <div class="boss-card-overlay">
      <div class="boss-brief boss-card-name">
        <h3>${boss.name}</h3>
        <hr>
        <div class="boss-brief boss-card-location">
          <p>${boss.location}</p>
          <div class="boss-brief boss-card-link">
            <a href="/pages/boss/${boss.id}" role="button">Read More</a>
          </div>
        </div>
      </div>
    </div>
  </article>
`;

const main = async () => {
  const response = await fetchBosses();

  document.querySelector("#banner").innerHTML = `
    <div class="nav-container">
        <h1>Elden Ring</h1>
        <p>For those who are tired of being repeatedly defeated by the bosses 💀</p>
        <a href="/pages" role="button">All Bosses</a>
    </div>
  `;

  const mainContent = document.getElementById("main-content");

  if (response.length === 0) {
    const heading = document.createElement("h2");
    heading.textContent = "No bosses found";

    return mainContent.appendChild(heading);
  }

  response.forEach((boss) => {
    const card = createBossCard(boss);
    mainContent.innerHTML += card;
  });
};

main();
