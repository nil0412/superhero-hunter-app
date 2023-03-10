// get favourites heros id from local storage and store in an array
// stores the charcter id
var arr = JSON.parse(localStorage.getItem("favourites"));
console.log(arr);

// // function for show heros full details in a new page
// function showDetails(idnumber) {
//     localStorage.setItem("id", idnumber);
//     window.location = "index2.html";
// }

// function for remove hero from favourites, update localstorage and reload page
function removeHero(id) {
  var index = arr.indexOf(id);
  console.log(index);
  arr.splice(index, 1);
  console.log(arr);
  localStorage.setItem("favourites", JSON.stringify(arr));
  alert("Superhero remove successfully");
  location.reload();
}

//function for show all favourites heros in html page
let html = "";
html += "<div class='row'>";
function fetchData() {
  for (let i = 0; i < arr.length; i++) {
    fetch(`https://www.superheroapi.com/api.php/586069776286026/${arr[i]}`)
      .then((response) => response.json())
      .then((data) => {
        html +=
          `
            <div class="col-lg-4 col-md-6 col-12" style = "margin-top = 50px;">
                <div class="card m-5" style="width: 18rem; height: 28rem;">
                    <img class="card-img-top" onclick="showDetails(${arr[i]})" src="${data.image.url}" style="height: 25rem;">
                    <div class="card-body">
                    <span class="card-details"> 
                        <span><h5 class="card-title" onclick="showDetails(${arr[i]})">${data.name}</h5></span>` +
          `<span><h5><i id="${arr[i]}" class="fa-solid fa-circle-minus" onclick="removeHero(${arr[i]})" style:"align-items: right; cursor: pointer;"></i></h5></span>
                    </span>
                </div>
            </div>
            </div>
             `;
      });
  }
}

setTimeout(() => {
  document.getElementById("cards-group").innerHTML = html;
}, 1000);
