// Récupération des pièces depuis le fichier JSON
const reponse = await fetch("pieces-autos.json");
// Conversion de la réponse en tableau d’objets JavaScript
const pieces = await reponse.json();

// --- Génération dynamique des fiches --
for (let i = 0; i < pieces.length; i++) {
  // On prend un élément du tableau
  const article = pieces[i];

  // Récupération de l'élément du DOM qui accueillera les fiches
  const sectionFiches = document.querySelector(".fiches");

  // On crée un élément <article> qui représentera une pièce
  const pieceElement = document.createElement("article");
  // Création des balises
  // On crée chaque élément nécessaire (image, titre, prix, etc.)
  const imageElement = document.createElement("img");
  imageElement.src = article.image;
  const nomElement = document.createElement("h2");
  nomElement.innerText = article.nom;

  const prixElement = document.createElement("p");
  // Affichage du prix + symbole € ou €€€ selon le prix
  prixElement.innerText = `Prix: ${article.prix} € (${
    article.prix < 35 ? "€" : "€€€"
  })`;

  const categorieElement = document.createElement("p");
  // Si la catégorie est absente, on affiche "(aucune catégorie)"
  categorieElement.innerText = article.categorie ?? "(aucune catégorie)";

  const descriptionElement = document.createElement("p");
  // Si la description est absente, on affiche "(aucune description)"
  descriptionElement.innerText =
    article.description ?? "Pas de description pour le moment.";

  const stockElement = document.createElement("p");
  // Ternary operator : dispo = "En stock", sinon "Rupture de stock"
  stockElement.innerText = article.disponibilite
    ? "En stock"
    : "Rupture de stock";

  // On rattache la balise article a la section Fiches
  sectionFiches.appendChild(pieceElement);
  // On rattache l’image à pieceElement (la balise article)
  pieceElement.appendChild(imageElement);
  pieceElement.appendChild(nomElement);
  pieceElement.appendChild(prixElement);
  pieceElement.appendChild(categorieElement);
  pieceElement.appendChild(descriptionElement);
  pieceElement.appendChild(stockElement);
}
// Bouton croissant
const boutonTrier = document.querySelector(".btn-trier");

boutonTrier.addEventListener("click", function () {
  // On crée une copie du tableau pieces pour ne pas modifier l’original
  const piecesOrdonnees = Array.from(pieces);

  piecesOrdonnees.sort(function (a, b) {
    return a.prix - b.prix; // tri croissant
  });

  console.log(piecesOrdonnees);
});

const boutonFiltrer = document.querySelector(".btn-filtrer");

boutonFiltrer.addEventListener("click", function () {
  const piecesFiltrees = pieces.filter(function (piece) {
    return piece.prix <= 35;
  });
  console.log(piecesFiltrees);
});

const boutonDecroissant = document.querySelector(".btn-decroissant");
boutonDecroissant.addEventListener("click", function () {
  const piecesOrdonnees = Array.from(pieces);
  piecesOrdonnees.sort(function (a, b) {
    return b.prix - a.prix;
  });
  console.log(piecesOrdonnees);
});

// --- Bouton : Filtrer les pièces avec description ---
const boutonNoDescription = document.querySelector(".btn-nodesc");
boutonNoDescription.addEventListener("click", function () {
  const piecesFiltrees = pieces.filter(function (piece) {
    return piece.description; // Conserve uniquement celles qui ont une description
  });
  console.log(piecesFiltrees);
});

// --- Génération d'une liste des pièces abordables ---
const noms = pieces.map((piece) => piece.nom); // on récupère uniquement les noms

// On supprime les noms dont le prix est > 35
for (let i = pieces.length - 1; i >= 0; i--) {
  if (pieces[i].prix > 35) {
    noms.splice(i, 1); // suppression dans le tableau noms
  }
}

//Création de la liste UL
const abordablesElements = document.createElement("ul");
//Ajout de chaque nom à la liste
for (let i = 0; i < noms.length; i++) {
  const nomElement = document.createElement("li");
  nomElement.innerText = noms[i];
  abordablesElements.appendChild(nomElement);
}
// Ajout de l'en-tête puis de la liste au bloc résultats filtres
document.querySelector(".abordables").appendChild(abordablesElements);

// Appel d'une API météo externe
const reponse2 = await fetch("https://api.openweathermap.org/data/2.5/weather?q=Paris&appid=MA_CLE_API&units=metric");

// Conversion en JSON
const donneesMeteo = await reponse2.json();

// Affichage des infos récupérées
console.log("Température à Paris :", donneesMeteo.main.temp, "°C");
