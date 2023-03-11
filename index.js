//function for show heros depends on search also filter heros depends on key press
const showCorrespondingHeros = () => {
  const xhr = new XMLHttpRequest();
  const name = document.getElementById("name").value;

  // IN CASE OF ERROR
  xhr.onerror = function () {
    document.getElementById("contentContainer").innerHTML =
      '<h2 id="Error-Message">An error has occured, check connection.</h2>';
  };
  // INCASE OF NO ERROR load
  xhr.onload = function () {
    var responseJSON = JSON.parse(xhr.response);
    let html = "";
    html += "<div class='row'>";
    if (responseJSON.response == "success") {
      responseJSON.results.forEach((element) => {
        html +=
          `
            <div class="col-lg-4 col-md-6 col-12" style = "margin-top = 50px;">
                <div class="card m-5" style="width: 18rem; height: 28rem;">
                    <img class="card-img-top" onclick="showDetails(${element.id})" src="${element.image.url}" style="height: 25rem;">
                    <div class="card-body">
                    <span class="card-details"> 
                        <span><h5 class="card-title" onclick="showDetails(${element.id})">${element.name}</h5></span>
                        <span><h5><i id="${element.id}" class="fa-solid fa-circle-plus icon" onclick="addFavourite(${element.id})" style:"align-items: right; cursor:pointer"></i></h5></span>
                    </span>
                </div>
            </div>
            </div>    
          `;
      });
    }
    document.getElementById("card-deck").innerHTML = html;
  };

  xhr.open(
    "GET",
    `https://www.superheroapi.com/api.php/586069776286026/search/${name}`,
    true
  );

  xhr.send();
};

// make a favourites key for storing all favourites hero's id in local storage if not available
if (localStorage.getItem("favourites") == null) {
  localStorage.setItem("favourites", JSON.stringify([]));
} else {
  var arr = JSON.parse(localStorage.getItem("favourites"));
}

// function for show heros full details in a new page

let html_hero = "";
function showDetails(idnumber) {
  localStorage.setItem("id", idnumber);
  window.location.href = "./superheros.html";
}

// function for adding id value in local storage favourites key if not available this id
function addFavourite(id) {
  if (!arr.includes(id) == true) {
    arr.push(id);
    localStorage.setItem("favourites", JSON.stringify(arr));
    alert("Superhero added in favourites");
  } else {
    alert("Superhero already exists in favourites");
  }
}
