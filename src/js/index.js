import "/src/css/style.css";

const photo = document.querySelector(".image");
const summary = document.querySelector(".summary");
const category = document.querySelector(".category");
const input = document.querySelector("input");
const score = document.querySelector(".score");
const textScore = document.querySelector(".textScore");
const btn = document.querySelector("button");
let city;

// CITY INFO
let clearCard = function () {
  category.innerHTML = "";
  photo.style.backgroundImage = "";
  textScore.innerHTML = "";
  score.innerHTML = "";
};

// SEARCH FUNCTION
let formatCityName = function (nome) {
  nome = nome.toLowerCase();
  nome = nome.trim();
  nome = nome.replaceAll(" ", "-");
  return nome;
};

// API
//gets city scores
const getData = async function () {
  const getScore = await fetch(
    `https://api.teleport.org/api/urban_areas/slug:${city}/scores/`
  );

  const dataScore = await getScore.json();

//gets city image
  const getImage = await fetch(
    `https://api.teleport.org/api/urban_areas/slug:${city}/images/`
  );

  const dataImage = await getImage.json();

  // UPDATE DOM WITH API INFORMATIONS
  if (getScore.status != 404) {
    //if city is found, update informations
    summary.innerHTML = `<h3>${dataScore.summary}<h3>`;
    category.innerHTML = "";
    textScore.innerHTML = "TELEPORT CITY SCORE";
    score.innerHTML = dataScore.teleport_city_score.toFixed(2);
    dataScore.categories.forEach((x) => {
      category.insertAdjacentHTML(
        "afterbegin",
        `<h3>${x.name}<br> ${x.score_out_of_10.toFixed(1)}<h3>`
      );
    });
    //Background image with city image
    photo.style.backgroundImage = `url(${dataImage.photos[0].image.web})`;
    //erase input value
    input.value = "";
  } else {
    //error message if the city is not found
    errorHandler(
      `<h3>CITY NOT FOUND. <br> Type the city name in english. <br> If your city doesn't appear, it's not in our database.<h3>`
    );
    //clears the card
    clearCard();
  }
};

// IF THE CITY ISN'T IN THE DATABASE
const errorHandler = (warningMessage) => {
  summary.innerHTML = `<p>${warningMessage}</p>`;
  return warningMessage;
};

// IF THE CITY NAME ISN'T ENTERED
const errorEmpty = () => {
  if (!input.value) {
    errorHandler(`<h3>Type a city name<h3>`);
    clearCard();
  }
};

// ENTER FUNCTION
input.addEventListener("keydown", function (enterkey) {
  if (enterkey.key === "Enter") {
    city = formatCityName(input.value);
    getData();
    errorEmpty();
  }
});

// SEARCH BUTTON FUNCTION
btn.addEventListener("click", function () {
  city = formatCityName(input.value);
  getData();
  errorEmpty();
});