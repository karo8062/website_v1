const url = "https://passionprojekt-32d5.restdb.io/rest/rejser   "; //endpoint el. URL
const key = { headers: { "x-apikey": "	631b1b2afdc15b0265f17274" } }; // API nøgle
let rejser;
let filter = "alle";
const header = document.querySelector("h3");

const filterKnapper = document.querySelectorAll("header button");
filterKnapper.forEach((knap) => knap.addEventListener("click", filtrerPakker));

function filtrerPakker() {
  filter = this.dataset.pakke;
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

function vis() {
  const destination = document.querySelector("#destination");
  const skabelon = document.querySelector("template").content;
  destination.textContent = "";
  rejser.forEach((pakkeloesninger) => {
    if (filter == pakkeloesninger.pakke || filter == "alle") {
      const klon = skabelon.cloneNode(true);
      klon.querySelector("img").src = "fotos/" + pakkeloesninger.billedeforside + ".webp";
      klon.querySelector("img").alt = pakkeloesninger.billedeforside;
      klon.querySelector("article").addEventListener("click", () => visPopup(pakkeloesninger));
      klon.querySelector("h2").textContent = pakkeloesninger.destination;
      klon.querySelector(".pakke").textContent = pakkeloesninger.pakke;
      klon.querySelector(".pris").textContent = pakkeloesninger.pris + " kr.";
      klon.querySelector("article").style.borderRadius = "lem";
      destination.appendChild(klon);
    }
  });
}

document.querySelector("#popup").addEventListener("click", () => (popup.style.display = "none"));

function visPopup(pakkeData) {
  console.log(pakkeData);
  const popup = document.querySelector("#popup");
  popup.style.display = "block";
  popup.style.display = "flex";
  popup.querySelector("h2").textContent = pakkeData.destination;
  popup.querySelector(".hotel").textContent = pakkeData.hotel;
  popup.querySelector(".restauranter").textContent = pakkeData.restauranter;
  popup.querySelector(".oplevelser").textContent = pakkeData.oplevelser;
  popup.querySelector(".pris").textContent = pakkeData.pris + " kr.";
}
hentData(); //loop
