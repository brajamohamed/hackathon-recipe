let container = document.getElementById("container");
let input = document.getElementById("input");
let search = document.getElementById("search");
let result = [];

document.addEventListener("keydown", (e) => {
  if (e.key === "Enter") {
    search.click();
  }
});

search.addEventListener("click", () => {
  let inputVal = input.value;
  if (inputVal === "") {
    alert("Enter a food name to search");
  } else {
    fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${inputVal}`)
      .then((response) => response.json())
      .then((data) => {
        if (data.meals === null) {
          alert("no food fount");
        }
        let array = Object.entries(data);
        array = Object.entries(array[0][1]);
        let result = array.map((entry) => {
          return [entry[1].strYoutube, entry[1].strMealThumb, entry[1].strMeal];
        });
        displayResults(result);
      });
  }
});
async function displayResults(result) {
  let row = document.createElement("div");
  row.classList.add("row");
  container.appendChild(row);
  for (let item of result) {
    let card = document.createElement("div");
    card.classList.add("col-sm-3", "card", "m-2");
    row.appendChild(card);

    let img = document.createElement("img");
    img.src = item[1];
    card.appendChild(img);

    let cardBody = document.createElement("div");
    cardBody.classList.add("card-body");
    card.appendChild(cardBody);

    let heading = document.createElement("small");
    heading.classList.add("card-subtitle");
    heading.innerText = item[2];
    cardBody.appendChild(heading);

    let link = document.createElement("a");
    link.href = item[0];
    let button = document.createElement("button");
    button.classList.add("card-btn");
    button.innerText = "Watch Video";
    link.appendChild(button);
    cardBody.appendChild(link);
  }
}
