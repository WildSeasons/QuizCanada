/**
 * @description Programme qui permet d'afficher et de démarrer un jeu-questionnaire sur l'histoire et la culture du Canada
 * @author Cindy Phan
 * @version 2025-12-08
 */

// === Déclaration de constantes

//Constantes pour initialiser le canvas
const oCanvasHTML = document.querySelector("canvas");
const oContexte = oCanvasHTML.getContext("2d");

//Constantes pour les coordonnées de l'image en arrière-plan dans l'écran d'intro et celui de fin
const nAxeXArrierePlanJeu = 0;
const nAxeYArrierePlanJeu = 0;

//Constantes pour les coordonnées finales du bouton démarrer
const nAxeXFinalBoutonDemarrer = 890;
const nAxeYFinalBoutonDemarrer = 915;

//Constantes pour les coordonnées des images en lien avec l'énoncé des questions et le thème des question 
const nAxeXImageEnonceQuestion = 90;
const nAxeYImageEnonceQuestion = 30;
const nAxeXImageQuestion = 1400;
const nAxeYImageQuestion = 230;

//Constantes pour la largeur et la hauteur des images thématiques en lien avec les questions
const nLargeurImageQuestion = 400;
const nHauteurImageQuestion = 410;

//Constantes pour les coordonnées des choix de réponse
const nAxeXChoixReponses = 120;
const nAxeYChoixReponseA = 230;
const nAxeYChoixReponseB = 340;
const nAxeYChoixReponseC = 450;
const nAxeYChoixReponseD = 560;

//Constantes pour la largeur et la hauteur des choix de réponse
const nLargeurChoixReponses = 1250;
const nHauteurChoixReponses = 80;

//Constantes pour le nombre maximum des variables
const nMaxImageQuestions = 10;
const nMaxImageEnoncesQuestions = 10;
const nMaxImageFaitsEtonnantsQuestions = 10;
const nMaxQuestions = 10;
const nMaxEssais = 1;
const nMaxPointage = 10;

//Constantes pour les coordonnées du bouton avancer
const nAxeXBoutonAvancer = 1530;
const nAxeYBoutonAvancer = 900;

//Constantes pour les coordonnées du bouton redemarrer
const nAxeXBoutonRedemarrer = 900;
const nAxeYBoutonRedemarrer = 630;

//Constantes pour la largeur et la hauteur de tous les boutons (démarrer, avancer et redémarrer)
const nLargeurBouton = 140;
const nHauteurBouton = 140;

//Contante pour la source des dossier des images
const sDossier = `assets/img/`;

// === Déclaration de variables globales
let sEtat = "intro", //prend les valeurs "intro", "jeu", "fin", "stop"
    iInterval, //c'est l'identifiant qui permet d'arrêter le setInterval(). 
    nAxeXBoutonDemarrer = 890, //initialisation du bouton demarrer sur axe des X
    nAxeYBoutonDemarrer = 0, //initialisation du bouton demarrer sur axe des Y
    bBoutonDemarrerAFiniAnimation = false,  //initilisation du booléen pour l'animation du bouton démarrer à false
    nNbQuestions = 0, //initialisation de l'indice pour le nombre de questions
    bJoueurAChoisiReponse = false, //initilisation du booléen pour la réponse choisie par le joueur à false
    nPointage = 0, //initilisation du pointage à 0
    nNbEssais = 0, //initilisation du nombre d'essais à 0
    bClicdansZoneReponse = false; //initilisation du booléen pour le clic dans la zone de réponses par le joueur à false

//=== Initialisation et chargement des images pour l'écran d'intro et pour le bouton démarrer
oImage_Intro = new Image();
oImage_Intro.src = "assets/img/image_Intro.jpg";
oImage_Titre = new Image();
oImage_Titre.src = "assets/img/image_Titre.png";
oImage_Bouton_Demarrer = new Image();
oImage_Bouton_Demarrer.src = "assets/img/image_Bouton_Demarrer.png";

//=== Initialisation et chargement des images pour les énoncées des questions
let aoImagesEnoncesQuestions = [];
let nImage = 0;
while (nImage < nMaxImageEnoncesQuestions){
  aoImagesEnoncesQuestions[nImage] = new Image();
  aoImagesEnoncesQuestions[nImage].src = sDossier + `image_Enonce_Question` + (nImage+1) + `.jpg`;
  nImage++;
}

//=== Initialisation et chargement des images thématiques en lien avec les questions
let aoImagesQuestions = [];
nImage = 0;
while (nImage < nMaxImageQuestions){
  aoImagesQuestions[nImage] = new Image();
  aoImagesQuestions[nImage].src = sDossier + `image_Question` + (nImage+1) + `.jpg`;
  nImage++;
}

//=== Initialisation du tableau pour les choix de réponse pour chaque question
let aChoixReponses = [];

aChoixReponses[0] = ["A) La poutine",
  "B) Les toutons",
  "C) Le souper Jiggs", 
  "D) Les barres Nanaimo"
];
aChoixReponses[1] = ["A) Le hockey",
  "B) Le basket-ball", 
  "C) Le lacrosse", 
  "D) Le football américain"
];
aChoixReponses[2] = ["A) 374 000",
  "B) 580 100",
  "C) 2 000 000",
  "D) 4 000 000"
];
aChoixReponses[3] = ["A) Watch Dogs 2",
  "B) Until Dawn", 
  "C) Celeste", 
  "D) Scott Pilgrim VS. The World : The Game"
];
aChoixReponses[4] = ["A) Suits",
  "B) The Boys", 
  "C) The Last of Us", 
  "D) Toutes ces réponses"
];
aChoixReponses[5] = ["A) La création de Java, le langage de programmation", 
  "B) La création du stimulateur cardiaque", 
  "C) La création d’une prothèse pour la main", 
  "D) La découverte de l’insuline"
];
aChoixReponses[6] = ["A) La République fédérale",
  "B) Le régime parlementaire", 
  "C) La monarchie constitutionnelle", 
  "D) Le régime présidentiel"
];
aChoixReponses[7] = ["A) Lucy Maud Montgomery, l’auteure de la série Anne de la maison aux pignons verts", 
  "B) Margaret Atwood, l’auteure du livre Le pouvoir", 
  "C) Robert Munsch, l’auteur du livre La princesse dans un sac", 
  "D) Anne Robilard, l’auteure de la série Les Chevaliers d'Émeraude"
];
aChoixReponses[8] = ["A) Juno Awards",
  "B) Mercury Prize",
  "C) Billboard Music Awards",
  "D) NRJ Music Awards"
];
aChoixReponses[9] = ["A) Harrison Hot Springs",
  "B) Banff",
  "C) Beebe Plain", 
  "D) Niagara on the Lake"
];

//=== Initialisation du tableau pour les bonnes réponses
let aBonnesReponses = [];
aBonnesReponses[0] = "D) Les barres Nanaimo";
aBonnesReponses[1] = "A) Le hockey";
aBonnesReponses[2] = "C) 2 000 000";
aBonnesReponses[3] = "A) Watch Dogs 2";
aBonnesReponses[4] = "D) Toutes ces réponses";
aBonnesReponses[5] = "B) La création du stimulateur cardiaque";
aBonnesReponses[6] = "C) La monarchie constitutionnelle";
aBonnesReponses[7] = "B) Margaret Atwood, l’auteure du livre Le pouvoir";
aBonnesReponses[8] = "A) Juno Awards";
aBonnesReponses[9] = "C) Beebe Plain";


//=== Initialisation du tableau pour le coloriage des réponses (rouge/vert)
let aColoriageReponses = [];
aColoriageReponses[0] = ["red",
                         "red",
                         "red",
                         "green"
]
aColoriageReponses[1] = ["green",
                         "red",
                         "red",
                         "red"
]
aColoriageReponses[2] = ["red",
                         "red",
                         "green",
                         "red"
]
aColoriageReponses[3] = ["green",
                         "red",
                         "red",
                         "red"
]
aColoriageReponses[4] = ["red",
                         "red",
                         "red",
                         "green"
]
aColoriageReponses[5] = ["red",
                         "green",
                         "red",
                         "red"
]
aColoriageReponses[6] = ["red",
                         "red",
                         "green",
                         "red"
]
aColoriageReponses[7] = ["red",
                         "green",
                         "red",
                         "red"
]
aColoriageReponses[8] = ["green",
                         "red",
                         "red",
                         "red"
]
aColoriageReponses[9] = ["red",
                         "red",
                         "green",
                         "red"
]

//=== Initialisation du tableau pour les faits étonnants en lien avec les questions
let aoFaitsEtonnantsQuestions = [];
nImage = 0;
while (nImage < nMaxImageFaitsEtonnantsQuestions){
  aoFaitsEtonnantsQuestions[nImage] = new Image();
  aoFaitsEtonnantsQuestions[nImage].src = sDossier + `image_Fait_Etonnant_Question` + (nImage+1) + `.jpg`;
  nImage++;
}

//=== Initialisation et chargement du bouton avancer pour passer à la question suivante
oImage_Bouton_Avancer = new Image();
oImage_Bouton_Avancer.src = "assets/img/image_Bouton_Avancer.png";

//=== Initialisation et chargement des images d'arrière-plan et du bouton redémarrer pour l'écran de fin
oImage_Fin = new Image();
oImage_Fin.src = "assets/img/image_Fin.jpg";
oImage_Bouton_Redemarrer = new Image();
oImage_Bouton_Redemarrer.src = "assets/img/image_Bouton_Redemarrer.png";

//=== Chargement des sons pour l'écran d'intro
let oMusique_Ambiance_Intro = new Audio("assets/sons/introMusiqueAmbiance.mp3");
let oSon_Bouton_Demarrer = new Audio("assets/sons/introBouton.mp3");

//=== Chargement des sons pour les questions
let oSon_Bouton_Avancer = new Audio("assets/sons/prochaineQuestion.mp3");
let oSon_Bonne_Reponse = new Audio("assets/sons/bonneReponse.wav");
let oSon_Mauvaise_Reponse = new Audio("assets/sons/mauvaiseReponse.wav");

//Chargement des sons pour l'écran de fin
let oSon_Pointage_Final = new Audio("assets/sons/finSonPointageFinal.mp3");
let oSon_Bouton_Redemarrer = new Audio("assets/sons/redemarrer.wav");

// === Déclaration de fonctions
/**
 * @description cette fonction permet de passer d'un état à l'autre
 * cad "intro", "jeu", "fin", "stop"
 * @param void
 * @returns void
*/
function bouclerLeJeu() {
  console.log("2] La boucle de jeu ");
  if (sEtat === "intro") {
    afficherIntro();
  } else {
    if (sEtat === "jeu") {
      jouer();
    } else {
      if (sEtat === "fin") {
        afficherFin();
      } else {
        if (sEtat === "stop") {
          arreter();
        }
      }
    }
  }
} //fin de la fonction bouclerLeJeu()

/**
 * @description cette fonction permet : d'afficher l'écran d'introduction et le bouton demarrer;
 *                                      de jouer la musique d'introduction;
 *                                      de démarrer la fonction defilerBoutonDemarrerSurLesY().
 * @param void
 * @returns void
*/
function afficherIntro() {
  console.log("    2.1] Écran d'introduction");
  oContexte.drawImage(oImage_Intro, nAxeXArrierePlanJeu, nAxeYArrierePlanJeu, oCanvasHTML.width, oCanvasHTML.height);
  oContexte.drawImage(oImage_Titre, nAxeXArrierePlanJeu, nAxeYArrierePlanJeu, oCanvasHTML.width, oCanvasHTML.height);
  oMusique_Ambiance_Intro.play();
  defilerBoutonDemarrerSurLesY();
} //fin de la fonction afficherIntro()


/**
 * @description défiler le bouton démarrer sur l'axe des Y
 * @param void
 * @returns void
*/
function defilerBoutonDemarrerSurLesY(){
  const nDeplacement = 5;
  //SI AxeYBoutonDemarrer est inférieur à 915
  if(nAxeYBoutonDemarrer < 915){
    nAxeYBoutonDemarrer += nDeplacement;
    //SINON
  }else{
    nAxeYBoutonDemarrer = 915;
    bBoutonDemarrerAFiniAnimation = true;
  }//FIN_DU_SI
  oContexte.drawImage(oImage_Bouton_Demarrer, nAxeXBoutonDemarrer, nAxeYBoutonDemarrer, nLargeurBouton, nHauteurBouton);
}//fin de la fonction defilerBoutonDemarrerSurLesY()


/**
 * @description cette fonction permet: de mettre le son du clic pour le bouton;
 *                                     de cliquer sur le bouton démarrer lorsqu'il a fini son animation pour démarrer le jeu.
 * @param {Event} oEvt il contient le clic
 * @returns void
*/
function cliquerSurBoutonDemarrer(oEvt) {
  // SI le clic est à l'intérieur de la zone du bouton démarrer
  if (
    oEvt.offsetX >= nAxeXFinalBoutonDemarrer &&
    oEvt.offsetX <= nAxeXFinalBoutonDemarrer +nLargeurBouton &&
    oEvt.offsetY >= nAxeYFinalBoutonDemarrer &&
    oEvt.offsetY <= nAxeYFinalBoutonDemarrer + nHauteurBouton &&
    bBoutonDemarrerAFiniAnimation === true
  ) {
    oSon_Bouton_Demarrer.play();
    console.log("Bouton démarrer cliqué !");
    sEtat = "jeu";
  }//FIN_DU_SI

} //fin de la fonction cliquersurBoutonDemarrer

/**
 * @description cette fonction permet d'activer toutes les fonctions nécessaires pour jouer au questionnaire
 * @param void
 * @returns void
*/
function jouer() {
  console.log("    2.2] Écran du jeu");
  arreterSonsIntro();
  afficherQuestions();
  voirProgressionQuestionnaire();
  voirPointageQuestionnaire();
  afficherFaitsEtonnantsQuestions();
  afficherColoriageReponses();
} //fin de la fonction jouer()

/**
 * @description cette fonction permet: d'arrêter la musique de l'écran d'intro;
 *                                     d'enlever l'événement click en lien avec la fonction cliquerSurBoutonDemarrer.
 * @param void
 * @returns void
*/
function arreterSonsIntro() {
  oMusique_Ambiance_Intro.pause();
  oCanvasHTML.removeEventListener("click", cliquerSurBoutonDemarrer);
} //fin de la fonction arreterSonsIntro

/**
 * @description cette fonction permet d'afficher les questions, les choix de réponse et le bouton avancer
 * @param void
 * @returns void
*/
function afficherQuestions() {
  // Effacer le canvas
  oContexte.clearRect(nAxeXArrierePlanJeu,nAxeYArrierePlanJeu, oCanvasHTML.width, oCanvasHTML.height);
  // Définir la couleur de trait
  oContexte.strokeStyle = "#399ed8ff"; // Couleur de trait pour les formes (bleu)
  oContexte.lineWidth = 5; // Épaisseur du trait
  
  // Définir la couleur des caractères
  oContexte.fillStyle ="black"; 
  
  // Définir la taille et la police des caractères
  oContexte.font = "30px OpenSans";
  
  // Dessiner l'image pour l'énoncé des questions 
  oContexte.drawImage(aoImagesEnoncesQuestions[nNbQuestions], nAxeXImageEnonceQuestion, nAxeYImageEnonceQuestion);
  
  // Dessiner l'image thématique en lien avec l'énoncé des questions 
  oContexte.drawImage(aoImagesQuestions[nNbQuestions], nAxeXImageQuestion, nAxeYImageQuestion, nLargeurImageQuestion, nHauteurImageQuestion);
  
  // Dessiner le contour du rectangle *4 pour les choix de réponse
  oContexte.strokeRect(nAxeXChoixReponses, nAxeYChoixReponseA, nLargeurChoixReponses, nHauteurChoixReponses);
  oContexte.strokeRect(nAxeXChoixReponses, nAxeYChoixReponseB, nLargeurChoixReponses, nHauteurChoixReponses);
  oContexte.strokeRect(nAxeXChoixReponses, nAxeYChoixReponseC, nLargeurChoixReponses, nHauteurChoixReponses);
  oContexte.strokeRect(nAxeXChoixReponses, nAxeYChoixReponseD, nLargeurChoixReponses, nHauteurChoixReponses);
  
  // Écrire les choix de réponse à l'intérieur des rectangles
  oContexte.fillText(aChoixReponses[nNbQuestions][0], nAxeXChoixReponses + 10, nAxeYChoixReponseA + nHauteurChoixReponses/2);
  oContexte.fillText(aChoixReponses[nNbQuestions][1], nAxeXChoixReponses + 10, nAxeYChoixReponseB + nHauteurChoixReponses/2);
  oContexte.fillText(aChoixReponses[nNbQuestions][2], nAxeXChoixReponses + 10, nAxeYChoixReponseC + nHauteurChoixReponses/2);
  oContexte.fillText(aChoixReponses[nNbQuestions][3], nAxeXChoixReponses + 10, nAxeYChoixReponseD + nHauteurChoixReponses/2);
  
  // Mettre un écouteur d'événement pour l'événement click
  oCanvasHTML.addEventListener("click", enregistrerReponseJoueur);
  
  // Dessiner le bouton avancer  
  oContexte.drawImage(oImage_Bouton_Avancer, nAxeXBoutonAvancer, nAxeYBoutonAvancer, nLargeurBouton, nHauteurBouton);

} //fin de la fonction afficherQuestions()


/**
 * @description cette fonction permet: d'enregistrer le click du joueur sur les réponses;
 *                                   : de comparer les réponses.
 * @param {Event} oEvt
 * @returns void 
*/
function enregistrerReponseJoueur(oEvt) {
  let sReponseJoueur;
  //SI le clic est dans la zone de la réponse A
  if (
    oEvt.offsetX >= nAxeXChoixReponses &&
    oEvt.offsetX <= nAxeXChoixReponses + nLargeurChoixReponses &&
    oEvt.offsetY >= nAxeYChoixReponseA &&
    oEvt.offsetY <= nAxeYChoixReponseA + nHauteurChoixReponses
  ) {
    console.log("Réponse A cliquée !");
    sReponseJoueur = aChoixReponses[nNbQuestions][0];
    bClicdansZoneReponse = true;
  } //SINON SI le clic est dans la zone de la réponse B
  else if (
    oEvt.offsetX >= nAxeXChoixReponses &&
    oEvt.offsetX <= nAxeXChoixReponses + nLargeurChoixReponses &&
    oEvt.offsetY >= nAxeYChoixReponseB &&
    oEvt.offsetY <= nAxeYChoixReponseB + nHauteurChoixReponses
  ) {
    console.log("Réponse B cliquée !");
    sReponseJoueur = aChoixReponses[nNbQuestions][1];
    bClicdansZoneReponse = true;

  } //SINON SI le clic est dans la zone de la réponse C
  else if (
    oEvt.offsetX >= nAxeXChoixReponses &&
    oEvt.offsetX <= nAxeXChoixReponses + nLargeurChoixReponses &&
    oEvt.offsetY >= nAxeYChoixReponseC &&
    oEvt.offsetY <= nAxeYChoixReponseC + nHauteurChoixReponses
  ) {
    console.log("Réponse C cliquée !");
    sReponseJoueur = aChoixReponses[nNbQuestions][2];
    bClicdansZoneReponse = true;

  } //SINON SI  le clic est dans la zone de la réponse D
  else if (
    oEvt.offsetX >= nAxeXChoixReponses &&
    oEvt.offsetX <= nAxeXChoixReponses + nLargeurChoixReponses &&
    oEvt.offsetY >= nAxeYChoixReponseD &&
    oEvt.offsetY <= nAxeYChoixReponseD + nHauteurChoixReponses
  ) {
    console.log("Réponse D cliquée !");
    sReponseJoueur = aChoixReponses[nNbQuestions][3];
    bClicdansZoneReponse = true;
    //SINON SI le clic est dans la zone du bouton avancer
  }else if (
    oEvt.offsetX >= nAxeXBoutonAvancer &&
    oEvt.offsetX <= nAxeXBoutonAvancer + nLargeurBouton &&
    oEvt.offsetY >= nAxeYBoutonAvancer &&
    oEvt.offsetY <= nAxeYBoutonAvancer + nHauteurBouton
  ) {
    console.log("Bouton avancer cliqué !");
    sReponseJoueur = "Bouton avancer";
  }//FIN_DU_SI

  //SI sReponseJoueur est égale à aBonnesReponses[nNbQuestions]
  if (sReponseJoueur === aBonnesReponses[nNbQuestions] &&
      nNbEssais < nMaxEssais &&
      bClicdansZoneReponse === true
  ){
    console.log(`Bonne réponse !`);
    oSon_Bonne_Reponse.play();
    nPointage++;
    nNbEssais++;
    bJoueurAChoisiReponse = true;
  //SINON SI sReponseJoueur n'est pas égale à aBonnesReponses[nNbQuestions] ET sReponseJoueur n'est pas égale à la zone du bouton avancer
  } else if (sReponseJoueur !== aBonnesReponses[nNbQuestions] && 
    sReponseJoueur !== "Bouton avancer" &&
    nNbEssais < nMaxEssais &&
    bClicdansZoneReponse === true
  ){
    console.log(`Mauvaise réponse !`);
    oSon_Mauvaise_Reponse.play();
    nNbEssais++;
    bJoueurAChoisiReponse = true;
  //SINON SI sReponseJoueur est égale à la zone du bouton avancer
  }else if (sReponseJoueur == "Bouton avancer"){
    console.log("Bouton avancer cliqué !");
    oSon_Bouton_Avancer.play();
  }//FIN_DU_SI
  
  // Mettre un écouteur d'événement pour l'événement click pour avancer dans le questionnaire
  oCanvasHTML.addEventListener("click", avancerQuestionnaire);
  
} //fin de la fonction enregistrerReponseJoueur


/**
 * @description cette fonction permet d'afficher les faits étonnants reliés à la question
 * @param void
 * @returns void
*/
function afficherFaitsEtonnantsQuestions() {
  //SI le joueur a choisi une réponse
  if(bJoueurAChoisiReponse ===true){
  oContexte.drawImage(aoFaitsEtonnantsQuestions[nNbQuestions], nAxeXChoixReponses, 760);
  }//FIN_DU_SI
} //fin de la fonction afficherFaitsEtonnantsQuestions


/**
 * @description cette fonction permet d'afficher les bonnes réponses et les mauvaises réponses avec rouge (mauvaise réponse) et vert (bonne réponse)
 * @param void
 * @returns void
*/
function afficherColoriageReponses() {
  //SI le joueur a choisi une réponse
  if(bJoueurAChoisiReponse ===true){
  // Dessiner le contour du rectangle A selon si c'est une bonne réponse ou non
  oContexte.strokeStyle = aColoriageReponses[nNbQuestions][0]; // Couleur de trait 
  oContexte.lineWidth = 5; // Épaisseur du trait
  oContexte.strokeRect(nAxeXChoixReponses, nAxeYChoixReponseA, nLargeurChoixReponses, nHauteurChoixReponses);
  
  // Dessiner le contour du rectangle B selon si c'est une bonne réponse ou non
  oContexte.strokeStyle = aColoriageReponses[nNbQuestions][1]; // Couleur de trait 
  oContexte.lineWidth = 5; // Épaisseur du trait
  oContexte.strokeRect(nAxeXChoixReponses, nAxeYChoixReponseB, nLargeurChoixReponses, nHauteurChoixReponses);

  // Dessiner le contour du rectangle C selon si c'est une bonne réponse ou non
  oContexte.strokeStyle = aColoriageReponses[nNbQuestions][2]; // Couleur de trait 
  oContexte.lineWidth = 5; // Épaisseur du trait
  oContexte.strokeRect(nAxeXChoixReponses, nAxeYChoixReponseC, nLargeurChoixReponses, nHauteurChoixReponses);

  // Dessiner le contour du rectangle D selon si c'est une bonne réponse ou non
  oContexte.strokeStyle = aColoriageReponses[nNbQuestions][3]; // Couleur de trait
  oContexte.lineWidth = 5; // Épaisseur du trait
  oContexte.strokeRect(nAxeXChoixReponses, nAxeYChoixReponseD, nLargeurChoixReponses, nHauteurChoixReponses);

  }//FIN_DU_SI
} //fin de la fonction afficherColoriageReponses

/**
 * @description cette fonction permet de voir la progression dans le questionnaire
 * @param void
 * @returns void
*/
function voirProgressionQuestionnaire() {
oContexte.fillText(`Progression est : ${nNbQuestions+1} / ${nMaxQuestions}`, nAxeXImageQuestion, 700);
} //fin de la fonction voirProgressionQuestionnaire


/**
 * @description cette fonction permet de voir le pointage dans le questionnaire
 * @param void
 * @returns void
*/
function voirPointageQuestionnaire() {
oContexte.fillText(`Pointage est : ${nPointage} / ${nMaxPointage}`, nAxeXImageQuestion, 800);
} //fin de la fonction voirPointageQuestionnaire

/**
 * @description cette fonction permet : d'avancer dans le questionnaire;
 *                                      d'incrémenter l'indice du nombre de questions;
 *                                      de réinitialiser les variables bJoueurAChoisiReponse et bClicdansZoneReponse à false
 *                                      d'aller à l'écran de fin si le joueur a fini de répondre à toutes les questions.
 * @param {Event} oEvt
 * @returns void
*/
function avancerQuestionnaire(oEvt) {
//SI le clic est dans la zone du bouton avancer et que le joueur a choisi une réponse
if (
  oEvt.offsetX >= nAxeXBoutonAvancer &&
  oEvt.offsetX <= nAxeXBoutonAvancer + nLargeurBouton &&
  oEvt.offsetY >= nAxeYBoutonAvancer &&
  oEvt.offsetY <= nAxeYBoutonAvancer + nHauteurBouton &&
  bJoueurAChoisiReponse === true  
) {
  oSon_Bouton_Avancer.play();
  nNbQuestions++;
  bJoueurAChoisiReponse = false;
  bClicdansZoneReponse = false;
  nNbEssais = 0;
} // FIN_DU_SI
  //SI nNbQuestions est supérieur à aQuestions.length (10)
  if(nNbQuestions >= aoImagesEnoncesQuestions.length){
    sEtat = "fin";
  }//FIN_DU_SI

} //fin de la fonction avancerQuestionnaire
    
/**
 * @description cette fonction permet: d'afficher l'écran de fin;
 *                                     de voir le pointage final;
 *                                     de voir le bouton redémarrer;
 *                                     de jouer le son du pointage final;
 *                                     de mettre un écouteur d'événement sur le bouton de redémarrage;
 *                                     de mettre un écouteur d'événement sur le bouton de rédémaarage;
 *                                     de changer à l'état "stop",
 * @param void
 * @returns void
*/
function afficherFin() {
  console.log("    2.3] Écran de fin");
  //Dessiner l'image d'arrière-plan de l'écran de fin
  oContexte.drawImage(oImage_Fin, nAxeXArrierePlanJeu, nAxeYArrierePlanJeu, oCanvasHTML.width, oCanvasHTML.height);

  //Dessiner le contenant blanc transparent de l'écran de fin
  oContexte.fillStyle = "white";
  oContexte.globalAlpha =0.7;
  oContexte.fillRect(90, 90, 1740, 900);
  
  //Écrire le pointage final centré dans le contenant blanc en noir
  oContexte.fillStyle ="black"; 
  oContexte.font = "50px OpenSans";
  oContexte.fillText(`Votre pointage final est : ${nPointage} / ${nMaxPointage}`, 630, 540);
  
  //Dessiner le bouton de redémarrage
  oContexte.drawImage(oImage_Bouton_Redemarrer, 900, 630, nLargeurBouton, nHauteurBouton );
  
  //Mettre un écouteur d'événement sur le bouton de redémarrage
  oCanvasHTML.addEventListener("click", redemarrer);
  //Jouer le son du pointage final
  oSon_Pointage_Final.play();
  sEtat = "stop";
} //fin de la fonction afficherFin()

/**
 * @description cette fontion permet: d'arrêter la boucle de jeu;
 *                                    d'enlever les écouteurs d'événement qui permettent d'avancer dans le questionnaire et d'enregistrer la réponse du joueur et de la comparer à la bonne réponse
 * @param void
 * @returns void
*/
function arreter() {
  console.log("    2.4] Arrêt complet du setInterval()");
  oCanvasHTML.removeEventListener("click", enregistrerReponseJoueur);
  oCanvasHTML.removeEventListener("click", avancerQuestionnaire);
  clearInterval(iInterval);  
} //fin de la fonction arreter()


/**
 * @description cette fontion permet de jouer le son du bouton redémarrer;
 *                                   d'enlever l'événement relié au bouton de redémarrage;
 *                                   de reinitiliaser toutes les variables importantes pour faire fonctionner le jeu à leur état initial;
 *                                   d'effacer le canvas;
 *                                   de redémarrer le jeu.
 * @param {Event} oEvt
 * @returns void
*/
function redemarrer(oEvt) {
  //SI le clic est dans la zone du bouton redémarrer
  if (
    oEvt.offsetX >= nAxeXBoutonRedemarrer &&
    oEvt.offsetX <= nAxeXBoutonRedemarrer + nLargeurBouton &&
    oEvt.offsetY >= nAxeYBoutonRedemarrer &&
    oEvt.offsetY <= nAxeYBoutonRedemarrer + nHauteurBouton
  ) {
    oSon_Bouton_Redemarrer.play();
    oCanvasHTML.removeEventListener("click",redemarrer);  
    nNbQuestions = 0;
    nPointage = 0;    
    oContexte.globalAlpha = 1;
    nAxeYBoutonDemarrer = 0;
    bBoutonDemarrerAFiniAnimation = false;
    sEtat = "intro";
    oContexte.clearRect(nAxeXArrierePlanJeu,nAxeYArrierePlanJeu, oCanvasHTML.width, oCanvasHTML.height);
    demarrer();
  } // FIN_DU_SI

} //fin de la fonction redemarrer()


/**
 * @description cette fonction est appelée après le chargement de la page
 * @param void
 * @returns void
*/
function demarrer() {
  console.log("1] le script démarre");
  iInterval = setInterval(bouclerLeJeu, 1000/60);
  oCanvasHTML.addEventListener("click", cliquerSurBoutonDemarrer);
  
} //fin de la fonction demarrer()

// === Programme principal
window.addEventListener("load", demarrer);
