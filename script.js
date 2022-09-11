const url = "https://passionprojekt-32d5.restdb.io/rest/rejser   "; //endpoint el. URL
const key = { headers: { "x-apikey": "	631b1b2afdc15b0265f17274" } }; // API nøgle
let rejser;
let filter = "alle";
const header = document.querySelector("h3");

const filterKnapper = document.querySelectorAll("header button");
filterKnapper.forEach((knap) => knap.addEventListener("click", filtrerPakker));

function filtrerPakker() {
  filter = this.dataset.pakke; //når der klikkes på en knap laves filterknappen om til dataattributten "data-troende" fra HTMLen.
  document.querySelector(".valgt").classList.remove("valgt"); //fjern klassen valgt fra den knap
  this.classList.add("valgt"); //markerer den knap, som der klikkes på
  header.textContent = this.textContent; //this henviser til button der klikkes på. Gør at teksten ændres, når der filtreres
  vis();
}

async function hentData() {
  const rensponse = await fetch(url, key);
  rejser = await rensponse.json();
  console.log("rejser", rejser);
  vis();
}

//Mangler at ændrer navne//
function vis() {
  // console.log(pakker);
  const destination = document.querySelector("#destination");
  const skabelon = document.querySelector("template").content;
  destination.textContent = "";
  rejser.forEach((pakkeloesninger) => {
    if (filter == pakkeloesninger.pakke || filter == "alle") {
      const klon = skabelon.cloneNode(true);
      // klon.querySelector("img").src = "billeder/" + pakkeloesninger.billednavn + "-md.jpg"; //referer til kolonnernes navne i restdb
      // klon.querySelector("img").alt = pakkeloesninger.billednavn;
      klon.querySelector("article").addEventListener("click", () => visPopup(pakkeloesninger));
      klon.querySelector("h2").textContent = pakkeloesninger.destination;
      klon.querySelector(".pakke").textContent = pakkeloesninger.pakke;
      klon.querySelector(".hotel").textContent = pakkeloesninger.hotel;
      klon.querySelector(".restauranter").textContent = pakkeloesninger.restauranter;
      klon.querySelector(".oplevelser").textContent = pakkeloesninger.oplevelser;
      klon.querySelector(".pris").textContent = pakkeloesninger.pris + " kr.";
      klon.querySelector("article").style.borderRadius = "lem";
      destination.appendChild(klon);
    }
  });
}
document.querySelector("#popup").addEventListener("click", () => (popup.style.display = "none"));

function visPopup(personData) {
  // Med en anonym function kan vi medsende en parameter (personData) der indeholder al relevant data til at vise i popup’en
  console.log(personData);
  const popup = document.querySelector("#popup");
  popup.style.display = "block";
  popup.style.display = "flex";
  popup.querySelector("img").src = "billeder/" + personData.billednavn + "-md.jpg";
  popup.querySelector("img").alt = personData.billednavn;
  popup.querySelector("h2").textContent = personData.navn;
  popup.querySelector(".langbeskrivelse").textContent = personData.langbeskrivelse;
  popup.querySelector(".pris").textContent = personData.pris + " kr.";
}
hentData(); //loop
