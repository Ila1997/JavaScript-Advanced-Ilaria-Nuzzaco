// The code in this arrow function is immediately run
(() => {
  const e = document.querySelector(".image"),
  t = document.querySelector(".summary"),
  n = document.querySelector(".category"),
  o = document.querySelector("input"),
  r = document.querySelector(".score"),
  a = document.querySelector(".textScore"),
  c = document.querySelector("button");
  let i,
  
  // CITY INFO
  //function to erase card content
  s = function () {
  (n.innerHTML = ""),
  (e.style.backgroundImage = ""),
  (a.innerHTML = ""),
  (r.innerHTML = "");
  },
  
  // SEARCH FUNCTION
  //function to format city name
  u = function (e) {
  return (e = (e = e.toLowerCase()).trim()).replaceAll(" ", "-");
  };

  // API
  const l = async function () {
  const c = await fetch(
  `https://api.teleport.org/api/urban_areas/slug:${i}/scores/`
  ),

  u = await c.json();
  console.log(u);
  const l = await fetch(
  `https://api.teleport.org/api/urban_areas/slug:${i}/images/`
  ),
  
  y = await l.json();

  // DOM
  //update DOM with API info
  404 != c.status
  //if city is found, update info
  ? ((t.innerHTML = `<h3><p>${u.summary}</p><h3>`),
  (n.innerHTML = ""),
  (a.innerHTML = "TELEPORT CITY SCORE"),
  (r.innerHTML = u.teleport_city_score.toFixed(2)),
  u.categories.forEach((e) => {
  n.insertAdjacentHTML(
  "afterbegin",
  `<h3>${e.name}<br> ${e.score_out_of_10.toFixed(1)}<h3>`
  );
  }),
  //Background image with city image
  (e.style.backgroundImage = `url(${y.photos[0].image.web})`),
    //erase input value
  (o.value = ""))
  //if city not found, error message
  : (m(
  "<h3>CITY NOT FOUND. <br> Type the city name in english. <br> If your city doesn't appear, it's not in our database.<h3>"
  ),
  //clear card
  s());
  },
  
  // HANDLE ERROR IF THE CITY ISN'T IN THE DATABASE
  m = (e) => ((t.innerHTML = `<p>${e}</p>`), e),

  // HANDLE ERROR IF THE CITY NAME ISN'T ENTERED
  y = () => {
  o.value || (m("<h3>Type a city name<h3>"), s());
  };
  
  // ENTER FUNCTION
  o.addEventListener("keydown", function (e) {
  "Enter" === e.key && ((i = u(o.value)), l(), y());
  }),
  
  // SEARCH BUTTON FUNCTION
  c.addEventListener("click", function () {
  (i = u(o.value)), l(), y();
  });
  })();