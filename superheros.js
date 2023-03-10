function fetchSuperheroData() {

  const id = localStorage.getItem("id")

  let html_hero = "";
  fetch(`https://www.superheroapi.com/api.php/586069776286026/${id}`)
    .then((response) => response.json())
    .then((data) => {
      html_hero += `
          <div class="card" style="width: 18rem;">
          <img class="card-img-left" src="${data.image.url}" alt="Card image cap">
          <div class="card-body">
            <h3 class="card-title">${data.name}</h3>
          </div>
          <div class="card-body">
            <h5>Power Stats</h5>
            <ul class="list-group list-group-flush">
                <li class="list-group-item">intelligence: ${data.powerstats.intelligence}</li>
                <li class="list-group-item">strength: ${data.powerstats.strength}</li>
                <li class="list-group-item">speed: ${data.powerstats.speed}</li>
                <li class="list-group-item">durability: ${data.powerstats.durability}</li>
                <li class="list-group-item">power: ${data.powerstats.power}</li>
                <li class="list-group-item">combat: ${data.powerstats.combat}</li>
            </ul>
          </div>
        </div>
             `;
    });
    
  setTimeout(() => {
    document.getElementById("superhero-special").innerHTML = html_hero;
  }, 1000);
}

fetchSuperheroData();
