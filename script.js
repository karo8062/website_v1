const url = "https://passionprojekt-32d5.restdb.io/rest/rejser   "; //endpoint el. URL
const key = { headers: { "x-apikey": "	631b1b2afdc15b0265f17274" } }; // API nøgle
let rejser;

async function hentData() {
  const rensponse = await fetch(url, key);
  rejser = await rensponse.json();
  console.log("rejser", rejser);
  vis();
}
hentData(); //loop
